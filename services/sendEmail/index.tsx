import emailjs from "@emailjs/browser";

export const sendEmail = async (values: {
  name: string;
  email: string;
  message: string;
}) => {
  const result = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      user_name: values.name,
      user_email: values.email,
      message: values.message,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
  return result;
};
