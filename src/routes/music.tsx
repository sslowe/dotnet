import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/music")({
	head: () => ({
		meta: [
			...seo({
				title: "music | sacramo.net",
			}),
		],
	}),
	component: Music,
});

function Music() {
	return (
		<div className="space-y-6 mt-4 md:mt-0">
			<section className="relative bg-[#03001B]/80 pt-6 pb-6 px-6">
				<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none">
					Music
				</h2>
				<div className="text-[#ECE6E6] mt-3">
					<table
						className="w-full border-collapse"
						border={1}
						cellPadding={10}
						cellSpacing={0}
					>
						<thead>
							<tr className="bg-[#03001B]">
								<th className="text-left border border-[#77FFE4] pl-1">
									Title
								</th>
								<th className="text-left border border-[#77FFE4] px-1">Link</th>
								<th className="text-left border border-[#77FFE4] pl-1">
									Notes
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-[#77FFE4] pl-1">
									grow a garden, rowdy
								</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://hatetoquit.bandcamp.com/track/stewart-screamer-grow-a-garden-rowdy"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									Appears on Merciless Accelerating Rhythms - Artists United for
									a Free Palestine
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">
									In My Mind Are All The Tides
								</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://vimeo.com/706801018#t=51m00s"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									SLOrk @ Bing 2022 Composition
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Go Sporks!</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://vimeo.com/684082368#t=1h10m"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									SLOrktastic Chamber Music 2022 Composition
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Artifact</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://youtu.be/Cl6f6tDbgvE"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									Chor. Marissa Kuczkowski
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">
									Resurection Machine / 003
								</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://youtu.be/ZpWxfPxqPRA"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									Collab. Arts + Crafts
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Outta Time</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://youtu.be/ifMVvEvH0rQ"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									Collab. Arts + Crafts
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Slowe Byrne</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://open.spotify.com/album/3BCCIn0IcqjLbYFvkgGNIX?si=qZqE0q18TOOW_BFtKy7aEQ"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">
									Collab. Arts + Crafts
								</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">
									The Haulin' Sessions
								</td>
								<td className="border border-[#77FFE4]">
									<a
										href="https://on.soundcloud.com/tvuUsdibbFLGpDMiQ8"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="/images/externallink.png"
											alt=""
											className="w-4 h-4 m-3"
										/>
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Compilation</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
