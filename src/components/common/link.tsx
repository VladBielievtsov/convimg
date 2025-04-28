import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { buttonVariants } from "./button";


export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof buttonVariants> { }

export const Link = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);


Link.displayName = "Anchor";
