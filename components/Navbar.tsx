"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	function toggleMenu() {
		const value = !isOpen;
		setIsOpen(value);
	}

	const pathname = usePathname();
	useEffect(() => {
		setIsOpen(false);
		setYear(new Date().getFullYear());
	}, [pathname]);

	const [year, setYear] = useState(new Date().getFullYear());

	return (
		<div className="flex flex-col gap-4 pt-8 px-8 md:h-svh md:pb-8 md:sticky md:top-0 md:w-48 xl:w-64">
			<Link
				href="/"
				className="font-heading text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-500"
			>
				Kieran McClung
			</Link>
			<div className="flex items-center justify-start -ml-2">
				<button
					id="nav-toggle"
					onClick={() => toggleMenu()}
					className="absolute -mt-1 right-8 text-indigo-600 top-8 z-20 dark:text-indigo-500 md:hidden"
					aria-label="Toggle navigation menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-8 h-8 fill-current"
						viewBox="0 -960 960 960"
					>
						<path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
					</svg>
				</button>
				<nav
					id="main-nav"
					className={`${
						(isOpen ? "" : "hidden") +
						" bg-white fixed h-full py-4 w-full inset-0 z-10 md:h-auto md:static md:block md:bg-transparent dark:bg-black"
					}`}
				>
					<ul className="flex flex-col gap-y-2 h-full items-center justify-center md:items-start">
						<li>
							<NavLink href="/art-design">Art &amp; Design</NavLink>
						</li>
						<li>
							<NavLink href="/bullshit">Bullshit</NavLink>
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

			<div className="font-heading hidden mb-0 mt-auto text-sm md:block">
				<SocialLinks />
				&copy; {year}
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
			className="block font-heading p-2 text-indigo-600 tracking-wide transition-colors hover:text-black dark:text-indigo-500 dark:hover:text-white md:text-sm"
			href={href}
		>
			{children}
		</Link>
	);
};
