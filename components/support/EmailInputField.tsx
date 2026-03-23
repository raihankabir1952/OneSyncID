"use client";

import { fontSwitzer } from "@/lib/styles";

interface EmailInputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailInputField({ value, onChange }: EmailInputFieldProps) {
  return (
    <div className="border border-[#d9d9d9] flex items-center px-4 py-5 rounded-[12px] w-full">
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
          className="text-[16px] text-[#a09898] tracking-[0.16px] leading-[21px] bg-transparent outline-none w-full placeholder:text-[#a09898]"
        />
      </div>
    </div>
  );
}
