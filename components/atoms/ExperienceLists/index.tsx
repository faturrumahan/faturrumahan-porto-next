import { experienceItems } from "@/lib/data";
import React from "react";

const ExperienceLists = () => {
  return (
    <>
      <h3 className="font-bold text-2xl mb-3">Experiences</h3>
      <ol className="relative border-s border-gray-300">
        {experienceItems.toReversed().map((item, index) => (
          <li key={index + item.title} className="ms-4">
            <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -start-1.5 border"></div>
            <p className="mb-1 text-sm font-normal leading-none text-gray-400">
              {item.date.start + " - " + (item.date.end || "Now")}
            </p>
            <h3 className="text-lg font-semibold">
              {item.title} at {item.company}{" "}
              <span className="text-gray-500 text-sm"> - {item.status}</span>
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
};

export default ExperienceLists;
