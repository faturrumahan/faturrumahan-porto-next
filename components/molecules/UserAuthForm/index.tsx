"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

export function UserAuthForm({ type, className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
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
    </div>
  );
}
