import { Metadata, ResolvingMetadata } from "next";
import { getAllPosts } from "../../lib/api";
import PostGrid from "../../components/PostGrid";

export async function generateMetadata({
	params,
}: {
	params: { categoryName: string };
}): Promise<Metadata> {
	const title = capitalizeFirstLetter(params.categoryName);

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return {
		title: title + " | Kieran McClung",
	};
}

export default async function Category({
	params,
}: {
	params: { categoryName: string };
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

	return (
		<div className="container mx-auto p-8 pb-16">
			<main>
				<div className="mb-12 md:mt-12">
					<h1 className="text-5xl md:text-6xl font-heading">
						{params.categoryName}
					</h1>
				</div>

				<PostGrid recentPosts={posts} />
			</main>
		</div>
	);
}
