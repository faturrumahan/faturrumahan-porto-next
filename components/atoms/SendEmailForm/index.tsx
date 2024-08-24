"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PacmanLoader } from "react-spinners";
import { useSendEmail } from "@/utils/hooks/useSendEmail";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message maximum is 500 characters long"),
});

const SendEmailForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: sendEmail, isError, isSuccess } = useSendEmail();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Call sendEmail and handle success or error within callbacks
    sendEmail(values, {
      onSuccess: () => {
        setIsSubmitting(false);
        setIsAlertOpen(true);
        setAlertMessage("Your form has been submitted");
        form.reset();
      },
      onError: (error) => {
        setIsSubmitting(false);
        setIsAlertOpen(true);
        setAlertMessage("Something went wrong, please try again later");
        console.error("Error sending email:", error);
      },
    });
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2 lg:space-y-5"
        >
          <div className="flex gap-3">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="john" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="type a message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <PacmanLoader size={10} /> : "Submit"}
          </Button>
        </form>
      </Form>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <div className="hidden" />
        </AlertDialogTrigger>
        <AlertDialogContent className="fixed z-50 flex items-center justify-center bg-black bg-opacity-50 p-0 w-fit h-fit border-none">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="hidden">hidden</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                {alertMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogAction className="btn btn-danger">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SendEmailForm;
