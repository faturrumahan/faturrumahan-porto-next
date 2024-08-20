import { skillItems } from "@/lib/data";
import Image from "next/image";
import React from "react";

const SkillLists = () => {
  return (
    <>
      <h3 className="font-bold text-lg lg:text-2xl lg:mb-3">Skills Set</h3>
      <div className="flex flex-col gap-5">
        {skillItems.map((item, index) => (
          <div key={index} className="flex gap-5 items-center">
            <Image
              src={item.image}
              alt={item.title + "logo"}
              width={0}
              height={0}
              sizes="100vw"
              className="w-fit h-10"
            />
            <div className="w-full">
              <h5 className="lg:text-lg font-semibold">{item.title}</h5>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-3 rounded-full text-white"
                  style={{ width: item.level }}
                >
                  <p className="flex items-center text-xs leading-none justify-center">
                    {item.level}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <p className="text-xs md:text-sm text-gray-500 max-lg:text-center">
          Disclaimer: The confidence levels indicated here reflect my
          proficiency in various programming languages. You are welcome to
          assess my skill level based on my recent work and projects.
        </p>
      </div>
    </>
  );
};

export default SkillLists;
