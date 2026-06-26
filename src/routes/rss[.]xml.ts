import { createFileRoute } from "@tanstack/react-router";
import { createRssFeed } from "@/lib/rss";
import { sortedPosts } from "@/lib/utils";

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: ({ request }) => {
				const siteUrl = new URL(request.url).origin;
				const feed = createRssFeed(sortedPosts, siteUrl);

				return new Response(feed, {
					headers: {
						"Cache-Control": "public, max-age=3600",
						"Content-Type": "application/rss+xml; charset=utf-8",
					},
				});
			},
		},
	},
});
