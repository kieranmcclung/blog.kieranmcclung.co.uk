"use client";

import { useEffect, useState } from "react";

export default function Footer() {
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className="py-6 max-w-7xl mx-auto text-center md:hidden">
			<span className="font-heading mb-0 mt-auto text-sm">
				&copy; {year}
			</span>
		</footer>
	);
}
