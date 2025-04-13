
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const spinnerVariants = cva(
  "animate-spin rounded-full border-t-2 border-b-2 border-edu-primary", 
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        md: "h-12 w-12",
        lg: "h-16 w-16"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const LoadingSpinner = ({ size, text = "Loading...", className }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex justify-center items-center h-48", className)}>
      <div className="flex flex-col items-center">
        <div className={spinnerVariants({ size })}></div>
        <p className="mt-4 text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
