import { Metadata } from "next";
import { getAllPosts } from "../lib/api";
import PostGrid from "../components/PostGrid";

export const metadata: Metadata = {
	title: "Kieran McClung",
	description: "What's he up to now? A blog by Kieran McClung",
	openGraph: {
		title: "Kieran McClung",
		description: "What's he up to now? A blog by Kieran McClung",
		images: [
			"https://blog.kieranmcclung.co.uk/images/adam-miller-dbaz0xhckpy-unsplash-crop.jpg",
		],
	},
};

export default async function Home() {
	const posts = await getAllPosts([
		"title",
		"date",
		"featuredImage",
		"categoryName",
		"slug",
		"readTime",
	]);

	return (
		<div className="container mx-auto p-8 pb-16">
			<main>
				<div className="space-y-1 mb-12 md:mt-12">
					<h1 className="text-5xl md:text-6xl font-heading">Kieran McClung</h1>
					<p className="text-2xl mb-2 tracking-wide">
						What&apos;s he up to now?
					</p>
				</div>

				<PostGrid recentPosts={posts} />
			</main>
		</div>
	);
}
