import React from "react";

export default function Select({
  label,
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-slate-700">{label}</label>

      <select
        {...props}
        className={`w-full appearance-none rounded-lg border border-slate-200 bg-white/80 px-3.5 py-2 text-sm text-dark shadow-sm backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
      >
        {children}
      </select>
    </div>
  );
}
