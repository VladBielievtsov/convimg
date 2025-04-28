import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const buttonVariants = cva(
  "text-sm cursor-pointer rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:opacity-50 disabled:disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/80 dark:disabled:bg-secondary/80 dark:disabled:text-foreground/80",
        ghost: "hover:bg-secondary"
      },
      size: {
        default: "h-9 px-4 py-2",
        icon: "w-10 h-10 inline-flex items-center justify-center"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);


Button.displayName = "Button";
