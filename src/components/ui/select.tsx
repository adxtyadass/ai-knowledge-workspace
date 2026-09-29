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
    <div className="flex flex-col gap-1">
      <label className="text-base font-medium leading-6">{label}</label>

      <select
        {...props}
        className={`border border-gray-200 rounded-lg px-4 py-2 ${className}`}
      >
        {children}
      </select>
    </div>
  );
}
