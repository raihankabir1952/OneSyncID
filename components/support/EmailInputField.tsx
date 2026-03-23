"use client";

import { AlertCircle } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

interface EmailInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function EmailInputField({
  value,
  onChange,
  error,
}: EmailInputFieldProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className={`border flex items-center px-4 py-5 rounded-[12px] w-full ${
        error ? "border-red-400" : "border-[#d9d9d9]"
      }`}>
        <div className="flex flex-col gap-[6px] flex-1">
          <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
            EMAIL ADDRESS
          </p>
          <input
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your email address"
            style={fontSwitzer}
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
            className="text-[16px] text-[#a09898] tracking-[0.16px] leading-[21px] bg-transparent outline-none w-full placeholder:text-[#a09898]"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div id="email-error" className="flex items-center gap-1">
          <AlertCircle size={12} className="text-red-500 shrink-0" />
          <p style={fontSwitzer} className="text-[12px] text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
