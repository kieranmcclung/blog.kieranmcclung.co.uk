import "./globals.css";
import { IBM_Plex_Mono, Wix_Madefor_Text } from "next/font/google";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const wix_madefor_text = Wix_Madefor_Text({
	display: "swap",
	style: ["normal", "italic"],
	subsets: ["latin"],
	variable: "--font-wix-madefor-text",
	weight: ["400", "700", "800"],
});

const ibm_plex_mono = IBM_Plex_Mono({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-ibm-plex-mono",
	weight: ["400", "700"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${ibm_plex_mono.variable} ${wix_madefor_text.variable} bg-white font-sans text-black md:grid md:grid-cols-site-layout dark:bg-black dark:text-white`}
			>
				<Navbar />
				<div>
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
