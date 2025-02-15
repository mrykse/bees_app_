import "../styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import {Navbar} from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import Head from "next/head";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
									   children,
								   }: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Head>
			<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
			<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
			</Head>
		<body
			className={clsx(
				"min-h-screen bg-background font-sans antialiased",
				fontSans.variable
			)}
		>
		<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
			<div className="relative flex flex-col h-screen">
				<Navbar />
				<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
					{children}
				</main>
				<footer className="w-full flex items-center justify-center py-3">
					<Link
						isExternal
						className="flex items-center gap-1 text-current"
						href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
						title="nextui.org homepage"
					>
						<span className="text-default-600">Powered by</span>
						<p className="text-primary">NextUI</p>
					</Link>
				</footer>
			</div>
		</Providers>
		</body>
		</html>
	);
}