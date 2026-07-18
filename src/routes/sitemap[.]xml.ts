import { createFileRoute } from "@tanstack/react-router";
import { sortedPosts } from "@/lib/utils";

const staticPaths = [
	"/",
	"/posts",
	"/music",
	"/supchuck",
	"/router",
	"/archive",
];

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function createSitemap(siteUrl: string): string {
	const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
	const urls = [
		...staticPaths.map((path) => ({
			loc: `${normalizedSiteUrl}${path}`,
		})),
		...sortedPosts.map((post) => ({
			loc: `${normalizedSiteUrl}/posts/${post._meta.path}`,
			lastmod: post.publishedAt,
		})),
	];

	const entries = urls
		.map(({ loc, lastmod }) => {
			const lastmodElement = lastmod
				? `\n\t\t<lastmod>${escapeXml(lastmod)}</lastmod>`
				: "";

			return `\t<url>\n\t\t<loc>${escapeXml(loc)}</loc>${lastmodElement}\n\t</url>`;
		})
		.join("\n");

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		entries,
		"</urlset>",
	].join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: ({ request }) => {
				const sitemap = createSitemap(new URL(request.url).origin);

				return new Response(sitemap, {
					headers: {
						"Cache-Control": "public, max-age=3600",
						"Content-Type": "application/xml; charset=utf-8",
					},
				});
			},
		},
	},
});
