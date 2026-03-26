"use client";

import { useRef, useState } from "react";
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
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const pinRef      = useRef<HTMLInputElement>(null);

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [pinFocused,      setPinFocused]      = useState(false);
  const [showPassword,    setShowPassword]    = useState(false);

  const usernameFloated = usernameFocused || usernameOrEmail.length > 0;
  const passwordFloated = passwordFocused || password.length > 0;
  const pinFloated      = pinFocused      || pin.length > 0;

  return (
    <div
      style={fontSwitzer}
      className="border border-[#d9d9d9] rounded-[12px] overflow-hidden flex flex-col"
    >
      {/* Username / Email */}
      <div
        className={`border-b transition-colors duration-200 cursor-text ${
          usernameFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
        }`}
        onClick={() => usernameRef.current?.focus()}
      >
        <div className="flex items-center gap-2 px-4 h-[64px]">
          <User
            size={20}
            className={`shrink-0 transition-colors ${usernameFocused || usernameOrEmail ? "text-[#025fc9]" : "text-[#5e5757]"}`}
          />
          <div className="relative flex-1 h-full">
            <label
              style={fontSwitzer}
              className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                usernameFloated
                  ? "top-[10px] text-[11px] text-[#025fc9]"
                  : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
              }`}
            >
              Username or Email
            </label>
            <input
              ref={usernameRef}
              type="text"
              value={usernameOrEmail}
              onChange={(e) => onUsernameOrEmailChange(e.target.value)}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              style={fontSwitzer}
              className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
            />
          </div>
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
        <div
          className={`transition-colors duration-200 cursor-text ${
            passwordFocused ? "border border-[#025fc9] rounded-b-[12px]" : ""
          }`}
          onClick={() => passwordRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 h-[64px]">
            <Lock
              size={20}
              className={`shrink-0 transition-colors ${passwordFocused || password ? "text-[#025fc9]" : "text-[#5e5757]"}`}
            />
            <div className="relative flex-1 h-full">
              <label
                style={fontSwitzer}
                className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                  passwordFloated
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
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={fontSwitzer}
                className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px] pr-8"
              />
            </div>
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
        </div>
      )}

      {/* PIN field */}
      {authTab === "pin" && (
        <div
          className={`transition-colors duration-200 cursor-text ${
            pinFocused ? "border border-[#025fc9] rounded-b-[12px]" : ""
          }`}
          onClick={() => pinRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 h-[64px]">
            <KeyRound
              size={20}
              className={`shrink-0 transition-colors ${pinFocused || pin ? "text-[#025fc9]" : "text-[#5e5757]"}`}
            />
            <div className="relative flex-1 h-full">
              <label
                style={fontSwitzer}
                className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                  pinFloated
                    ? "top-[10px] text-[11px] text-[#025fc9]"
                    : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
                }`}
              >
                PIN
              </label>
              <input
                ref={pinRef}
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => onPinChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                onFocus={() => setPinFocused(true)}
                onBlur={() => setPinFocused(false)}
                style={fontSwitzer}
                className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px] tracking-[0.5em]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}