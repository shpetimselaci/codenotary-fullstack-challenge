import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/cn";

const inputVariants = cva("", {
  variants: {
    variant: {
      default:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full disabled:opacity-50 rounded-md",
    },
    inputSize: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "default",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <div>
        <input
          className={cn(inputVariants({ variant, inputSize, className }))}
          ref={ref}
          {...props}
        />
        <span className="text-[0.6rem] block overflow-clip text-ellipsis text-red-400">
          {props.error || ""}
        </span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input as Input };
