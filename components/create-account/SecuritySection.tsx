"use client";

import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type Props = {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

type CheckItem = {
  label: string;
  test: (pw: string) => boolean;
};

const checks: CheckItem[] = [
  { label: "Minimum 8 characters",    test: (pw) => pw.length >= 8 },
  { label: "One uppercase character", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase character", test: (pw) => /[a-z]/.test(pw) },
  { label: "One special character",   test: (pw) => /[^a-zA-Z0-9]/.test(pw) },
  { label: "One number",              test: (pw) => /[0-9]/.test(pw) },
];

function CheckDot({ status }: { status: "pass" | "fail" | "idle" }) {
  if (status === "pass") {
    return (
      <span className="shrink-0 w-4 h-4 rounded-full bg-[#11a75c] flex items-center justify-center">
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    );
  }
  if (status === "fail") {
    return (
      <span className="shrink-0 w-4 h-4 rounded-full bg-[#ff3838] flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1L7 7M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
    );
  }
  return <span className="shrink-0 w-4 h-4 rounded-full border-2 border-[#d9d9d9]" />;
}

export default function SecuritySection({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
}: Props) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef  = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword]     = useState(false);
  const [showConfirm,  setShowConfirm]      = useState(false);
  const [passFocused,  setPassFocused]      = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const passwordsMatch    = password && confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmTouched && !confirmFocused && confirmPassword.length > 0 && password !== confirmPassword;
  const showChecklist     = password.length > 0;

  return (
    <div className="flex flex-col gap-[20px] w-full">

      {/* ── PASSWORD ── */}
      <div className="flex flex-col gap-[10px]">
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
          PASSWORD
        </p>
        <div
          className={`border-b py-[10px] flex items-center gap-3 cursor-text transition-colors ${
            passFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => passwordRef.current?.focus()}
        >
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Create a strong password"
            onChange={(e) => onPasswordChange(e.target.value)}
            onFocus={() => setPassFocused(true)}
            onBlur={() => setPassFocused(false)}
            style={fontSwitzer}
            className="flex-1 text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px]"
          />
          <button type="button" onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }} className="shrink-0">
            {showPassword
              ? <EyeOff size={20} className="text-[#5e5757]" />
              : <Eye    size={20} className="text-[#5e5757]" />
            }
          </button>
        </div>

        {/* Password checklist */}
        {showChecklist && (
          <div className="flex flex-col gap-[6px] pt-[2px]">
            <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
              PASSWORD MUST INCLUDE
            </p>
            <div className="flex flex-col gap-[6px]">
              {checks.map((c) => {
                const passed = c.test(password);
                const status = passed ? "pass" : password.length > 0 ? "fail" : "idle";
                return (
                  <div key={c.label} className="flex items-center gap-[8px] h-[21px]">
                    <CheckDot status={status} />
                    <span
                      style={fontSwitzer}
                      className={`text-[16px] tracking-[0.16px] leading-[21px] ${
                        status === "pass" ? "text-[#11a75c]"
                          : status === "fail" ? "text-[#ff3838]"
                          : "text-[#a09898]"
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── CONFIRM PASSWORD ── */}
      <div className="flex flex-col gap-[10px]">
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
          CONFIRM PASSWORD
        </p>
        <div
          className={`border-b py-[10px] flex items-center gap-3 cursor-text transition-colors ${
            confirmFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => confirmRef.current?.focus()}
        >
          <input
            ref={confirmRef}
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            placeholder="Re-enter password"
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            onFocus={() => setConfirmFocused(true)}
            onBlur={() => { setConfirmFocused(false); setConfirmTouched(true); }}
            style={fontSwitzer}
            className="flex-1 text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px]"
          />
          <button type="button" onClick={(e) => { e.stopPropagation(); setShowConfirm(!showConfirm); }} className="shrink-0">
            {showConfirm
              ? <EyeOff size={20} className="text-[#5e5757]" />
              : <Eye    size={20} className="text-[#5e5757]" />
            }
          </button>
        </div>
        {passwordsMismatch && (
          <p style={fontSwitzer} className="text-[12px] text-[#ff3838]">Passwords do not match</p>
        )}
        {passwordsMatch && !confirmFocused && (
          <p style={fontSwitzer} className="text-[12px] text-[#11a75c]">✓ Passwords match</p>
        )}
      </div>

    </div>
  );
}