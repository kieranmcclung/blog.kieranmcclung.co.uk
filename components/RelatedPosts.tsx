import RelatedPostPreview from "./RelatedPostPreview";

export default function RelatedPosts({ relatedPosts }: { relatedPosts: any }) {
	return (
		<div className="md:pl-6 lg:relative lg:w-64 xl:w-96">
			<div className="lg:opacity-40 lg:sticky lg:top-6 lg:transition-opacity lg:hover:opacity-100 mx-auto">
				<h3 className="font-heading text-lg mb-4">Other stuff</h3>
				<div className="gap-8 grid grid-cols-1">
					{relatedPosts.map(
						(post: any) =>
							typeof post !== "undefined" && (
								<div key={post.title}>
									<RelatedPostPreview post={post} />
								</div>
							)
					)}
				</div>
			</div>
		</div>
	);
}
