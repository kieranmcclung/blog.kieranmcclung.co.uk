import DateFormatter from "./DateFormatter";
import TimeToRead from "./TimeToRead";
import Image from "next/image";
import Link from "next/link";

type Items = {
	[key: string]: string;
};

export default function PostPreview({ post }: { post: Items }) {
	return (
		<article className="w-full mx-auto group">
			<Link href={`/${post.categoryName}/${post.slug}`}>
				{post?.featuredImage && (
					<figure className="relative">
						<Image
							alt={`cover image for ${post.title}`}
							src={post.featuredImage}
							height="400"
							width="400"
							className="aspect-video object-cover rounded-xl transition group-hover:scale-105 group-hover:shadow-lg"
							style={{ width: "100%" }}
						/>
					</figure>
				)}
				<div className="mt-6 space-y-2">
					<div className="flex items-center space-x-4">
						<DateFormatter dateString={post.date} />
						<TimeToRead time={post.readTime} />
					</div>
					<h2 className="font-heading text-3xl md:text-4xl transition-colors group-hover:text-slate-500">
						{post.title}{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
							className="w-6 h-6 fill-pink-400 inline-block -bottom-2 relative transition-colors group-hover:fill-slate-500"
						>
							<path d="M320 96h32v32V352v32H288V352 205.3L86.6 406.6 64 429.3 18.7 384l22.6-22.6L242.7 160H96 64V96H96 320z"></path>
						</svg>
					</h2>
				</div>
			</Link>
		</article>
	);
}
