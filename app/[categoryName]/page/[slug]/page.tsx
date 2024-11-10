import { Metadata, ResolvingMetadata } from "next";
import { getAllPosts } from "../../../../lib/api";
import Pagination from "../../../../components/Pagination";
import PostGrid from "../../../../components/PostGrid";

export async function generateMetadata(
    props: {
        params: Promise<{ categoryName: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const title = capitalizeFirstLetter(params.categoryName);

    return {
		title: title + " | Kieran McClung",
	};
}

export default async function Category(
    props: {
        params: Promise<{ categoryName: string; slug: string }>;
    }
) {
    const params = await props.params;
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
		<main>
			<div className="p-8">
				<h1 className="font-heading text-2xl">
					{title} <span className="text-sm">page {currentPage}</span>
				</h1>
			</div>

			<PostGrid recentPosts={paginatedPosts} />

			<Pagination
				totalPosts={totalPosts}
				currentPage={currentPage}
				slug={params.categoryName}
			/>
		</main>
	);
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
