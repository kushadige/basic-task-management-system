import * as React from "react";

import { cn } from "@/lib/tw";

const buttonVariants = {
  color: {
    primary: "text-primary-text bg-primary-background hover:bg-primary-hover",
    secondary:
      "text-secondary-text bg-secondary-background hover:bg-secondary-hover",
    tertiary:
      "text-tertiary-text bg-tertiary-background hover:bg-tertiary-hover",
    accent: "text-accent-text bg-accent-background hover:bg-accent-hover",
    danger: "text-danger-text bg-danger-background hover:bg-danger-hover",
    warning: "text-warning-text bg-warning-background hover:bg-warning-hover",
    success: "text-success-text bg-success-background hover:bg-success-hover",
  },
  size: {
    default: "px-4 py-2 rounded-md text-sm font-medium",
    sm: "px-3 py-1.5 rounded-md text-sm font-medium",
    lg: "px-5 py-3 rounded-md text-lg font-medium",
  },
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: keyof typeof buttonVariants.color;
  size?: keyof typeof buttonVariants.size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg",
          buttonVariants.color[color],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
