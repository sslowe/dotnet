const siteUrl = "https://sacramo.net";
const defaultImage = `${siteUrl}/og-image.png`;

function absoluteUrl(value: string) {
	return value.startsWith("http") ? value : new URL(value, siteUrl).toString();
}

export function seo({
	title,
	description,
	keywords,
	image = defaultImage,
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
}) {
	const imageUrl = absoluteUrl(image);
	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: imageUrl },
		{ name: "twitter:image:alt", content: title },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "sacramo.net" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:image", content: imageUrl },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:image:alt", content: title },
	];

	return tags.filter((tag) => "title" in tag || tag.content);
}
