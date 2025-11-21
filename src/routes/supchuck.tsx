import { createFileRoute } from '@tanstack/react-router'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/supchuck')({ 
	head: () => ({
		meta: [
			...seo({
				title: 'supchuck | sacramo.net',
			}),
		],
	}),
	component: Supchuck 
})

function Supchuck() {
	return (
		<div className="space-y-6">
			<section className="relative bg-[#03001B]/80 border-2 border-[#77FFE4] rounded">
				<div className="absolute w-full h-[600px] inset-0 flex items-center justify-center text-[#77FFE4] text-4xl font-['Jersey_25']">
					loading...
				</div>
				<iframe
					src="https://supchuck.net"
					className="w-full h-[600px] border-0 relative"
					title="Supchuck"
				/>
			</section>
			<section className='relative text-center w-full mt-2'>
				<a href='https://supchuck.net' target="_blank" rel="noopener noreferrer" className="text-5xl text-[#FFE72C] font-['Jersey_25'] bg-[#03001B] m-[3px]">
					Visit
					<img src="/images/externallink.png" alt="" className="inline w-8 h-8 ml-2" />
				</a>
			</section>
		</div>
	)
}
