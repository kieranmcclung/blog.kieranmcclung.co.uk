"use client";

import { useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";

export default function Footer() {
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className="py-6 max-w-7xl mx-auto text-center md:hidden">
			<div className="flex justify-center">
				<SocialLinks />
			</div>
			<span className="font-heading mb-0 mt-auto text-sm">
				&copy; {year}
			</span>
		</footer>
	);
}
