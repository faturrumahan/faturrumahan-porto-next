import { sendEmail } from "@/services/sendEmail";
import { useMutation } from "@tanstack/react-query";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      // Handle success (e.g., show a success message)
      return true;
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Error sending email:", error);
      return false;
    },
  });
};
