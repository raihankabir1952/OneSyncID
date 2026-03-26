"use client";

import { useRef, useState } from "react";
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

  const emailFloated = emailFocused || email.length > 0;
  const phoneFloated = phoneFocused || phoneNumber.length > 0;

  return (
    <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">

      {/* Email */}
      <div
        className={`relative border-b transition-colors duration-200 cursor-text ${
          emailFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
        }`}
        onClick={() => emailRef.current?.focus()}
      >
        <div className="flex items-center gap-3 px-4 h-[64px]">
          <Mail
            size={20}
            className={`shrink-0 transition-colors ${emailValid ? "text-[#11a75c]" : emailFocused ? "text-[#025fc9]" : "text-[#5e5757]"}`}
          />
          <div className="relative flex-1 h-full cursor-text">
            <label
              style={fontSwitzer}
              className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                emailFloated
                  ? `top-[10px] text-[11px] ${emailValid ? "text-[#11a75c]" : "text-[#025fc9]"}`
                  : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
              }`}
            >
              Email Address
            </label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => { setEmailFocused(false); setEmailTouched(true); }}
              style={fontSwitzer}
              className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
            />
          </div>
        </div>
        {emailError && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-4 pb-2 -mt-1">
            {emailError}
          </p>
        )}
        {emailValid && !emailFocused && (
          <p style={fontSwitzer} className="text-[12px] text-[#11a75c] px-4 pb-2 -mt-1">
            ✓ Valid email address
          </p>
        )}
      </div>

      {/* Phone */}
      <div
        className={`relative transition-colors duration-200 cursor-text ${
          phoneFocused ? "border border-[#025fc9] rounded-b-[12px]" : ""
        }`}
        onClick={() => phoneRef.current?.focus()}
      >
        <div className="flex items-center gap-3 px-4 h-[64px]">
          {/* Flag + code + chevron */}
          <div
            className="flex items-center gap-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <FlagIcon countryCode={countryCode} className="w-[30px] h-[20px] border border-[#eee]" />
            <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">{phoneCode}</span>
            <ChevronDown size={16} className="text-[#5e5757]" />
          </div>

          {/* Divider */}
          <div className="w-px h-[40px] bg-[#d9d9d9] shrink-0" />

          {/* Floating Label + Input */}
          <div className="relative flex-1 h-full cursor-text">
            <label
              style={fontSwitzer}
              className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                phoneFloated
                  ? `top-[10px] text-[11px] ${phoneValid ? "text-[#11a75c]" : "text-[#025fc9]"}`
                  : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
              }`}
            >
              Phone Number
            </label>
            <input
              ref={phoneRef}
              type="tel"
              value={phoneNumber}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => { setPhoneFocused(false); setPhoneTouched(true); }}
              style={fontSwitzer}
              className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
            />
          </div>
        </div>
        {phoneError && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-4 pb-2 -mt-1">
            {phoneError}
          </p>
        )}
        {phoneValid && !phoneFocused && (
          <p style={fontSwitzer} className="text-[12px] text-[#11a75c] px-4 pb-2 -mt-1">
            ✓ Valid phone number
          </p>
        )}
      </div>
    </div>
  );
}