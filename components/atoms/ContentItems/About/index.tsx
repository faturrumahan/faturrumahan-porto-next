import { Card } from "@/components/ui/card";
import { experienceItems, skillItems, todoItems } from "@/lib/data";
import Image from "next/image";
import React from "react";
import ExperienceLists from "../../ExperienceLists";
import SkillLists from "../../SkillLists";

const About = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-9 text-lg">
      <section
        id="about-me"
        className="max-lg:hidden pr-36 text-justify flex flex-col gap-2"
      >
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
      <section id="about-me" className="text-center text-sm lg:hidden">
        <p>
          I am a recent Informatics graduate aiming to advance my career as a
          front-end web developer. I have built several personal portfolio
          projects using various programming languages. I enjoy learning new
          technologies and working both in teams and independently. Currently,
          I&apos;m a front-end developer at Berijalan, and I&apos;ve also
          learned React Native, Next.js, Laravel, and NestJS.
        </p>
      </section>
      <section id="todo" className="flex flex-col gap-3">
        <h3 className="font-bold text-xl lg:text-2xl max-lg:text-center">
          What usually I do for living
        </h3>
        <div className="grid lg:grid-cols-3 grid-rows gap-3">
          {todoItems.map((item, index) => (
            <Card key={index + item.title} className="p-6">
              <div className="flex gap-7 items-center">
                <Image
                  src={item.image}
                  alt={item.title + "logo"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-10 lg:w-16 h-fit"
                />
                <div>
                  <h5 className="max-lg:text-sm font-bold">{item.title}</h5>
                  <p className="text-sm max-lg:hidden">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <div className="lg:grid lg:grid-cols-2 gap-5 max-lg:hidden">
        <section id="experience">
          <ExperienceLists />
        </section>
        <section id="skill">
          <SkillLists />
        </section>
      </div>
    </div>
  );
};

export default About;
