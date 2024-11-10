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
		<nav className="flex items-center justify-center mt-16 gap-x-1">
			{Array.from({ length: totalPages }, (_, i) =>
				i === currentPage - 1 ? (
					<span
						key={i}
						className={`font-bold font-heading px-2 py-4 text-sm`}
					>
						{i + 1}
					</span>
				) : (
					<a
						key={i}
						href={
							(i > 0 && `${slug ? "/" + slug : ""}/page/${i + 1}`) ||
							`${slug ? "/" + slug : "/"}`
						}
						className={`font-bold font-heading px-2 py-4 text-sm text-indigo-600 transition-colors dark:text-indigo-500 dark:hover:text-white hover:text-black`}
					>
						{i + 1}
					</a>
				)
			)}
		</nav>
	);
}
