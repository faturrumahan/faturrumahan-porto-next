import React from "react";

const ContactItem = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex flex-wrap gap-3 items-center">{children}</div>;
};

export default ContactItem;
