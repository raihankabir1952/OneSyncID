"use client";

import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordTouched = password.length > 0;
  const confirmTouched = confirmPassword.length > 0;
  const passwordTooShort = passwordTouched && password.length < 8;
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmTouched && password !== confirmPassword;

  return (
    // ✅ label নেই — PersonalFormPage এ আছে
    <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">

      {/* Password */}
      <div className="flex items-start gap-2 px-4 py-5 border-b border-[#d9d9d9]">
        <Lock size={20} className="text-[#5e5757] mt-1 shrink-0" />
        <div className="flex flex-col gap-1 flex-1">
          <label style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
            PASSWORD
          </label>
          <div className="flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              style={fontSwitzer}
              className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none flex-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2"
            >
              {showPassword
                ? <EyeOff size={20} className="text-[#5e5757]" />
                : <Eye size={20} className="text-[#5e5757]" />
              }
            </button>
          </div>
          {passwordTooShort && (
            <p style={fontSwitzer} className="text-[12px] text-[#ff3838] mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex items-start gap-2 px-4 py-5">
        <Check
          size={20}
          className={`mt-1 shrink-0 ${passwordsMatch ? "text-[#11a75c]" : "text-[#5e5757]"}`}
        />
        <div className="flex flex-col gap-1 flex-1">
          <label style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
            CONFIRM PASSWORD
          </label>
          <div className="flex items-center justify-between">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              style={fontSwitzer}
              className="text-[16px] text-black placeholder-[#a09898] bg-transparent outline-none border-none flex-1"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="ml-2"
            >
              {showConfirm
                ? <EyeOff size={20} className="text-[#5e5757]" />
                : <Eye size={20} className="text-[#5e5757]" />
              }
            </button>
          </div>
          {passwordsMismatch && (
            <p style={fontSwitzer} className="text-[12px] text-[#ff3838] mt-1">
              Passwords do not match
            </p>
          )}
          {passwordsMatch && (
            <p style={fontSwitzer} className="text-[12px] text-[#11a75c] mt-1">
              ✓ Passwords match
            </p>
          )}
        </div>
      </div>
    </div>
  );
}