import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { Mdx } from "@/components/MdxComponents"
import { seo } from "@/lib/seo"
import { formatDate } from "@/lib/utils"
import { allPosts } from "content-collections";

export const Route = createFileRoute('/posts/$slug')({
	beforeLoad: () => ({
		allPosts,
	}),
	loader: async ({ params, context: { allPosts } }) => {
		const slug = params.slug;
		const post = allPosts.find((post) => post._meta.path === slug);
		if (!post) {
			throw redirect({
				to: "/posts",
			});
		}

		return { post };
	},
	head: ({ loaderData }) => ({
		meta: loaderData
			? [
					...seo({
						title: `${loaderData?.post.title.toLowerCase()} | sacramo.net`,

					}),
				]
			: [],
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { post } = Route.useLoaderData();

	return (
		<div className="space-y-6">
			<section className="relative bg-[#03001B]/80 border-2 border-[#77FFE4] pt-6 pb-6 px-6 rounded">
				<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none">
					{formatDate(post.publishedAt)}
				</h2>
				<div className="text-[#ECE6E6] mt-3">
					<h1 className="text-4xl font-['Jersey_25'] text-[#ECE6E6] mb-2">
						{post.title}
					</h1>
					{post.subtitle && (
						<p className="text-xl text-[#77FFE4] italic mb-6">
							{post.subtitle}
						</p>
					)}
					<Mdx code={post.body} />
				</div>
			</section>
			<div className="text-center">
				<Link
					to="/posts"
					className="text-2xl text-[#FFE72C] font-['Jersey_25'] bg-[#03001B] m-[3px] inline-flex items-center gap-2"
				>
					<img src="/images/link.png" alt="" className="w-4 h-4 scale-x-[-1]" />
					Back to Posts
				</Link>
			</div>
		</div>
	)
}
