import PostPreview from "./PostPreview";

export default function PostGrid({ recentPosts }: { recentPosts: any }) {
	return (
		<div className="grid grid-cols-1 gap-16 px-8 lg:grid-cols-2 3xl:grid-cols-3">
			{recentPosts.map((post: any) => (
				<PostPreview post={post} key={post.title} />
			))}
		</div>
	);
}
