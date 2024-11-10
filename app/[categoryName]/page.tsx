import { Metadata, ResolvingMetadata } from "next";
import { getAllPosts } from "../../lib/api";
import Pagination from "../../components/Pagination";
import PostGrid from "../../components/PostGrid";
import HeroPostPreview from "../../components/HeroPostPreview";
import FeaturedPreview from "../../components/FeaturedPreview";

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
	params: { categoryName: string };
}) {
	const posts = await getAllPosts(
		[
			"title",
			"date",
			"excerpt",
			"heroImage",
			"featuredImage",
			"categoryName",
			"slug",
			"readTime",
		],
		params.categoryName
	);

	const title = capitalizeFirstLetter(params.categoryName);

	const totalPosts = posts.length;
	const postsPerPage = 12;
	const paginatedPosts =
		posts.length > postsPerPage - 1
			? posts.slice(3, postsPerPage)
			: posts.slice(3);
	const heroPost = posts.slice(0, 1);
	const featuredPosts = posts.slice(1, 3);

	return (
		<main>
			<div className="p-8">
				<h1 className="font-heading text-2xl">{title}</h1>
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

			<Pagination
				totalPosts={totalPosts}
				currentPage={1}
				slug={params.categoryName}
			/>
		</main>
	);
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
