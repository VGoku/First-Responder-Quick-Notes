type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "success" | "danger" | "ghost";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  const base =
    "min-h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm transition-all duration-200";

  const variants: Record<string, string> = {
    primary: "bg-brand-600 text-white hover:bg-brand-500",
    success: "bg-success text-white hover:bg-success-light",
    danger: "bg-danger text-white hover:bg-danger-light",
    ghost:
      "bg-transparent text-white/90 hover:bg-white/10 border border-white/10",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}