"use client";

import { useRef, useState } from "react";
import { Lock, Check, Eye, EyeOff } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type Props = {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

export default function SecuritySection({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
}: Props) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef  = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm,  setShowConfirm]    = useState(false);
  const [passFocused,  setPassFocused]    = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [passTouched,  setPassTouched]    = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const passFloated    = passFocused    || password.length > 0;
  const confirmFloated = confirmFocused || confirmPassword.length > 0;

  const passwordTooShort  = passTouched && !passFocused && password.length > 0 && password.length < 8;
  const passwordsMatch    = password && confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmTouched && !confirmFocused && confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">

      {/* Password */}
      <div
        className={`relative border-b transition-colors duration-200 cursor-text ${
          passFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
        }`}
        onClick={() => passwordRef.current?.focus()}
      >
        <div className="flex items-center gap-3 px-4 h-[64px]">
          <Lock
            size={20}
            className={`shrink-0 transition-colors ${passFocused ? "text-[#025fc9]" : "text-[#5e5757]"}`}
          />
          <div className="relative flex-1 h-full cursor-text">
            <label
              style={fontSwitzer}
              className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                passFloated
                  ? "top-[10px] text-[11px] text-[#025fc9]"
                  : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
              }`}
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onFocus={() => setPassFocused(true)}
              onBlur={() => { setPassFocused(false); setPassTouched(true); }}
              style={fontSwitzer}
              className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px] pr-8"
            />
          </div>
          {/* Eye toggle — stopPropagation যাতে input focus না হয় */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }}
            className="shrink-0"
          >
            {showPassword
              ? <EyeOff size={20} className="text-[#5e5757]" />
              : <Eye    size={20} className="text-[#5e5757]" />
            }
          </button>
        </div>
        {passwordTooShort && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-4 pb-2 -mt-1">
            Password must be at least 8 characters
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div
        className={`relative transition-colors duration-200 cursor-text ${
          confirmFocused ? "border border-[#025fc9] rounded-b-[12px]" : ""
        }`}
        onClick={() => confirmRef.current?.focus()}
      >
        <div className="flex items-center gap-3 px-4 h-[64px]">
          <Check
            size={20}
            className={`shrink-0 transition-colors ${passwordsMatch ? "text-[#11a75c]" : confirmFocused ? "text-[#025fc9]" : "text-[#5e5757]"}`}
          />
          <div className="relative flex-1 h-full cursor-text">
            <label
              style={fontSwitzer}
              className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                confirmFloated
                  ? `top-[10px] text-[11px] ${passwordsMatch ? "text-[#11a75c]" : "text-[#025fc9]"}`
                  : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
              }`}
            >
              Confirm Password
            </label>
            <input
              ref={confirmRef}
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              onFocus={() => setConfirmFocused(true)}
              onBlur={() => { setConfirmFocused(false); setConfirmTouched(true); }}
              style={fontSwitzer}
              className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px] pr-8"
            />
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowConfirm(!showConfirm); }}
            className="shrink-0"
          >
            {showConfirm
              ? <EyeOff size={20} className="text-[#5e5757]" />
              : <Eye    size={20} className="text-[#5e5757]" />
            }
          </button>
        </div>
        {passwordsMismatch && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-4 pb-2 -mt-1">
            Passwords do not match
          </p>
        )}
        {passwordsMatch && !confirmFocused && (
          <p style={fontSwitzer} className="text-[12px] text-[#11a75c] px-4 pb-2 -mt-1">
            ✓ Passwords match
          </p>
        )}
      </div>
    </div>
  );
}