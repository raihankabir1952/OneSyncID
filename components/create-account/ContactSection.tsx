"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const emailError = emailTouched && !emailFocused ? validateEmail(email) : "";
  const phoneError = phoneTouched && !phoneFocused ? validatePhone(phoneNumber) : "";
  const emailValid = email && !validateEmail(email);
  const phoneValid = phoneNumber && !validatePhone(phoneNumber);

  return (
    <div className="flex flex-col gap-[20px] w-full">

      {/* ── EMAIL ADDRESS ── */}
      <div className="flex flex-col gap-[10px]">
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
          EMAIL ADDRESS
        </p>
        <div
          className={`border-b py-[10px] cursor-text transition-colors ${
            emailFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => emailRef.current?.focus()}
        >
          <input
            ref={emailRef}
            type="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => onEmailChange(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => { setEmailFocused(false); setEmailTouched(true); }}
            style={fontSwitzer}
            className="w-full text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px]"
          />
        </div>
        {emailError && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838]">{emailError}</p>
        )}
        {emailValid && !emailFocused && (
          <p style={fontSwitzer} className="text-[12px] text-[#11a75c]">✓ Valid email address</p>
        )}
      </div>

      {/* ── PHONE NUMBER ── */}
      <div className="flex flex-col gap-[10px]">
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
          PHONE NUMBER
        </p>
        <div
          className={`border-b py-[10px] flex items-center gap-3 cursor-text transition-colors ${
            phoneFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => phoneRef.current?.focus()}
        >
          {/* Flag + code */}
          <div className="flex items-center gap-[8px] shrink-0" onClick={(e) => e.stopPropagation()}>
            <FlagIcon countryCode={countryCode} className="w-[30px] h-[20px] border border-[#eee]" />
            <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">{phoneCode}</span>
            <ChevronDown size={16} className="text-[#5e5757]" />
          </div>
          {/* Divider */}
          <div className="w-px h-[20px] bg-[#d9d9d9] shrink-0" />
          {/* Input */}
          <input
            ref={phoneRef}
            type="tel"
            value={phoneNumber}
            placeholder="1723456789"
            onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => { setPhoneFocused(false); setPhoneTouched(true); }}
            style={fontSwitzer}
            className="flex-1 text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px]"
          />
        </div>
        {phoneError && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838]">{phoneError}</p>
        )}
        {phoneValid && !phoneFocused && (
          <p style={fontSwitzer} className="text-[12px] text-[#11a75c]">✓ Valid phone number</p>
        )}
      </div>

    </div>
  );
}