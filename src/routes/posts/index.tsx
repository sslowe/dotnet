import { createFileRoute, Link } from '@tanstack/react-router'

import { seo } from "@/lib/seo"
import { sortedPosts, formatDate } from "@/lib/utils"


export const Route = createFileRoute('/posts/')({
	head: () => ({
		meta: [
			...seo({
				title: "blogramo | sacramo.net",
			}),
		],
	}),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="space-y-6">
			{sortedPosts.map((post, i) => (
				<Link to="/posts/$slug" params={{ slug: post._meta.path }} key={i} className="block">
					<section className="relative bg-[#03001B]/80 border-2 border-[#77FFE4] pt-6 pb-6 px-6 rounded hover:border-[#FFE72C] transition-colors cursor-pointer">
						<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none">
							{formatDate(post.publishedAt)}
						</h2>
						<div className="text-[#ECE6E6] space-y-2 mt-3">
							<h3 className="text-3xl font-['Jersey_25'] text-[#ECE6E6]">
								{post.title}
							</h3>
							{post.subtitle && (
								<p className="text-lg text-[#77FFE4] italic">
									{post.subtitle}
								</p>
							)}
							<p className="text-[#ECE6E6]">
								{post.summary}{" "}
								<span className="text-[#FFE72C] hover:underline">
									more
									<img src="/images/link.png" alt="" className="inline w-3 h-3 ml-1 mb-[1px]" />
								</span>
							</p>
						</div>
					</section>
				</Link>
			))}
		</div>
	)
}
