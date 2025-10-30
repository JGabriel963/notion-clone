"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function DocumentsPage() {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="Empty"
        className="select-none"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos; Jotion
      </h2>
      <Button className="cursor-pointer">
        <PlusCircle className="size-4" />
        Create a notte
      </Button>
    </div>
  );
}
