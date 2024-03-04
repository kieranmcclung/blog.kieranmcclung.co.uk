"use client";

export default function Pagination({
	totalPosts,
	currentPage,
	slug,
}: {
	totalPosts: number;
	currentPage: number;
	slug?: string;
}) {
	const postsPerPage = 12;
	const totalPages = Math.ceil(totalPosts / postsPerPage);

	return totalPosts <= postsPerPage ? null : (
		<nav className="flex items-center justify-center mt-16 space-x-1">
			{Array.from({ length: totalPages }, (_, i) =>
				i === currentPage - 1 ? (
					<span key={i} className={`p-4`}>
						{i + 1}
					</span>
				) : (
					<a
						key={i}
						href={
							(i > 0 && `${slug ? "/" + slug : ""}/page/${i + 1}`) ||
							`${slug ? "/" + slug : "/"}`
						}
						className={`font-bold decoration-2 decoration-pink-400 p-4 tracking-wide transition-colors underline hover:text-slate-500`}
					>
						{i + 1}
					</a>
				)
			)}
		</nav>
	);
}
