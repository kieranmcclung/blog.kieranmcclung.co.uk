import DateFormatter from "./DateFormatter";
import TimeToRead from "./TimeToRead";
import Image from "next/image";
import Link from "next/link";

type Items = {
	[key: string]: string;
};

export default function HeroPostPreview({ post }: { post: Items }) {
	return (
		<article className="w-full mx-auto group">
			<Link href={`/${post.categoryName}/${post.slug}`} className="relative">
				{post?.featuredImage && (
					<figure className="block h-full overflow-hidden rounded-xl">
						<Image
							alt={`cover image for ${post.title}`}
							src={post.featuredImage}
							height="720"
							width="1080"
							className="aspect-video object-cover transition-transform w-full group-hover:scale-105 max-md:aspect-square"
						/>
					</figure>
				)}

				<div className="absolute bg-white bottom-0 left-0 py-6 pr-6 rounded-tr-xl dark:bg-black max-md:w-11/12 md:pl-6">
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
