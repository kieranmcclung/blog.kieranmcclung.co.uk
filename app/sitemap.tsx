import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/api";

const EXTERNAL_DATA_URL = "https://blog.kieranmcclung.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = ["", "art", "bullshit", "design", "gaming", "web"];
	const pageUrls = pages.map((page) => ({
		url: `${EXTERNAL_DATA_URL}${page !== "" ? "/" + page : page}`,
		lastModified: new Date(),
		priority: page === "" ? 1 : 0.8,
		changeFrequency: "monthly",
	}));

	const posts = await getAllPosts(["date", "categoryName", "slug"]);
	const postUrls = posts.map((post: any) => ({
		url: `${EXTERNAL_DATA_URL}/${post.categoryName}/${post.slug}`,
		lastModified: new Date(post.date),
		priority: 0.5,
		changeFrequency: "yearly",
	}));

	return [...pageUrls, ...postUrls];
}
