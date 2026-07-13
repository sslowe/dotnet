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

function cleanMdxForFeed(content: string): string {
	return content
		.replace(/<img\b[^>]*\/?>/gi, "")
		.replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "")
		.replace(/<\/?[a-z][^>]*>/gi, "")
		.replace(/^\s*---[\s\S]*?---\s*/, "")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
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
			const content = escapeXml(cleanMdxForFeed(post.content));
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
