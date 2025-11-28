import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { seo } from "@/lib/seo";
import mdxCss from "../mdx.css?url";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "sacramo.net",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "sacramo",
			},
			...seo({
				title: "sacramo.net",
				image: "/og-image.png",
				description: "A great place to space your face",
			}),
		],
		links: [
			{
				rel: "icon",
				href: "/favicon-96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml",
			},
			{
				rel: "apple-touch-icon",
				href: "apple-touch-icon.png",
				sizes: "180x180",
			},
			{
				rel: "shortcut icon",
				href: "favicon.ico",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: mdxCss,
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Jersey+25&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-[#03001B] bg-[url(/images/space.png)] min-h-screen p-4 md:p-8">
				{/* Main Layout Container */}
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex gap-6 mb-8">
						<div className="hidden md:block w-48 flex-shrink-0"></div>
						<div className="flex-1 text-center md:text-right">
							<Link to="/">
								<h1 className="inline-block text-[#ECE6E6] text-4xl md:text-5xl font-['Jersey_25'] bg-[#03001B] m-[3px]">
									sacramo.
									<span className="text-[#FFE72C]">n</span>
									<span className="text-[#77FFE4]">e</span>
									<span className="text-[#ED4848]">t</span>
								</h1>
							</Link>
						</div>
						<div className="hidden md:block w-48 flex-shrink-0"></div>
					</div>

					{/* Responsive Layout */}
					<div className="flex flex-col md:flex-row gap-6">
						{/* Left Sidebar - Navigation */}
						<aside className="w-full md:w-48 md:flex-shrink-0">
							<nav className="relative bg-[#03001B]/80 border-2 border-[#FFE72C] pt-6 pb-4 px-4 rounded">
								<h2 className="absolute -top-3 left-3 bg-[#03001B] px-2 text-[#FFE72C] font-['Jersey_25'] text-2xl leading-none">
									Links
								</h2>
								<ul className="flex flex-row md:flex-col md:space-y-2 gap-4 md:gap-0 flex-wrap justify-center md:justify-start text-lg">
									<li>
										<Link
											to="/posts"
											className="text-[#ECE6E6] hover:text-[#FFE72C] transition-colors flex items-center gap-2"
										>
											Posts
											<img
												src="/images/link.png"
												alt=""
												className="w-4 h-4 mt-[1px]"
											/>
										</Link>
									</li>
									<li>
										<Link
											to="/music"
											className="text-[#ECE6E6] hover:text-[#FFE72C] transition-colors flex items-center gap-2"
										>
											Music
											<img
												src="/images/link.png"
												alt=""
												className="w-4 h-4 mt-[1px]"
											/>
										</Link>
									</li>
									<li>
										<Link
											to="/supchuck"
											className="text-[#ECE6E6] hover:text-[#FFE72C] transition-colors flex items-center gap-2"
										>
											Supchuck
											<img
												src="/images/link.png"
												alt=""
												className="w-4 h-4 mt-[1px]"
											/>
										</Link>
									</li>
									<li>
										<Link
											to="/router"
											className="text-[#ECE6E6] hover:text-[#FFE72C] transition-colors flex items-center gap-2"
										>
											Router
											<img
												src="/images/link.png"
												alt=""
												className="w-4 h-4 mt-[1px]"
											/>
										</Link>
									</li>
									<li>
										<Link
											to="/archive"
											className="text-[#ECE6E6] hover:text-[#FFE72C] transition-colors flex items-center gap-2"
										>
											Archive
											<img
												src="/images/link.png"
												alt=""
												className="w-4 h-4 mt-[1px]"
											/>
										</Link>
									</li>
								</ul>
							</nav>
						</aside>

						{/* Main Content Area */}
						<main className="flex-1">
							<Outlet />
						</main>

						{/* Right Sidebar - GIFs */}
						<aside className="w-64 md:w-48 md:flex-shrink-0 mx-auto md:mx-0">
							<div className="p-4 rounded">
								<div className="space-y-4">
									<img
										src="/images/ie3.gif"
										alt="Internet Explorer 3"
										className="w-full"
									/>
									<img src="/images/flash.gif" alt="Flash" className="w-full" />
									<img src="/images/y2k.gif" alt="Y2k" className="w-full" />
									<img
										src="/images/macspin.gif"
										alt="Mac Spin"
										className="w-full"
									/>
									<img
										src="/images/cool.gif"
										alt="Cool Site"
										className="w-full"
									/>
								</div>
							</div>
						</aside>
					</div>
				</div>

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
