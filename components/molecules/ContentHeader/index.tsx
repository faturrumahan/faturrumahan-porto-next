"use client";
import React, { useState } from "react";

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
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);

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
        <ul className="flex md:gap-10 text-lg max-md:justify-between justify-center">
          {menu.map((item, index) => (
            <li
              className={`hover:cursor-pointer ${
                item.name == "Resume" && "lg:hidden"
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
