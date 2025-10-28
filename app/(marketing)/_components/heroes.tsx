import Image from "next/image";
import React from "react";

export function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative size-[300px] sm:size-[350px] md:size-[400px]">
          <Image
            src="/cover_notion.png"
            fill
            className="object-contain"
            alt="Work Hard"
          />
        </div>
      </div>
    </div>
  );
}
