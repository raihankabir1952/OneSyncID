"use client";

import { useRef } from "react";
import { fontSwitzer } from "@/lib/styles";
  

type OtpStatus = "entering" | "success" | "error";

type Props = {
  digits: string[];
  status: OtpStatus;
  onChange: (digits: string[]) => void;
};

export default function OtpInput({ digits = ["", "", "", "", "", ""], status, onChange }: Props) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getBorderColor = () => {
    if (status === "success") return "border-[#11a75c]";
    if (status === "error") return "border-[#ff3838]";
    return "border-[#d9d9d9]";
  };

  const getActiveBorderColor = () => {
    if (status === "success") return "border-[#11a75c]";
    if (status === "error") return "border-[#ff3838]";
    return "border-[#025fc9]";
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    onChange(newDigits);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newDigits = [...digits];
    pastedData.split("").forEach((char, i) => { newDigits[i] = char; });
    onChange(newDigits);
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex gap-[10px] items-center w-full">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="tel"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          style={fontSwitzer}
          className={`flex-1 min-w-0 h-[50px] border-2 rounded-xl text-center text-[18px] font-semibold text-black outline-none transition-colors
            ${digit ? getActiveBorderColor() : getBorderColor()}
          `}
        />
      ))}
    </div>
  );
}