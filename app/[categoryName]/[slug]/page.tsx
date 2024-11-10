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
		const absUrlImage = `https://blog.kieranmcclung.co.uk${post.featuredImage}`;

		return {
			title: (post.seoTitle || post.title) + " | Kieran McClung",
			description: post.seoDescription || "",
			openGraph: {
				title: (post.seoTitle || post.title) + " | Kieran McClung",
				description: post.seoDescription || "",
				images: [
					{
						url: absUrlImage,
						width: 720,
						height: 300,
						alt: `cover image for ${post.title}`,
					},
				],
			},
		};
	} else {
		return {};
	}
}

type PostParams = Promise<{ slug: string; categoryName: string }>;

export default async function Post({ params }: { params: PostParams }) {
	const { slug, categoryName } = await params;
	const post = getPostBySlug(slug, categoryName, [
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
			slug,
			categoryName
		);

		let totalPosts = 3;
		const relatedPosts =
			posts.length > totalPosts - 1 ? posts.slice(0, totalPosts) : posts;

		return (
			<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 p-8">
				<main className="max-w-full md:max-w-3xl mx-auto lg:col-span-2 lg:ml-0">
					<div className="mb-6 relative">
						{post?.featuredImage && (
							<figure className="block overflow-hidden rounded-xl">
								<Image
									alt={`cover image for ${post.title}`}
									src={post.featuredImage}
									height="1080"
									width="1920"
									className="aspect-square object-cover md:aspect-video"
								/>
							</figure>
						)}
						<div className="absolute bg-white bottom-0 left-0 max-w-[90%] py-6 pr-6 rounded-tr-xl dark:bg-black md:pl-6">
							<div className="flex flex-wrap items-center mb-2 gap-x-1.5">
								<DateFormatter dateString={post.date} />
								{(post?.readTime && post.readTime != "0" && (
									<>
										<span className="text-xs">&bull;</span>
										<TimeToRead time={post.readTime} />
									</>
								)) ||
									""}
							</div>
							<h1 className="font-heading text-2xl text-pretty">
								{post.title}
							</h1>
						</div>
					</div>

					<div className="w-full md:pl-6">
						<PostBody content={post.content} imageSizes={imageSizes} />

						{post.showDonationLink ? (
							<div className="border border-black inline-flex items-center justify-center mt-4 pl-4 pr-8 rounded-xl dark:border-white">
								<Image
									src="/kofi_s_logo_nolabel.png"
									alt="Ko-fi logo"
									width={64}
									height={64}
								/>
								<p>
									If you found this post useful, feel free to leave me
									a tip on{" "}
									<a
										className="font-bold text-indigo-600 transition-colors dark:text-indigo-500 hover:text-black dark:hover:text-white"
										href="https://ko-fi.com/kieranmcclung"
									>
										ko-fi
									</a>{" "}
									xx
								</p>
							</div>
						) : (
							""
						)}
					</div>

					{post.instaUrl ? (
						<a
							href={post.instaUrl}
							className="block font-bold underline decoration-2 decoration-pink-400 text-lg hover:text-slate-500"
							target="_blank"
						>
							View on Instagram
						</a>
					) : (
						""
					)}
				</main>
				<RelatedPosts relatedPosts={relatedPosts} />
			</div>
		);
	} else {
		notFound();
	}
}
