import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/archive')({ 
	head: () => ({
		meta: [
			...seo({
				title: 'archive | sacramo.net',
			}),
		],
	}),
	component: Archive 
})

function Archive() {
	return (
		<div className="space-y-6 mt-4 md:mt-0">
			<section className="relative bg-[#03001B]/80 pt-6 pb-6 px-6">
				<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none">
					Projects
				</h2>
				<div className="text-[#ECE6E6] mt-3">
					<table className="w-full border-collapse" border={1} cellPadding={10} cellSpacing={0}>
						<thead>
							<tr className="bg-[#03001B]">
								<th className="text-left border border-[#77FFE4] pl-1">Title</th>
								<th className="text-left border border-[#77FFE4] px-1">Link</th>
								<th className="text-left border border-[#77FFE4] pl-1">Notes</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Galaxial</td>
								<td className="border border-[#77FFE4]">
									<a href="https://ccrma.stanford.edu/~sacramo/galaxial/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Audiovisual VR Experiment (Chunity)</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Deus In Machina</td>
								<td className="border border-[#77FFE4]">
									<a href="https://ccrma.stanford.edu/~sacramo/256a/final/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Music, Computing, and Design Course Project (Chunity)</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Beluga</td>
								<td className="border border-[#77FFE4]">
									<a href="https://ccrma.stanford.edu/~sacramo/256a/hw3/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Music, Computing, and Design Project (Chunity)</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Rabbit Ears</td>
								<td className="border border-[#77FFE4]">
									<a href="https://ccrma.stanford.edu/~sacramo/256a/hw2/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Music, Computing, and Design Project (Chunity)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
			<section className="relative bg-[#03001B]/80 pt-6 pb-6 px-6">
				<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none">
					Research
				</h2>
				<div className="text-[#ECE6E6] mt-3">
					<table className="w-full border-collapse" border={1} cellPadding={10} cellSpacing={0}>
						<thead>
							<tr className="bg-[#03001B]">
								<th className="text-left border border-[#77FFE4] pl-1">Title</th>
								<th className="text-left border border-[#77FFE4] px-1">Link</th>
								<th className="text-left border border-[#77FFE4] pl-1">Notes</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Lightening the Load: DeLighT Blocks for Faster QA Training and Ensembling</td>
								<td className="border border-[#77FFE4]">
									<a href="/archive/cs224.pdf" target="_blank" rel="noopener noreferrer">
										<img src="/images/file.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">CS224N Course Project</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">A Fully-Unsupervised Generative Method for Choreo-Musical Translation</td>
								<td className="border border-[#77FFE4]">
									<a href="/archive/cs229.pdf" target="_blank" rel="noopener noreferrer">
										<img src="/images/file.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">CS229 Course Project</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Visual Price Estimation for Real Estate</td>
								<td className="border border-[#77FFE4]">
									<a href="/archive/cs231.pdf" target="_blank" rel="noopener noreferrer">
										<img src="/images/file.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">CS231N Course Project</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Policy-GNN/Policy-GAT</td>
								<td className="border border-[#77FFE4]">
									<a href="/archive/cs224w.pdf" target="_blank" rel="noopener noreferrer">
										<img src="/images/file.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">CS224W Course Project</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">An Inverse Reinforcement Learning Approach to Generative Music</td>
								<td className="border border-[#77FFE4]">
									<a href="/archive/thesis.pdf" target="_blank" rel="noopener noreferrer">
										<img src="/images/file.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Senior Honors Thesis</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Impact Sound Neural Network</td>
								<td className="border border-[#77FFE4]">
									<a href="https://link.springer.com/chapter/10.1007/978-3-030-01267-0_34" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">ECCV 2018</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
			<section className="relative bg-[#03001B]/80 pt-6 pb-6 px-6">
				<h2 className="absolute -top-[18px] left-4 bg-[#03001B] px-2 text-[#77FFE4] font-['Jersey_25'] text-4xl leading-none">
					Press
				</h2>
				<div className="text-[#ECE6E6] mt-3">
					<table className="w-full border-collapse" border={1} cellPadding={10} cellSpacing={0}>
						<thead>
							<tr className="bg-[#03001B]">
								<th className="text-left border border-[#77FFE4] pl-1">Title</th>
								<th className="text-left border border-[#77FFE4] px-1">Link</th>
								<th className="text-left border border-[#77FFE4] pl-1">Notes</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Merciless Accelerating Rhythms Release</td>
								<td className="border border-[#77FFE4]">
									<a href="https://pitchfork.com/news/phil-elverum-shares-new-mount-eerie-song-on-palestine-benefit-album-listen/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Pitchfork</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">recycleReality Podcast</td>
								<td className="border border-[#77FFE4]">
									<a href="https://www.moreheadcain.org/blog/the-catalyze-podcast-sam-lowe-20-scott-diekema-19-nicholas-byrne-19-and-jonny-huang-24-of-recyclereality-on-launching-a-creative-technology-studio-in-new-york/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Morehead-Cain Catalyze</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Haulin' Sessions 2 Podcast</td>
								<td className="border border-[#77FFE4]">
									<a href="https://www.moreheadcain.org/blog/the-catalyze-podcast-eric-lee-18-nicholas-byrne-19-and-sam-lowe-20-on-making-music-art-on-the-road-with-u-haul/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Morehead-Cain Catalyze</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Smithonia 10 Op-Ed</td>
								<td className="border border-[#77FFE4]">
									<a href="https://www.onlineathens.com/story/opinion/2020/08/23/opinion-smithonia-10-give-us-hope/43075731/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Athens Banner-Herald</td>
							</tr>
							<tr>
								<td className="border border-[#77FFE4] pl-1">Haulin' Sessions Interview</td>
								<td className="border border-[#77FFE4]">
									<a href="https://roadtrippers.com/magazine/haulin-sessions-music-road-trip-south/" target="_blank" rel="noopener noreferrer">
										<img src="/images/externallink.png" alt="" className="w-4 h-4 m-3" />
									</a>
								</td>
								<td className="border border-[#77FFE4] pl-1">Roadtrippers</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}
