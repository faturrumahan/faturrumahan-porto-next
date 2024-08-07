import Link from "next/link";
import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const ContactList = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-3 items-center">
        <FaMapMarkedAlt size={30} />
        <p>Yogyakarta, Indonesia</p>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <IoIosMail size={30} />
        <p>Fathurrohman.work@gmail.com</p>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <FaLinkedin size={30} />
        <Link href="https://www.linkedin.com/in/fathurrohman07" target="_blank">
          in/fathurrohman07
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <FaGithub size={30} />
        <Link href="https://github.com/faturrumahan" target="_blank">
          faturrumahan
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <FaInstagram size={30} />
        <Link href="https://www.instagram.com/faturrumahan" target="_blank">
          faturrumahan
        </Link>
      </div>
    </div>
  );
};

export default ContactList;
