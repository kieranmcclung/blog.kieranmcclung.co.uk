import { Metadata } from "next";
import { getAllPosts } from "../../../lib/api";
import Pagination from "../../../components/Pagination";
import PostGrid from "../../../components/PostGrid";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	return {
		title: "Kieran McClung | Page " + params.slug,
		description:
			"What's he up to now? A blog by Kieran McClung | Page" + params.slug,
		openGraph: {
			title: "Kieran McClung",
			description:
				"What's he up to now? A blog by Kieran McClung | Page" + params.slug,
			images: [
				"https://blog.kieranmcclung.co.uk/images/adam-miller-dbaz0xhckpy-unsplash-crop.jpg",
			],
		},
	};
}

export default async function Post({ params }: { params: { slug: string } }) {
	const posts = await getAllPosts([
		"title",
		"date",
		"featuredImage",
		"categoryName",
		"slug",
		"readTime",
	]);

	// convert the slug to a number
	const totalPosts = posts.length;
	const postsPerPage = 12;
	const currentPage = parseInt(params.slug);
	const pagination = currentPage * postsPerPage;

	const paginatedPosts =
		posts.length > pagination - 1
			? posts.slice(pagination - postsPerPage, pagination)
			: posts.slice(pagination - postsPerPage, posts.length);

	return (
		<div className="container mx-auto p-8 pb-16">
			<main>
				<div className="space-y-1 mb-12 md:mt-12">
					<h1 className="text-5xl md:text-6xl font-heading">Kieran McClung</h1>
					<p className="text-2xl mb-2 tracking-wide">
						Page {currentPage} of what he's been up to.
					</p>
				</div>

				<PostGrid recentPosts={paginatedPosts} />

				<Pagination totalPosts={totalPosts} currentPage={currentPage} />
			</main>
		</div>
	);
}
