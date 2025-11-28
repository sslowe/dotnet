import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<section className="relative bg-[#03001B]/80 border-2 border-[#77FFE4] pt-6 pb-6 px-6 rounded">
				<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none flex items-center gap-2">
					<img src="/images/recycle.gif" alt="" className="inline h-6" />
					Welcome
					<img src="/images/recycle.gif" alt="" className="inline h-6" />
				</h2>
				<div className="text-[#ECE6E6] space-y-4 mt-3">
					<p>
						Hi, I'm Sam - known online as <b>sslowe</b> or <b>sacramo</b>. I'm a
						developer who builds a variety of interactive digital experiences as
						co-founder and lead engineer at Router and personally via Supchuck.
						Some highlights include an{" "}
						<a
							href="https://mapster.website"
							className="text-[#FFE72C]"
							target="_blank"
							rel="noopener noreferrer"
						>
							interactive mapping project
						</a>
						<img
							src="/images/externallink.png"
							alt=""
							className="inline w-4 h-4 ml-[2px] mb-[2px]"
						/>{" "}
						for Pinegrove and a{" "}
						<a
							href="https://audiobook.gallery"
							className="text-[#FFE72C]"
							target="_blank"
							rel="noopener noreferrer"
						>
							multimedia album gallery in virtual reality
						</a>
						<img
							src="/images/externallink.png"
							alt=""
							className="inline w-4 h-4 ml-[2px] mb-[2px]"
						/>{" "}
						for Sam Gendel and Marcella Cytrynowicz.
					</p>
					<p>
						I like to write about my work and share the insights I discover
						along the way on my blog. As an avid musician, I'm fascinated by the
						overlap between music and technology, a theme that has served as a
						through line for much of my work.
					</p>
					<p>
						I'm a former member of the Stanford Laptop Orchestra, as well as a
						student and researcher at its departmental home: the Center for
						Computer Research in Music and Acoustics. I specialized in
						artificial intelligence as a Master's student at Stanford and was
						also a member of research labs at both Berkeley and UNC.
					</p>
					<p>
						I believe that technology should serve to make us more curious,
						creative, and enmeshed in the world around us, not stoke
						indifference and alienation. I aim to build tools and toys that are
						hopeful about what technology can be and that reward thoughtful
						engagement without ever attempting to monopolize it.
					</p>
				</div>
			</section>

			{/* Updates Section */}
			<section className="relative bg-[#03001B]/80 border-2 border-[#ED4848] pt-6 pb-6 px-6 rounded">
				<h2 className="absolute -top-[15px] left-4 bg-[#03001B] px-2 text-[#ED4848] font-['Jersey_25'] text-3xl leading-none">
					<img src="/images/new.gif" alt="" className="inline h-5 mr-2" />
					Updates
					<img src="/images/new.gif" alt="" className="inline h-5 ml-2" />
				</h2>
				<div className="text-[#ECE6E6] space-y-3 mt-2">
					<div className="border-l-2 border-[#ED4848] pl-3">
						<p>
							<span className="text-[#ECE6E6]">11/19/2025</span> - 3, 2, 1...
							launch!{" "}
							<img
								src="/images/smile.gif"
								alt=""
								className="inline h-4 mb-[3px]"
							/>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
