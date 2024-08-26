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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
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
        <div className="text-white">
          Welcome, {auth.user && auth.user.username}
        </div>
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Content</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid p-4 w-[200px] gap-4">
                  {components.map((component) => (
                    // <ListItem
                    //   key={component.title}
                    //   title={component.title}
                    //   href={component.href}
                    // >
                    //   {component.description}
                    // </ListItem>
                    <div key={component.title}>{component.title}</div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="hover:cursor-pointer" onClick={logoutHandler}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Logout
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
