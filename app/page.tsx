import { Metadata } from "next";
import { getAllPosts } from "../lib/api";
import Pagination from "../components/Pagination";
import PostGrid from "../components/PostGrid";
import HeroPostPreview from "../components/HeroPostPreview";
import FeaturedPreview from "../components/FeaturedPreview";

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
		"heroImage",
		"featuredImage",
		"categoryName",
		"slug",
		"readTime",
	]);

	const totalPosts = posts.length;
	const postsPerPage = 12;
	const paginatedPosts =
		posts.length > postsPerPage - 1 ? posts.slice(3, postsPerPage) : posts;
	const heroPost = posts.slice(0, 1);
	const featuredPosts = posts.slice(1, 3);

	return (
		<main>
			<div className="p-8">
				<h1 className="font-heading text-2xl">What&apos;s he up to?</h1>
			</div>

			<div className="grid gap-8 mb-8 px-8 lg:grid-cols-[50%_auto] xl:grid-cols-[60%_auto]">
				{heroPost.map((post: any) => (
					<HeroPostPreview post={post} key={post.title} />
				))}
				<div className="flex flex-col gap-8">
					{featuredPosts.map((post: any) => (
						<FeaturedPreview post={post} key={post.title} />
					))}
				</div>
			</div>

			<PostGrid recentPosts={paginatedPosts} />

			<Pagination totalPosts={totalPosts} currentPage={1} />
		</main>
	);
}
