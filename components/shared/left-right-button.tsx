import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"; // utility to merge class names

interface ButtonProps {
  onClick: () => void;
  className?: string;
}

export const LeftButton = ({
  onClick,
  className,
}: ButtonProps) => (
  <Button
    variant="slider"
    size="icon"
    className={cn("rounded-sm w-10 h-10", className)}
    onClick={onClick}
  >
    <ChevronLeft className="h-6 w-6" />
  </Button>
);

export const RightButton = ({
  onClick,
  className,
}: ButtonProps) => (
  <Button
    variant="slider"
    size="icon"
    className={cn("rounded-sm w-10 h-10", className)}
    onClick={onClick}
  >
    <ChevronRight className="h-6 w-6" />
  </Button>
);
