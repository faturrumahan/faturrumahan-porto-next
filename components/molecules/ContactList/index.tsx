import ContactItem from "@/components/atoms/ContactItem";
import { contactItems } from "@/lib/data";
import React from "react";

const ContactList = () => {
  return (
    <div className="flex flex-col gap-5 w-full max-lg:hidden">
      {contactItems.map((item, index) => (
        <ContactItem key={index}>
          {item.icon}
          {item.content}
        </ContactItem>
      ))}
    </div>
  );
};

export default ContactList;
