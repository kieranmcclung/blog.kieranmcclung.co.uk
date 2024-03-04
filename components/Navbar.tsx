"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	function toggleMenu() {
		const value = !isOpen;
		setIsOpen(value);
	}

	const pathname = usePathname();
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<div className="bg-slate-50 dark:bg-slate-950">
			<div className="flex items-center justify-start py-2 max-w-7xl mx-auto">
				<a
					href="/"
					className="font-heading text-2xl px-8 py-4 flex-initial transition-colors hover:text-slate-500"
				>
					Kieran McClung
				</a>

				<button
					id="nav-toggle"
					onClick={() => toggleMenu()}
					className="flex-initial ml-auto mr-8 z-20 sm:hidden"
					aria-label="Toggle navigation menu"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<nav
					id="main-nav"
					className={`${
						(isOpen ? "" : "hidden") +
						" fixed h-full w-full inset-0 bg-slate-100 z-10 sm:h-auto sm:w-auto sm:static sm:block sm:bg-transparent dark:bg-slate-900"
					}`}
				>
					<ul className="flex flex-col items-center gap-y-8 justify-center h-full sm:h-auto sm:flex-row sm:space-x-2 sm:justify-start">
						<li>
							<NavLink href="/art">Art</NavLink>
						</li>
						<li>
							<NavLink href="/bullshit">Bullshit</NavLink>
						</li>
						<li>
							<NavLink href="/design">Design</NavLink>
						</li>
						<li>
							<NavLink href="/gaming">Gaming</NavLink>
						</li>
						<li>
							<NavLink href="/web">Web</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

type NavLink = {
	href: string;
	children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLink) => {
	return (
		<Link
			className="font-bold decoration-2 decoration-pink-400 p-4 text-xl tracking-wide transition-colors underline hover:text-slate-500 sm:text-base"
			href={href}
		>
			{children}
		</Link>
	);
};
