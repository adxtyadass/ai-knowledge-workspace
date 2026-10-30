import React from "react";

type InputProps = {
  label?: string;
  className?: string;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };

export default function Input({
  label,
  className = "",
  type = "text",
  ...props
}: InputProps) {
  const baseClasses =
    "w-full rounded-lg border border-slate-200 bg-white/80 px-3.5 py-2 text-sm text-dark shadow-sm backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-slate-700">{label}</label>

      {type === "textarea" ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${baseClasses} min-h-20 resize-none ${className}`}
        />
      ) : type === "checkbox" ? <input
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        type={'checkbox'}
        className={`${className}`}
      /> : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          type={type}
          className={`${baseClasses} ${className}`}
        />
      )}
    </div>
  );
}