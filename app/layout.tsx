import "./globals.css";
import { Inter_Tight, Wix_Madefor_Text } from "next/font/google";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const inter_tight = Inter_Tight({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter-tight",
	weight: ["900"],
});

const wix_madefor_text = Wix_Madefor_Text({
	display: "swap",
	style: ["normal", "italic"],
	subsets: ["latin"],
	variable: "--font-wix-madefor-text",
	weight: ["400", "700", "800"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter_tight.variable} ${wix_madefor_text.variable} bg-slate-100 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-200`}
			>
				<Navbar />
				<div className="max-w-7xl mx-auto">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
