import Images from "@/assets/Images";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const contactItems = [
  {
    icon: <FaMapMarkedAlt size={30} />,
    content: <p>Yogyakarta, Indonesia</p>,
  },
  {
    icon: <IoIosMail size={30} />,
    content: <p>Fathurrohman.work@gmail.com</p>,
  },
  {
    icon: <FaLinkedin size={30} />,
    content: (
      <Link href="https://www.linkedin.com/in/fathurrohman07" target="_blank">
        in/fathurrohman07
      </Link>
    ),
  },
  {
    icon: <FaGithub size={30} />,
    content: (
      <Link href="https://github.com/faturrumahan" target="_blank">
        faturrumahan
      </Link>
    ),
  },
  {
    icon: <FaInstagram size={30} />,
    content: (
      <Link href="https://www.instagram.com/faturrumahan" target="_blank">
        faturrumahan
      </Link>
    ),
  },
];

export const todoItems = [
  {
    title: "Software Development",
    description:
      "Creating user-friendly and efficient front-end app with a bit of full-stack experience",
    image: Images.DEV_LOGO,
  },
  {
    title: "Digital Content Creation",
    description:
      "Bringing your ideas to life in a visually engaging way through photo and video",
    image: Images.CAM_LOGO,
  },
  {
    title: "Anything with money",
    description:
      "Just having some fun with this one—don't take it too seriously!",
    image: Images.MONEY_LOGO,
  },
];

export const experienceItems = [
  {
    title: "Staff Officer",
    status: "Internship",
    company: "Yogyakarta Cryptography Museum",
    date: {
      start: "August 2022",
      end: "September 2022",
    },

    description:
      "Developed a web-based application specifically designed to record museum visitor data. In addition to this, I regularly reported on the progress of the project through weekly updates and provided assistance to the museum's layout staff when needed",
  },
  {
    title: "Front-end developer",
    status: "Internship",
    company: "Berijalan",
    date: {
      start: "February 2024",
      end: "June 2024",
    },

    description:
      "Participated in training programs focused on React, DotNet, and Laravel. Additionally, I built and enhanced the Board Leader application using the Laravel framework. Furthermore, I developed new features for the Asset Audit application using the Next.js framework",
  },
  {
    title: "Front-end developer",
    status: "Freelance",
    company: "Berijalan",
    date: {
      start: "June 2024",
      end: "July 2024",
    },

    description:
      "Performed bug fixing and developed new features for the mobile application using the React Native framework",
  },
  {
    title: "Front-end developer",
    status: "Contract",
    company: "Berijalan",
    date: {
      start: "July 2024",
      end: null,
    },

    description:
      "Participated in advanced-level React training and studied NestJS. Additionally, I worked on enhancing and fixing bugs in some web application using the Laravel framework",
  },
];

export const skillItems = [
  {
    title: "Next Js",
    level: "87%",
    image: Images.NEXT_LOGO,
  },
  {
    title: "React Native",
    level: "81%",
    image: Images.REACT_LOGO,
  },
  {
    title: "Nest Js",
    level: "33%",
    image: Images.NEST_LOGO,
  },
  {
    title: "Laravel",
    level: "51%",
    image: Images.LARAVEL_LOGO,
  },
];
