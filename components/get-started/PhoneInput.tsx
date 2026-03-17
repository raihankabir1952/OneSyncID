"use client";

import { ChevronDown } from "lucide-react";
import { fontSwitzer, colors } from "@/lib/styles";
import * as Flags from "country-flag-icons/react/3x2";

type TabType = "phone" | "email";

type Props = {
  activeTab: TabType;
  phoneNumber: string;
  email: string;
  phoneCode: string;
  countryCode: string;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
};

function FlagIcon({ countryCode, className }: { countryCode: string; className?: string }) {
  const Flag = Flags[countryCode as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className={className} />;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function PhoneInput({
  activeTab,
  phoneNumber,
  email,
  phoneCode,
  countryCode,
  onPhoneChange,
  onEmailChange,
}: Props) {
  const emailTouched = email.length > 0;
  const emailValid = isValidEmail(email);

  if (activeTab === "phone") {
    return (
      <div className="border border-[#d9d9d9] rounded-xl px-4 py-5 flex items-center gap-3">
        {/* Country Code */}
        <div className="flex items-center gap-2 shrink-0">
          <FlagIcon countryCode={countryCode} className="w-[30px] h-[20px] border border-[#eee]" />
          <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">
            {phoneCode}
          </span>
          <ChevronDown size={16} color={colors.textMuted} />
        </div>
        {/* Divider */}
        <div className="w-px h-10 bg-[#d9d9d9]" />
        {/* Input */}
        <div className="flex flex-col gap-1 flex-1">
          <label style={fontSwitzer} className="text-[13px] font-medium text-[#5e5757] tracking-[0.16px]">
            PHONE NUMBER
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value)}
            style={fontSwitzer}
            className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-xl px-4 py-5 flex flex-col gap-1 ${
      emailTouched && !emailValid ? "border-red-400" : "border-[#d9d9d9]"
    }`}>
      <label style={fontSwitzer} className="text-[13px] font-medium text-[#5e5757] tracking-[0.16px]">
        EMAIL ADDRESS
      </label>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        style={fontSwitzer}
        className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none"
      />
      {emailTouched && !emailValid && (
        <p style={fontSwitzer} className="text-[12px] text-red-500 mt-1">
          Please enter a valid email address
        </p>
      )}
      {emailTouched && emailValid && (
        <p style={fontSwitzer} className="text-[12px] text-green-500 mt-1">
          ✓ Valid email
        </p>
      )}
    </div>
  );
}
