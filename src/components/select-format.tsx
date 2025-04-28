"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./common/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FORMATS } from "@/lib/constants";

export default function SelectFormat({ format, setFormat }: { format: string, setFormat: Dispatch<SetStateAction<string>> }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} className="flex items-center gap-2"><span>to {format}</span><ChevronDown size={16} /></Button>
      <ul className={cn(
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-80 pointer-events-none select-none",
        `transform origin-top transition-all duration-75 absolute bg-background border border-secondary rounded-md top-[calc(100%+0.5rem)] p-1`
      )}>
        {FORMATS.map((f) => (
          <li
            key={f}
            className={cn(`w-40 hover:bg-secondary rounded-sm px-2 py-1.5 text-sm cursor-pointer`)}
            onClick={() => {
              setFormat(f);
              setIsOpen(false);
            }}
          >{f}</li>
        ))}
      </ul>
    </div>
  )
}

