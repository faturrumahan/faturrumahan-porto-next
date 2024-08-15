"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const DetailProjectBar = ({ data }: { data: any }) => {
  const images = data.image_path.split(",");
  const tags = data.tag.split(",");

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const selectImageHandler = (image: string) => (event: any) => {
    setSelectedImage(image);
  };
  return (
    <div className="bg-stone-100 rounded-lg flex-1 shadow-md overflow-y-auto ">
      <div className="px-7 py-10 flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-3xl">{data.title}</h1>
          <Link href={data.url_path} target="_blank">
            <FaExternalLinkAlt className="text-blue-600" size={25} />
          </Link>
        </div>
        <section id="images">
          <Image
            src={selectedImage}
            alt={data.title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-fit rounded mb-2"
          />
          <div className="flex justify-center gap-3">
            {images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={data.title + " image " + (index + 1)}
                width={0}
                height={0}
                sizes="100vw"
                className="w-28 h-fit rounded cursor-pointer transition duration-500 hover:translate-y-2"
                onClick={selectImageHandler(image)}
              />
            ))}
          </div>
        </section>
        <div className="flex gap-2">
          {tags.map((tag: string) => (
            <p key={tag} className="py-2 px-3 bg-stone-200 rounded text-sm">
              {tag}
            </p>
          ))}
        </div>
        <p className="text-lg w-3/4">{data.description}</p>
      </div>
    </div>
  );
};

export default DetailProjectBar;
