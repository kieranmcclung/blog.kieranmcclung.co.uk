import { Metadata } from "next";
import { getAllPosts } from "../../../lib/api";
import Pagination from "../../../components/Pagination";
import PostGrid from "../../../components/PostGrid";

export async function generateMetadata(
    props: {
        params: Promise<{ slug: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    return {
		title: "Kieran McClung | Page " + params.slug,
		description:
			"What's he up to now? A blog by Kieran McClung | Page" + params.slug,
		openGraph: {
			title: "Kieran McClung",
			description:
				"What's he up to now? A blog by Kieran McClung | Page" +
				params.slug,
			images: [
				"https://blog.kieranmcclung.co.uk/images/adam-miller-dbaz0xhckpy-unsplash-crop.jpg",
			],
		},
	};
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
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
		<main>
			<div className="p-8">
				<h1 className="font-heading text-2xl">
					What&apos;s he up to?{" "}
					<span className="block text-sm">Page {currentPage}</span>
				</h1>
			</div>

			<PostGrid recentPosts={paginatedPosts} />

			<Pagination totalPosts={totalPosts} currentPage={currentPage} />
		</main>
	);
}
