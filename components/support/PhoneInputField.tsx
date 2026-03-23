"use client";

import { ChevronDown } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  countryCode?: string;
  countryFlag?: string;
}

export default function PhoneInputField({
  value,
  onChange,
  countryCode = "+880",
  countryFlag = "🇧🇩",
}: PhoneInputFieldProps) {
  return (
    <div className="border border-[#d9d9d9] flex items-center px-4 py-5 rounded-[12px] w-full">
      <div className="flex flex-1 items-center">
        <button className="flex gap-1 items-center shrink-0">
          <span className="text-[20px] leading-none">{countryFlag}</span>
          <span style={fontSwitzer} className="text-[16px] text-[#5e5757] leading-normal ml-2">{countryCode}</span>
          <ChevronDown size={16} className="text-[#5e5757]" />
        </button>
        <div className="w-px h-8 bg-[#d9d9d9] mx-3 shrink-0" />
        <div className="flex flex-col gap-[6px] flex-1">
          <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
            PHONE NUMBER
          </p>
          <input
            type="tel"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your phone number"
            style={fontSwitzer}
            className="text-[16px] text-[#a09898] tracking-[0.16px] leading-[21px] bg-transparent outline-none w-full placeholder:text-[#a09898]"
          />
        </div>
      </div>
    </div>
  );
}
