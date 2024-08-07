import AuthContainer from "@/components/organism/AuthContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

const AuthPage = () => {
  return <AuthContainer />;
};

export default AuthPage;
