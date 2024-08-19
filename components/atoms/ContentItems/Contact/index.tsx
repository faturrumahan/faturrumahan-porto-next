import Images from "@/assets/Images";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-10 lg:mt-16">
      <Image
        src={Images.CONSTRUCTION}
        alt="construction"
        width={0}
        height={0}
        sizes="100vw"
        className="w-1/2 h-fit"
      />
      <p className="max-lg:text-center lg:text-2xl">
        This page is not done yet. Please comeback again later
      </p>
    </div>
  );
};

export default Contact;
