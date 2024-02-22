'use client';
import React, { useEffect, useState } from "react";
import {
	Link,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
} from "@nextui-org/react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
	const { data: session } = useSession();
	const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
	const handleSignInWithGoogle = async () => {
		console.log("signing in with google");
		await signIn("google");
	};
	const handleSignOut = async () => {
		console.log("signing out");
		await signOut();
	};
	useEffect(() => {
		const fetchUserRole = async () => {
			if (session && session.user?.id) {
				const res = await fetch(`/api/users/${session.user.id}`);
				const data = await res.json();
				setIsAdmin(data.user?.role === "admin");
			}
		};
		fetchUserRole().then(r => console.log(r));
	}, [session]);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<Link href="/">
						<p className="font-bold text-inherit">AlertBees.</p>
					</Link>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map(item =>
						!isAdmin && item.label === "Visualiser" ? null : (
							<NavbarItem key={item.href}>
								<NextLink
									className={clsx(
										linkStyles({ color: "foreground" }),
										"data-[active=true]:text-primary data-[active=true]:font-medium"
									)}
									color="foreground"
									href={item.href}
								>
									{item.label}
								</NextLink>
							</NavbarItem>
						)
					)}
				</ul>
			</NavbarContent>


			<NavbarContent as="div" justify="end">
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<div className="flex items-center gap-2 cursor-pointer">
							{session ? (
								<p>Hello {session.user.given_name} 🌞</p>
							) : null}
							<Avatar
								isBordered={true}
								src={session?.user?.image}
								size="md"
								className="cursor-pointer"
							/>
						</div>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						{session ? (
							<DropdownItem key="logout" color="danger">
								<p onClick={() => signOut()}> Se déconnecter</p>
							</DropdownItem>
						) : (
							<DropdownItem key="login" color="success">
								<p onClick={()=> signIn("google")}> Se connecter</p>
							</DropdownItem>
						)}
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
