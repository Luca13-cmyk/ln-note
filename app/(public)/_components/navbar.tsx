"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

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
          <Button size="sm">Get LN NOTE free</Button>
        </SignInButton>
      ) : (
        <Button
          size="sm"
          onClick={() => {
            router.push("/documents");
          }}
        >
          {" "}
          Go to your documents
        </Button>
      )}
    </nav>
  );
};
