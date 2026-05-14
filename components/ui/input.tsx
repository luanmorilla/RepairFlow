import * as React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className = "",

      type = "text",

      error = false,

      leftIcon,

      rightIcon,

      disabled,

      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              z-10
              -translate-y-1/2
              text-zinc-500
            "
          >
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`
            h-14
            w-full
            rounded-2xl

            border

            bg-black/30
            backdrop-blur-xl

            px-5

            text-base
            text-white

            shadow-[0_4px_20px_rgba(0,0,0,0.25)]

            transition-all
            duration-300

            placeholder:text-zinc-500

            hover:border-white/15

            focus:border-blue-500/50
            focus:bg-black/40
            focus:ring-4
            focus:ring-blue-500/10

            disabled:cursor-not-allowed
            disabled:opacity-50

            ${
              leftIcon
                ? "pl-12"
                : ""
            }

            ${
              rightIcon
                ? "pr-12"
                : ""
            }

            ${
              error
                ? `
                  border-red-500/40
                  focus:border-red-500/50
                  focus:ring-red-500/10
                `
                : `
                  border-white/10
                `
            }

            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div
            className="
              absolute
              right-4
              top-1/2
              z-10
              -translate-y-1/2
              text-zinc-500
            "
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";