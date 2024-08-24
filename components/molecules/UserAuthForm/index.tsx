"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import loginApi from "@/utils/api/loginApi";
import { setCookie } from "@/utils/Helpers/cookies";
import { useRouter } from "next/navigation";
import { encryptAES } from "@/utils/Helpers/CryptoJS";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export function UserAuthForm({ type, className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(authData: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");
    authData.password = encryptAES(authData.password);
    console.log(authData.password);

    try {
      const response = await loginApi(authData);
      setCookie("authToken_faturrumahan", response.token, { expires: 7 });
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Password</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {type === "Register" && (
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="repassword">
                  Re-type Password
                </Label>
                <Input
                  id="repassword"
                  placeholder="Re-type Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
            )}
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {type === "Login" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
