"use client";

import { useRef, useState } from "react";
import { fontSwitzer } from "@/lib/styles";

// ─── Inline SVG Icons (no expiry) ────────────────────────────────────────────

const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#025fc9" : "#5e5757"} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const LockIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#025fc9" : "#5e5757"} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const KeyIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#025fc9" : "#5e5757"} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="M21 2l-9.6 9.6"/>
    <path d="M15.5 7.5l3 3L22 7l-3-3"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

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
    /*
     * Figma node: 1854:11480
     * border: 1px #d9d9d9 | radius: 12px | w: 353px
     * Username row: h 88px | px 16px | py 20px
     * Tab switcher: h 53px | px 10px | py 8px | bg #f5f5f5
     * Password row: h 91px | px 16px | py 20px
     */
    <div
      style={fontSwitzer}
      className="border border-[#d9d9d9] rounded-[12px] overflow-hidden flex flex-col w-[353px]"
    >
      {/* ── Username / Email row ── */}
      <div
        className={`border-b transition-colors duration-200 cursor-text ${
          usernameFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
        }`}
        onClick={() => usernameRef.current?.focus()}
      >
        <div className="flex items-center gap-2 px-4 h-[64px]">
          <UserIcon active={usernameFocused || usernameOrEmail.length > 0} />
          <div className="relative flex-1 h-full">
            {/*
             * Figma floating label pattern:
             * default: Switzer Medium 16px #a09898 vertically centered
             * floated: Switzer Medium 11px #025fc9 top-[10px]
             */}
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

      {/* ── Password / PIN tab switcher ──
       * Figma: bg #f5f5f5 | border-b #d9d9d9 | h 53px | px 10px | py 8px
       * Active: bg white | border 1px #025fc9 | radius 8px
       * Label: Switzer Medium | 16px | leading-[21px] | tracking-[0.16px]
       */}
      <div className="bg-[#f5f5f5] border-b border-[#d9d9d9] flex items-center px-[10px] py-[8px] h-[53px] gap-1">
        <button
          type="button"
          onClick={() => onAuthTabChange("password")}
          style={fontSwitzer}
          className={`flex-1 h-[37px] rounded-[8px] text-[16px] font-medium leading-[21px] tracking-[0.16px] transition-all ${
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
          style={fontSwitzer}
          className={`flex-1 h-[37px] rounded-[8px] text-[16px] font-medium leading-[21px] tracking-[0.16px] transition-all ${
            authTab === "pin"
              ? "bg-white border border-[#025fc9] text-[#025fc9]"
              : "text-[#5e5757] border border-transparent"
          }`}
        >
          PIN
        </button>
      </div>

      {/* ── Password field ──
       * Figma: h 91px | px 16px | py 20px
       * Label: Switzer Medium 16px #5e5757 → floated: 11px #025fc9
       * Placeholder: Switzer Regular 16px #a09898
       * Eye icon: 24×24px
       */}
      {authTab === "password" && (
        <div
          className={`cursor-text transition-colors duration-200 ${
            passwordFocused ? "border border-[#025fc9] rounded-b-[12px]" : ""
          }`}
          onClick={() => passwordRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 h-[64px]">
            <LockIcon active={passwordFocused || password.length > 0} />
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
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
      )}

      {/* ── PIN field ──
       * Figma: same dimensions as password row
       * Label: Switzer Medium 16px #5e5757 → floated: 11px #025fc9
       */}
      {authTab === "pin" && (
        <div
          className={`cursor-text transition-colors duration-200 ${
            pinFocused ? "border border-[#025fc9] rounded-b-[12px]" : ""
          }`}
          onClick={() => pinRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 h-[64px]">
            <KeyIcon active={pinFocused || pin.length > 0} />
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