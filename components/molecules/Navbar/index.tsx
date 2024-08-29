"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { logout } from "@/storages/authSlice";
import { RootState } from "@/storages/store";
import { clearCookie } from "@/utils/Helpers/cookies";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";

const components: { title: string; href: string }[] = [
  {
    title: "Project",
    href: "/project",
  },
  {
    title: "Category",
    href: "/category",
  },
  {
    title: "Profile",
    href: "#",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    clearCookie("authToken_faturrumahan");
    location.reload();
  };

  return (
    <header>
      <nav className="w-full h-16 bg-neutral-700 flex items-center px-10 justify-between">
        <Link href="/" className="text-white">
          Welcome, {auth.user && auth.user.username}
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid p-4 w-[200px] gap-4">
                  {components.map((component) => (
                    <Link
                      href={"/dashboard" + component.href}
                      key={component.title}
                    >
                      {component.title}
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="hover:cursor-pointer" onClick={logoutHandler}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="flex gap-1.5 items-center">
                    <FaArrowCircleLeft />
                    Logout
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
};

export default Navbar;
