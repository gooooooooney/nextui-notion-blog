import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';
import Header from "@/components/navbar/header";
import { Inter } from 'next/font/google'
import { Background } from "@/components/background";
import { Spotlight } from "@/components/spotlight";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
})



export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	keywords: siteConfig.keywords,
	description: siteConfig.description,
};


const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen  font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>

					<div className="relative flex flex-col h-screen">
						<Background />

						<Header
							navbarProps={{
								// shouldHideOnScroll: true,
								maxWidth: "2xl",
							}}
						/>
						<main className=" w-full  flex-grow">
							<Spotlight />
							{children}
							<Toaster position="bottom-center" />
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
