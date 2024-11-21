import Link from "next/link";
import Instagram from "./shared/icons/Instagram";
import Bluesky from "./shared/icons/Bluesky";

export default function SocialLinks() {
	return (
		<ul className="flex gap-4 mb-4">
			<li>
				<Link
					href="https://bsky.app/profile/kieranmcclung.co.uk"
					className="text-indigo-600 transition-colors hover:text-black dark:text-indigo-500 dark:hover:text-white"
				>
					<Bluesky className="h-6 w-6" />
				</Link>
			</li>
			<li>
				<Link
					href="https://www.instagram.com/kieranmcclung.xyz/"
					className="text-indigo-600 transition-colors hover:text-black dark:text-indigo-500 dark:hover:text-white"
				>
					<Instagram className="h-6 w-6" />
				</Link>
			</li>
		</ul>
	);
}
