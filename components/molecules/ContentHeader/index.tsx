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
    <div className="flex w-full justify-between items-end">
      <h1 className="font-bold text-3xl ml-7">{selectedMenu.contentTitle}</h1>
      <div className="px-10 py-5 rounded-bl-lg rounded-tr bg-stone-300">
        <ul className="flex gap-10 text-lg">
          {menu.map((item, index) => (
            <li
              className="hover:cursor-pointer"
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
