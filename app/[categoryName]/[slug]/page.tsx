import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getRelatedPosts } from "../../../lib/api";
import { getImageSizes } from "../../../lib/getImageSizes";
import DateFormatter from "../../../components/DateFormatter";
import TimeToRead from "../../../components/TimeToRead";
import Image from "next/image";
import RelatedPosts from "../../../components/RelatedPosts";
import PostBody from "@/components/PostBody";

export async function generateMetadata({
	params,
}: {
	params: { slug: string; categoryName: string };
}): Promise<Metadata> {
	const post = getPostBySlug(params.slug, params.categoryName, [
		"title",
		"featuredImage",
		"seoTitle",
		"seoDescription",
	]);

	if (typeof post !== "undefined") {
		return {
			title: (post.seoTitle || post.title) + " | Kieran McClung",
			description: post.seoDescription || "",
			openGraph: {
				images: [post.featuredImage],
			},
		};
	} else {
		return {};
	}
}

export default async function Post({
	params,
}: {
	params: { slug: string; categoryName: string };
}) {
	const post = getPostBySlug(params.slug, params.categoryName, [
		"title",
		"date",
		"readTime",
		"content",
		"featuredImage",
		"instaUrl",
		"showDonationLink",
	]);

	if (typeof post !== "undefined") {
		const imageSizes = getImageSizes({ post });

		const posts = await getRelatedPosts(
			[
				"title",
				"date",
				"excerpt",
				"featuredImage",
				"categoryName",
				"slug",
				"readTime",
			],
			params.slug,
			params.categoryName
		);

		let totalPosts = 4;
		if (post.instaUrl) {
			totalPosts = 3;
		}
		const relatedPosts =
			posts.length > totalPosts - 1 ? posts.slice(0, totalPosts) : posts;

		return (
			<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 p-8">
				<main className="max-w-full md:max-w-3xl mx-auto md:my-12 lg:col-span-2 lg:ml-0">
					{post?.featuredImage && post.instaUrl ? (
						<Image
							alt={`cover image for ${post.title}`}
							src={post.featuredImage}
							width={720}
							height={720}
							className="aspect-square object-cover mb-8 rounded-lg"
							style={{ width: "100%" }}
						/>
					) : (
						<Image
							alt={`cover image for ${post.title}`}
							src={post.featuredImage}
							width={720}
							height={300}
							className="aspect-video object-cover mb-8 rounded-lg"
							style={{ width: "100%" }}
						/>
					)}

					<div className="space-y-1 mb-12 md:mt-12">
						<div className="flex items-center space-x-4">
							<DateFormatter dateString={post.date} />
							<TimeToRead time={post.readTime} />
						</div>

						<h1 className="text-5xl md:text-7xl font-heading break-words max-w-full">
							{post.title}
						</h1>
					</div>

					{post.instaUrl ? (
						<a
							href={post.instaUrl}
							className="-mt-8 mb-12 lg:mb-0 block font-bold underline decoration-2 decoration-pink-400 hover:text-slate-500"
							target="_blank"
						>
							View on Instagram
						</a>
					) : (
						""
					)}

					<div className="w-full">
						<PostBody content={post.content} imageSizes={imageSizes} />

						{post.showDonationLink ? (
							<div className="mt-8 p-4 rounded-md bg-slate-50 dark:bg-slate-950 flex items-center">
								<Image
									src="/kofi_s_logo_nolabel.png"
									alt="Ko-fi logo"
									width={64}
									height={64}
								/>
								<div>
									If you found this post useful, feel free to leave me a tip on{" "}
									<a
										className="font-bold underline decoration-2 decoration-pink-400 hover:text-slate-500 transition-colors"
										href="https://ko-fi.com/kieranmcclung"
									>
										ko-fi
									</a>{" "}
									xx
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</main>
				<RelatedPosts relatedPosts={relatedPosts} />
			</div>
		);
	} else {
		notFound();
	}
}
