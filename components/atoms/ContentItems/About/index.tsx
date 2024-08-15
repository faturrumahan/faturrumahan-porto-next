import { Card } from "@/components/ui/card";
import { experienceItems, skillItems, todoItems } from "@/lib/data";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col gap-9 text-lg">
      <section id="about-me" className="pr-36 text-justify flex flex-col gap-2">
        <p>
          I am a recent graduate with a degree in Informatics, committed to
          building a successful career as a front-end web developer. Throughout
          my academic journey, I have developed a strong foundation in various
          programming languages and technologies, which I have leveraged to
          create several personal portfolio projects. My enthusiasm for learning
          new technologies drives me to stay current with industry trends and
          continuously refine my skills.
        </p>
        <p>
          Currently, I am enhancing my expertise as a front-end developer at
          Berijalan, where I am involved in a range of projects that challenge
          and expand my capabilities. In addition to my practical experience, I
          have acquired knowledge in React Native, Next.js, Laravel, and NestJS,
          which have broadened my skill set in both web and mobile development.
        </p>
        <p>
          Beyond front-end development, I have also explored other areas of
          technology. For my thesis, I delved into machine learning, developing
          a recommendation system using Python and various libraries. This
          experience has enriched my understanding of data-driven solutions and
          their application in real-world scenarios.
        </p>
        <p>
          I excel in both collaborative team environments and independent work,
          always striving to deliver high-quality results. My diverse technical
          background and commitment to learning make me well-equipped to tackle
          complex challenges and contribute effectively to innovative projects.
        </p>
      </section>
      <section id="todo" className="flex flex-col gap-3">
        <h3 className="font-bold text-2xl">What usually I do for living</h3>
        <div className="grid grid-cols-3 gap-3">
          {todoItems.map((item, index) => (
            <Card
              key={index + item.title}
              className="p-6 bg-opacity-60 backdrop-filter backdrop-blur-lg"
            >
              <div className="flex gap-7">
                <Image
                  src={item.image}
                  alt={item.title + "logo"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-16 h-fit"
                />
                <div>
                  <h5 className="font-bold">{item.title}</h5>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-2 gap-5">
        <section id="experience">
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
                  <span className="text-gray-500 text-sm">
                    {" "}
                    - {item.status}
                  </span>
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section id="skill">
          <h3 className="font-bold text-2xl mb-3">Skills Set</h3>
          <div className="flex flex-col gap-5">
            {skillItems.map((item, index) => (
              <div key={index} className="flex gap-5">
                <Image
                  src={item.image}
                  alt={item.title + "logo"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-fit h-10"
                />
                <div className="w-full">
                  <h5 className="text-lg font-semibold">{item.title}</h5>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: item.level }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-sm text-gray-500">
              Disclaimer: The confidence levels indicated here reflect my
              proficiency in various programming languages. You are welcome to
              assess my skill level based on my recent work and projects.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
