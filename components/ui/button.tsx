import * as React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "xl";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;

  size?: ButtonSize;

  fullWidth?: boolean;

  loading?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    `
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      text-white
      border
      border-blue-400/20
      shadow-[0_10px_35px_rgba(37,99,235,0.35)]
      hover:scale-[1.01]
      hover:brightness-110
      active:scale-[0.99]
    `,

  secondary:
    `
      bg-white/10
      text-white
      border
      border-white/10
      hover:bg-white/15
      hover:border-white/20
    `,

  outline:
    `
      bg-transparent
      text-white
      border
      border-white/15
      hover:bg-white/5
      hover:border-blue-500/30
    `,

  ghost:
    `
      bg-transparent
      text-zinc-300
      hover:bg-white/5
      hover:text-white
    `,

  danger:
    `
      bg-gradient-to-r
      from-red-600
      to-rose-500
      text-white
      border
      border-red-400/20
      hover:brightness-110
    `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm rounded-xl",

  md: "h-12 px-5 text-sm rounded-2xl",

  lg: "h-14 px-6 text-base rounded-2xl",

  xl: "h-16 px-8 text-lg rounded-[22px]",
};

export function Button({
  className = "",

  children,

  variant = "primary",

  size = "lg",

  fullWidth = false,

  loading = false,

  disabled,

  leftIcon,

  rightIcon,

  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        gap-3
        overflow-hidden
        font-semibold
        tracking-tight
        transition-all
        duration-300
        ease-out
        outline-none

        disabled:pointer-events-none
        disabled:opacity-60

        focus-visible:ring-2
        focus-visible:ring-blue-500/50

        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      <span
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          hover:opacity-100
          bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)]
        "
      />

      {loading && (
        <span
          className="
            h-5
            w-5
            animate-spin
            rounded-full
            border-2
            border-white/30
            border-t-white
          "
        />
      )}

      {!loading && leftIcon}

      <span className="relative z-10">
        {children}
      </span>

      {!loading && rightIcon}
    </button>
  );
}