"use client";

import { useState } from "react";
import { User, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type AuthTab = "password" | "pin";

type Props = {
  authTab: AuthTab;
  onAuthTabChange: (tab: AuthTab) => void;
  usernameOrEmail: string;
  onUsernameOrEmailChange: (v: string) => void;
  password: string;
  onPasswordChange: (v: string) => void;
  pin: string;
  onPinChange: (v: string) => void;
};

export default function ExistingAccountForm({
  authTab,
  onAuthTabChange,
  usernameOrEmail,
  onUsernameOrEmailChange,
  password,
  onPasswordChange,
  pin,
  onPinChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={fontSwitzer}
      className="border border-[#d9d9d9] rounded-[12px] overflow-hidden flex flex-col"
    >
      {/* Username / Email */}
      <div className="border-b border-[#d9d9d9] flex items-start gap-2 px-4 py-5">
        <User size={20} className="text-[#5e5757] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-[6px] flex-1">
          <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
            USERNAME OR EMAIL
          </p>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => onUsernameOrEmailChange(e.target.value)}
            placeholder="Enter your username or email"
            className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Password / PIN toggle */}
      <div className="bg-[#f5f5f5] border-b border-[#d9d9d9] flex items-center justify-between px-[10px] py-[8px] gap-1">
        <button
          type="button"
          onClick={() => onAuthTabChange("password")}
          className={`flex-1 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
            authTab === "password"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#5e5757] border border-transparent"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => onAuthTabChange("pin")}
          className={`flex-1 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
            authTab === "pin"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#5e5757] border border-transparent"
          }`}
        >
          PIN
        </button>
      </div>

      {/* Password field */}
      {authTab === "password" && (
        <div className="flex items-start gap-2 px-4 py-5">
          <Lock size={20} className="text-[#5e5757] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-[6px] flex-1">
            <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
              PASSWORD
            </p>
            <div className="flex items-center justify-between">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter your password"
                className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-black placeholder:text-[#a09898] bg-transparent outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 shrink-0"
              >
                {showPassword
                  ? <EyeOff size={20} className="text-[#5e5757]" />
                  : <Eye    size={20} className="text-[#5e5757]" />
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIN field */}
      {authTab === "pin" && (
        <div className="flex items-start gap-2 px-4 py-5">
          <KeyRound size={20} className="text-[#5e5757] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-[6px] flex-1">
            <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
              PIN
            </p>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => onPinChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter your PIN"
              maxLength={6}
              className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full tracking-[0.5em]"
            />
          </div>
        </div>
      )}
    </div>
  );
}