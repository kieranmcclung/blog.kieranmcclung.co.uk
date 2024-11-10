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
			<Link
				href={`/${post.categoryName}/${post.slug}`}
				className="block flex gap-6 items-center"
			>
				{post?.featuredImage && (
					<figure className="block overflow-hidden relative rounded-xl shrink-0 w-1/4 lg:w-1/3 2xl:w-1/2">
						<Image
							alt={`cover image for ${post.title}`}
							src={post.featuredImage}
							height="400"
							width="400"
							className="aspect-square object-cover transition-transform w-full group-hover:scale-105"
						/>
					</figure>
				)}
				<div className="space-y-2">
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
					<h2 className="font-heading text-xl text-pretty transition-colors group-hover:text-indigo-600 group-hover:dark:text-indigo-500">
						{post.title}{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
							className="w-4 h-4 fill-indigo-600 inline-block relative dark:fill-indigo-500"
						>
							<path d="M320 96h32v32V352v32H288V352 205.3L86.6 406.6 64 429.3 18.7 384l22.6-22.6L242.7 160H96 64V96H96 320z"></path>
						</svg>
					</h2>
				</div>
			</Link>
		</article>
	);
}
