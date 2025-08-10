"use client"
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
  {
    variants: {   
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-md",
          slider:
          " text-white  bg-black/30  hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md",
      
        glass:
          "text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm border border-white/20"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        glow: "shadow-[0_0_15px_rgba(255,255,255,0.5)]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
      shadow: "sm",
      animation: "none"
    },
  }
);

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

function Button({
  className,
  variant,
  size,
  rounded,
  shadow,
  animation,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) {

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, rounded, shadow, animation, className }),
        fullWidth && "w-full",
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
}

export { Button, buttonVariants };