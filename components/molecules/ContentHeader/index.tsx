"use client";
import React, { useEffect, useState } from "react";

interface IMenuItem {
  name: string;
  contentTitle: string;
}

interface IContentHeaderProps {
  selectedContent: (contentName: string) => void;
}

const menu: IMenuItem[] = [
  {
    name: "About",
    contentTitle: "About Me",
  },
  {
    name: "Resume",
    contentTitle: "My Resume",
  },
  {
    name: "Works",
    contentTitle: "My Recent Works",
  },
  {
    name: "Contact",
    contentTitle: "Where you can find Me",
  },
];

const ContentHeader: React.FC<IContentHeaderProps> = ({ selectedContent }) => {
  const [selectedMenu, setSelectedMenu] = useState<IMenuItem>(() => {
    if (typeof window !== "undefined") {
      const savedMenu = sessionStorage.getItem("selectedMenu");
      return savedMenu ? JSON.parse(savedMenu) : menu[0];
    }
  });

  useEffect(() => {
    sessionStorage.setItem("selectedMenu", JSON.stringify(selectedMenu));
  }, [selectedMenu]);

  const menuHandler = (item: IMenuItem) => {
    setSelectedMenu(item);
    selectedContent(item.name);
  };

  return (
    <div className="flex max-lg:flex-wrap-reverse w-full justify-center lg:justify-between lg:items-end">
      <h1 className="font-bold text-3xl lg:ml-7 max-lg:mt-5">
        {selectedMenu.contentTitle}
      </h1>
      <div className="max-lg:w-full p-5 lg:px-10 lg:py-5 lg:rounded-bl-lg lg:rounded-tr bg-stone-300">
        <ul className="flex md:gap-10 text-lg max-md:justify-between justify-center max-md:px-5">
          {menu.map((item, index) => (
            <li
              className={`hover:cursor-pointer max-md:text-sm ${
                item.name == "Resume" && "lg:hidden"
              } ${
                item.name === selectedMenu.name &&
                "font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
              }`}
              key={index}
              onClick={() => menuHandler(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentHeader;
