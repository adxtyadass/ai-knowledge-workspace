import React from "react";

export default function Input({
  label,
  className = "",
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-medium leading-6">{label}</label>

      {type === "texarea" ? (
        <textarea
          className={`border border-gray-200 rounded-lg px-4 py-2 ${className}`}
        />
      ) : (
        <input
          {...props}
          className={`border border-gray-200 rounded-lg px-4 py-2 ${className}`}
        />
      )}
    </div>
  );
}
