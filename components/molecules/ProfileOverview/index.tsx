/* eslint-disable react/no-unescaped-entities */
import Images from "@/assets/Images";
import Image from "next/image";
import React from "react";

const ProfileOverview = () => {
  return (
    <>
      <Image
        src={Images.AVATAR}
        alt="avatar"
        width="175"
        height="175"
        className="rounded-full"
      />
      <div className="text-center">
        <h1 className="font-bold text-3xl">Fathurrohman</h1>
        <h5 className="font-light text-md">( Faturrumahan )</h5>
      </div>
      <h2 className="rounded-md bg-stone-200 px-3 py-2 font-md shadow-sm">
        Front-end Developer
      </h2>
      <hr className="w-full h-[1.5px] bg-stone-200 rounded" />
      <p className="text-center">
        I am a recent Informatics graduate aiming to advance my career as a
        front-end web developer. I have built several personal portfolio
        projects using various programming languages. I enjoy learning new
        technologies and working both in teams and independently. Currently,
        I`&apos;`m a front-end developer at Berijalan, and I`&apos;`ve also
        learned React Native, Next.js, Laravel, and NestJS.
      </p>
    </>
  );
};

export default ProfileOverview;
