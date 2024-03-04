import { Metadata, ResolvingMetadata } from "next";
import { getAllPosts } from "../../../../lib/api";
import Pagination from "../../../../components/Pagination";
import PostGrid from "../../../../components/PostGrid";

export async function generateMetadata({
	params,
}: {
	params: { categoryName: string };
}): Promise<Metadata> {
	const title = capitalizeFirstLetter(params.categoryName);

	return {
		title: title + " | Kieran McClung",
	};
}

export default async function Category({
	params,
}: {
	params: { categoryName: string; slug: string };
}) {
	const posts = await getAllPosts(
		[
			"title",
			"date",
			"excerpt",
			"featuredImage",
			"categoryName",
			"slug",
			"readTime",
		],
		params.categoryName
	);

	const title = capitalizeFirstLetter(params.categoryName);

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
				<div className="mb-12 md:mt-12">
					<h1 className="text-5xl md:text-6xl font-heading">{title}</h1>
					<p className="text-2xl mb-2 tracking-wide">Page {currentPage}</p>
				</div>

				<PostGrid recentPosts={paginatedPosts} />

				<Pagination
					totalPosts={totalPosts}
					currentPage={currentPage}
					slug={params.categoryName}
				/>
			</main>
		</div>
	);
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
