import React from "react";
import SendEmailForm from "../../SendEmailForm";
import Maps from "../../Maps";

const Contact = () => {
  return (
    <div className="flex flex-col gap-10">
      <Maps />
      <SendEmailForm />
    </div>
  );
};

export default Contact;
