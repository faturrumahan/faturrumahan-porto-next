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
    title: "Student intern",
    status: "Internship",
    date: [
      {
        start: "August 2022",
        end: "September 2022",
      },
    ],
    description: "",
  },
  {
    title: "Front-end developer",
    status: "Internship",
    date: [
      {
        start: "February 2024",
        end: "June 2024",
      },
    ],
    description: "",
  },
  {
    title: "Front-end developer",
    status: "Freelance",
    date: [
      {
        start: "June 2024",
        end: "July 2024",
      },
    ],
    description: "",
  },
  {
    title: "Front-end developer",
    status: "Contract",
    date: [
      {
        start: "July 2024",
        end: "",
      },
    ],
    description: "",
  },
];

export const skillItems = [
  {
    title: "Next Js",
    level: 86,
    image: "",
  },
  {
    title: "React Native",
    level: 80,
    image: "",
  },
  {
    title: "Nest Js",
    level: 30,
    image: "",
  },
  {
    title: "Laravel",
    level: 50,
    image: "",
  },
];
