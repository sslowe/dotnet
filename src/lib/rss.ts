import type { Post } from "content-collections";

const feedTitle = "sacramo.net";
const feedDescription = "Making noise one way or another";

type RssImage = {
	alt?: string;
	url: string;
};

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

function escapeHtmlAttribute(value: string): string {
	return escapeHtml(value).replaceAll('"', "&quot;");
}

function wrapCdata(value: string): string {
	return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function formatRssDate(value: string): string {
	return new Date(value).toUTCString();
}

function getAttribute(tag: string, attribute: string): string | undefined {
	const match = tag.match(new RegExp(`${attribute}=["']([^"']*)["']`));
	return match?.[1];
}

function absoluteUrl(pathOrUrl: string, siteUrl: string): string {
	return new URL(pathOrUrl, siteUrl).toString();
}

function getImageType(url: string): string | undefined {
	const extension = new URL(url).pathname.split(".").at(-1)?.toLowerCase();

	switch (extension) {
		case "gif":
		case "jpeg":
		case "png":
		case "webp":
			return `image/${extension}`;
		case "jpg":
			return "image/jpeg";
		default:
			return undefined;
	}
}

function extractImages(content: string, siteUrl: string): Array<RssImage> {
	const imageTags = content.match(/<img\b[^>]*>/gi) ?? [];

	return imageTags.flatMap((tag) => {
		const src = getAttribute(tag, "src");

		if (!src || !src.startsWith("/content/")) {
			return [];
		}

		return [
			{
				alt: getAttribute(tag, "alt"),
				url: absoluteUrl(src, siteUrl),
			},
		];
	});
}

function removeImageBlocks(content: string): string {
	let stripped = content;
	let previous: string;

	do {
		previous = stripped;
		stripped = stripped.replace(
			/<div\b[^>]*>[\s\S]*?<img\b[^>]*src=["']\/content\/[^"']*["'][\s\S]*?<\/div>/gi,
			"",
		);
	} while (stripped !== previous);

	return stripped;
}

function stripUnsupportedHtml(content: string): string {
	return removeImageBlocks(content)
		.replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "")
		.replace(/<img\b[^>]*\/?>/gi, "")
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<\/p>/gi, "\n\n")
		.replace(/<\/div>/gi, "\n\n")
		.replace(/<\/?[a-z][^>]*>/gi, "");
}

function formatInlineMarkdownWithoutLinks(value: string): string {
	return escapeHtml(value)
		.replace(/~~([^~]+)~~/g, "<del>$1</del>")
		.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
		.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
		.replace(/(?<!_)_([^_\n]+)_(?!_)/g, "<em>$1</em>");
}

function formatInlineMarkdown(value: string, siteUrl: string): string {
	const links: Array<string> = [];
	const withLinkPlaceholders = value.replace(
		/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
		(_, text, href) => {
			const index = links.length;
			const safeHref = escapeHtmlAttribute(
				href.startsWith("#") ? href : absoluteUrl(href, siteUrl),
			);
			const safeText = formatInlineMarkdownWithoutLinks(text);

			links.push(`<a href="${safeHref}">${safeText}</a>`);

			return `%%RSSLINK${index}%%`;
		},
	);

	return formatInlineMarkdownWithoutLinks(withLinkPlaceholders).replace(
		/%%RSSLINK(\d+)%%/g,
		(_, index) => links[Number(index)] ?? "",
	);
}

function formatParagraph(block: string, siteUrl: string): string {
	const text = block
		.split("\n")
		.map((line) => line.trim())
		.join(" ")
		.trim();

	return `<p>${formatInlineMarkdown(text, siteUrl)}</p>`;
}

function mdxToFeedHtml(content: string, siteUrl: string): string {
	const cleaned = stripUnsupportedHtml(content)
		.replace(/^\s*---[\s\S]*?---\s*/, "")
		.replace(/\r\n?/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();

	if (!cleaned) {
		return "";
	}

	return cleaned
		.split(/\n{2,}/)
		.map((block) => {
			const trimmed = block.trim();
			const heading = trimmed.match(/^(#{2,6})\s+(.+)$/);

			if (heading) {
				const level = heading[1].length;

				return `<h${level}>${formatInlineMarkdown(heading[2], siteUrl)}</h${level}>`;
			}

			if (trimmed === "---") {
				return "<hr />";
			}

			return formatParagraph(trimmed, siteUrl);
		})
		.join("\n");
}

export function createRssFeed(posts: Array<Post>, siteUrl: string): string {
	const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
	const feedUrl = `${normalizedSiteUrl}/rss.xml`;
	const latestPost = posts[0];
	const lastBuildDate = latestPost
		? formatRssDate(latestPost.publishedAt)
		: new Date().toUTCString();

	const items = posts
		.map((post) => {
			const postUrl = `${normalizedSiteUrl}/posts/${post._meta.path}`;
			const title = escapeXml(post.title);
			const description = escapeXml(post.summary);
			const content = wrapCdata(mdxToFeedHtml(post.content, normalizedSiteUrl));
			const mediaItems = extractImages(post.content, normalizedSiteUrl)
				.map((image) => {
					const type = getImageType(image.url);
					const typeAttribute = type ? ` type="${type}"` : "";
					const titleElement = image.alt
						? `\n\t\t\t<media:title>${escapeXml(image.alt)}</media:title>`
						: "";

					return `\t\t\t<media:content url="${image.url}" medium="image"${typeAttribute}>${titleElement}\n\t\t\t</media:content>`;
				})
				.join("\n");

			return [
				"\t\t<item>",
				`\t\t\t<title>${title}</title>`,
				`\t\t\t<link>${postUrl}</link>`,
				`\t\t\t<guid isPermaLink="true">${postUrl}</guid>`,
				`\t\t\t<description>${description}</description>`,
				`\t\t\t<content:encoded>${content}</content:encoded>`,
				mediaItems,
				`\t\t\t<pubDate>${formatRssDate(post.publishedAt)}</pubDate>`,
				"\t\t</item>",
			]
				.filter(Boolean)
				.join("\n");
		})
		.join("\n");

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">',
		"\t<channel>",
		`\t\t<title>${escapeXml(feedTitle)}</title>`,
		`\t\t<link>${normalizedSiteUrl}</link>`,
		`\t\t<description>${escapeXml(feedDescription)}</description>`,
		`\t\t<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
		`\t\t<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />`,
		items,
		"\t</channel>",
		"</rss>",
		"",
	].join("\n");
}
