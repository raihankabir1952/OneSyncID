"use client";

import { useState } from "react";
import { Mail, ChevronDown } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import { fontSwitzer } from "@/lib/styles";

type Props = {
  email: string;
  phoneNumber: string;
  phoneCode: string;
  countryCode: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
};

function FlagIcon({ countryCode, className }: { countryCode: string; className?: string }) {
  const Flag = Flags[countryCode as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className={className} />;
}

function validateEmail(email: string): string {
  if (!email.trim()) return "Email address is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
  const domain = email.split("@")[1];
  if (!domain.includes(".")) return "Please enter a valid email domain";
  return "";
}

function validatePhone(phone: string): string {
  if (!phone.trim()) return "Phone number is required";
  if (!/^\d+$/.test(phone)) return "Phone number can only contain digits";
  if (phone.length < 10) return "Phone number must be at least 10 digits";
  if (phone.length > 15) return "Phone number cannot exceed 15 digits";
  return "";
}

export default function ContactSection({
  email,
  phoneNumber,
  phoneCode,
  countryCode,
  onEmailChange,
  onPhoneChange,
}: Props) {
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const emailError = emailTouched ? validateEmail(email) : "";
  const phoneError = phoneTouched ? validatePhone(phoneNumber) : "";
  const emailValid = email && !validateEmail(email);
  const phoneValid = phoneNumber && !validatePhone(phoneNumber);

  return (
    // ✅ label নেই — PersonalFormPage এ আছে
    <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">

      {/* Email */}
      <div className="flex items-start gap-2 px-4 py-5 border-b border-[#d9d9d9]">
        <Mail
          size={20}
          className={`mt-1 shrink-0 ${emailValid ? "text-[#11a75c]" : "text-[#5e5757]"}`}
        />
        <div className="flex flex-col gap-1 flex-1">
          <label
            style={fontSwitzer}
            className={`text-[16px] font-medium tracking-[0.16px] ${
              emailValid ? "text-[#11a75c]" : "text-[#5e5757]"
            }`}
          >
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            style={fontSwitzer}
            className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none w-full"
          />
          {emailError && (
            <p style={fontSwitzer} className="text-[12px] text-[#ff3838] mt-1">
              {emailError}
            </p>
          )}
          {emailValid && (
            <p style={fontSwitzer} className="text-[12px] text-[#11a75c] mt-1">
              ✓ Valid email address
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex items-center gap-2 shrink-0">
          <FlagIcon countryCode={countryCode} className="w-[30px] h-[20px] border border-[#eee]" />
          <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">{phoneCode}</span>
          <ChevronDown size={16} className="text-[#5e5757]" />
        </div>
        <div className="w-px h-10 bg-[#d9d9d9]" />
        <div className="flex flex-col gap-1 flex-1">
          <label
            style={fontSwitzer}
            className={`text-[16px] font-medium tracking-[0.16px] ${
              phoneValid ? "text-[#11a75c]" : "text-[#5e5757]"
            }`}
          >
            PHONE NUMBER
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              onPhoneChange(val);
            }}
            onBlur={() => setPhoneTouched(true)}
            style={fontSwitzer}
            className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none w-full"
          />
          {phoneError && (
            <p style={fontSwitzer} className="text-[12px] text-[#ff3838] mt-1">
              {phoneError}
            </p>
          )}
          {phoneValid && (
            <p style={fontSwitzer} className="text-[12px] text-[#11a75c] mt-1">
              ✓ Valid phone number
            </p>
          )}
        </div>
      </div>
    </div>
  );
}