import Link from "next/link";
import NavToggle from "./NavToggle";

export default function Navbar() {
	return (
		<div className="bg-slate-50 dark:bg-slate-950">
			<div className="flex items-center justify-start py-2 max-w-7xl mx-auto">
				<a
					href="/"
					className="font-heading text-2xl px-8 py-4 tracking-wide flex-initial transition-colors hover:text-slate-500"
				>
					Kieran McClung
				</a>

				<NavToggle />

				<nav
					id="main-nav"
					className="hidden fixed h-full w-full inset-0 bg-slate-100 z-10 sm:h-auto sm:w-auto sm:static sm:block sm:bg-transparent dark:bg-slate-900"
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
			className="font-bold text-xl sm:text-base underline decoration-2 decoration-pink-400 p-4 transition-colors hover:text-slate-500"
			href={href}
		>
			{children}
		</Link>
	);
};
