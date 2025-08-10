import React from "react";
import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "dark" | "light" | "transparent" | "gradient" | "image" | "footer";
  paddingY?: "none" | "sm" | "md" | "lg" | "xl"; // Optional
  maxWidth?: string;
  image?: string;
  className?: string;
}

export default function Section({
  children,
  variant = "default",
  paddingY, // now optional
  maxWidth = "max-w-[1420px]",
  image,
  className
}: SectionProps) {
  
  const variantStyles = {
    default: "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
    transparent: "bg-transparent",
    gradient: "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50",
    footer : "bg-muted/50 border-t",
    image: image
      ? `bg-cover bg-center text-white`
      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  };

  const paddingStyles = {
    none: "",
    sm: "py-4",
    md: "py-8",
    lg: "py-12",
    xl: "py-20"
  };

  return (
    <section
      className={clsx(
        "relative w-full",
        variantStyles[variant],
    
      )}
      style={variant === "image" && image ? { backgroundImage: `url(${image})` } : {}}
    >
      <div className={clsx(maxWidth, className,paddingY ? paddingStyles[paddingY] : "", "mx-auto px-4 md:px-10 lg:px-16 xl:px-0")}>
        {children}
      </div>
    </section>
  );
}



// use case 
// // Example 1: Default (white background, default padding)
// <Section>
//   <h2>Default Section</h2>
//   <p>This section uses default background and padding.</p>
// </Section>

// // Example 2: Custom background color and vertical padding
// <Section color="bg-gray-100" paddingY="py-16">
//   <h2>Gray Section</h2>
//   <p>This section has a gray background and more vertical padding.</p>
// </Section>

// // Example 3: With background image
// <Section image="/images/bg-pattern.png" color="bg-black/70" paddingY="py-20">
//   <h2>Image Section</h2>
//   <p>This section has a background image and custom color overlay.</p>
// </Section>