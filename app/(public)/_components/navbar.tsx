"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowBigLeftDash, LogInIcon } from "lucide-react";
export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className="w-[32px] absolute top-8 left-8 z-50">
      {!isAuthenticated ? (
        <SignInButton
          mode="modal"
          afterSignInUrl="/documents"
          afterSignUpUrl="/documents"
        >
          <Button size="sm">
            <LogInIcon />
          </Button>
        </SignInButton>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            router.back();
          }}
        >
          {" "}
          <ArrowBigLeftDash />
        </Button>
      )}
    </nav>
  );
};
