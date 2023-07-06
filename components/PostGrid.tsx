import PostPreview from "./PostPreview";

export default function PostGrid({ recentPosts }: { recentPosts: any }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-x-8 gap-y-16">
			{recentPosts.map((post: any) => (
				<div key={post.title}>
					<PostPreview post={post} />
				</div>
			))}
		</div>
	);
}
