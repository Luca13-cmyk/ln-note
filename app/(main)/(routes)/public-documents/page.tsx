"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useOrigin } from "@/hooks/use-origin";
import { useQuery } from "convex/react";

import { useRouter } from "next/navigation";
import { formatRelative } from "date-fns";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const documents = useQuery(api.documents.getPublicDocuments);
  const origin = useOrigin();

  const router = useRouter();

  if (documents === undefined) {
    return (
      <>
        <div className="h-full  flex flex-col items-center justify-center space-y-12">
          <div className="space-y-2 w-2/3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-2/4" />
          </div>
          <div className="space-y-2 w-2/3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-2/4" />
          </div>
          <div className="space-y-2 w-2/3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-2/4" />
          </div>
        </div>
      </>
    );
  }
  if (documents === null) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/empty.png"
          height="300"
          width="300"
          alt="Error"
          className="dark:hidden"
        />
        <Image
          src="/empty-dark.png"
          height="300"
          width="300"
          alt="Error"
          className="hidden dark:block"
        />
        <h2 className="text-xl font-medium">Something went wrong!</h2>
        <Button asChild>
          <Link href="/documents">Go back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {documents.map((doc) => (
        <Card
          key={doc._id}
          onClick={() => router.push(`${origin}/preview/${doc._id}`)}
          className="cursor-pointer w-2/3 lg:hover:scale-110 lg:transition-all dark:bg-black/40 bg-gray-200"
        >
          <CardHeader>
            <CardTitle className="flex">
              {doc.icon && doc.icon} {doc.title}
            </CardTitle>
            <CardDescription className="self-end">
              {formatRelative(new Date(doc._creationTime), new Date())}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default page;
