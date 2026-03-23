"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { fontSwitzer } from "@/lib/styles";

interface SupportOtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  onComplete: (code: string) => void;
  hasError?: boolean;
  isVerified?: boolean;
}

export default function SupportOtpInput({
  value,
  onChange,
  onComplete,
  hasError = false,
  isVerified = false,
}: SupportOtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...value];
    newOtp[index] = val;
    onChange(newOtp);
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Fire onComplete with fresh array — no async state issue
    if (val && newOtp.every((d) => d !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = Array(6).fill("");
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    onChange(newOtp);
    const focusIdx = newOtp.findIndex((v: string) => !v);
    inputRefs.current[focusIdx === -1 ? 5 : focusIdx]?.focus();
    if (newOtp.every((d: string) => d !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const getBorder = (i: number) => {
    if (isVerified) return "border-2 border-[#11a75c]";
    if (hasError) return "border-2 border-red-500";
    if (value[i]) return "border-2 border-[#025fc9]";
    return "border-[1.5px] border-[#d9d9d9]";
  };

  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="flex gap-[8px] w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={isVerified}
            style={fontSwitzer}
            className={`w-[46px] h-[50px] shrink-0 rounded-[12px] text-center text-[18px] font-semibold bg-white outline-none transition-all
              ${hasError ? "text-red-500" : "text-black"}
              ${getBorder(i)}
              ${!isVerified ? "focus:border-2 focus:border-[#025fc9]" : ""}
            `}
          />
        ))}
      </div>
      {isVerified && (
        <p style={fontSwitzer} className="text-[14px] font-medium text-[#11a75c] text-center">
          Phone number verified!
        </p>
      )}
      {hasError && (
        <p style={fontSwitzer} className="text-[13px] text-red-500 text-center">
          Invalid verification code. Please try again.
        </p>
      )}
    </div>
  );
}
