import PostPreview from "./PostPreview";

export default function RelatedPosts({ relatedPosts }: { relatedPosts: any }) {
	return (
		<div className="pt-6 lg:pt-10 pb-10">
			<h3 className="font-heading text-2xl mb-2 tracking-wide">Other stuff</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 mx-auto gap-x-8 gap-y-16">
				{relatedPosts.map(
					(post: any) =>
						// typeof post !== "undefined" &&
						typeof post !== "undefined" && (
							<div key={post.title}>
								<PostPreview post={post} />
							</div>
						)
				)}
			</div>
		</div>
	);
}
