import { useMDXComponent } from "@content-collections/mdx/react";
import type * as React from "react";

const components = {
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={`mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={`mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight text-[#ECE6E6] first:mt-0 ${className}`}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={`mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={`mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h5
			className={`mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h6
			className={`mt-8 scroll-m-20 text-base font-semibold tracking-tight text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	a: ({
		className,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<a className={`font-medium text-[#FFE72C] ${className}`} {...props}>
			{props.children}
			{props.href?.startsWith("/") ? (
				<img
					src="/images/link.png"
					alt=""
					className="inline w-4 h-4 ml-1 mb-[1px]"
				/>
			) : props.href?.startsWith("#") ? (
				<></>
			) : (
				<img
					src="/images/externallink.png"
					alt=""
					className="inline w-4 h-4 ml-[2px] mb-[2px]"
				/>
			)}
		</a>
	),
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className={`leading-7 text-[#ECE6E6] [&:not(:first-child)]:mt-6 ${className}`}
			{...props}
		/>
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			className={`my-6 ml-6 list-disc text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className={`my-6 ml-6 list-decimal text-[#ECE6E6] ${className}`}
			{...props}
		/>
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
		<li className={`mt-2 text-[#ECE6E6] ${className}`} {...props} />
	),
	blockquote: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={`mt-6 border-l-2 border-[#77FFE4] pl-6 italic text-[#77FFE4] ${className}`}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img
			className={`rounded-md border border-[#77FFE4] ${className}`}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className="my-4 md:my-8 border-[#77FFE4]" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto">
			<table className={`w-full border-collapse ${className}`} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={`m-0 border-t border-[#77FFE4] p-0 even:bg-[#03001B]/40 ${className}`}
			{...props}
		/>
	),
	th: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
		<th
			className={`border border-[#77FFE4] px-4 py-2 text-left font-bold text-[#ECE6E6] [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
			{...props}
		/>
	),
	td: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableDataCellElement>) => (
		<td
			className={`border border-[#77FFE4] px-4 py-2 text-left text-[#ECE6E6] [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className={`overflow-x-auto rounded-lg border border-[#77FFE4] bg-[#03001B] py-4 ${className}`}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={`relative rounded border border-[#77FFE4] bg-[#03001B]/40 px-[0.3rem] py-[0.2rem] font-mono text-sm text-[#77FFE4] ${className}`}
			{...props}
		/>
	),
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
