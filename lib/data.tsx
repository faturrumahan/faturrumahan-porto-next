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
