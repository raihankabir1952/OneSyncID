"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

// ─── Inline SVG Icons (no expiry) ────────────────────────────────────────────

const LockIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#025fc9" : "#5e5757"} strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const CheckIcon = ({ color = "#5e5757" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#a09898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#a09898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ─── Requirement dot ──────────────────────────────────────────────────────────
/*
 * Figma states:
 * - not started: border #d9d9d9 (Ellipse20 — empty circle)
 * - passed (green): filled #11a75c circle
 * - failed (red):   filled #ff3838 circle
 */
function RequirementDot({ passed, started }: { passed: boolean; started: boolean }) {
  if (!started) {
    return (
      <div className="w-4 h-4 rounded-full border-2 border-[#d9d9d9] shrink-0" />
    );
  }
  if (passed) {
    return (
      <div className="w-4 h-4 rounded-full bg-[#11a75c] shrink-0 flex items-center justify-center">
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  return <div className="w-4 h-4 rounded-full bg-[#ff3838] shrink-0" />;
}

// ─── Password requirements ────────────────────────────────────────────────────

interface Requirement {
  label: string;
  test: (pw: string) => boolean;
}

const requirements: Requirement[] = [
  { label: "Minimum 8 characters",    test: (pw) => pw.length >= 8 },
  { label: "One uppercase character", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase character", test: (pw) => /[a-z]/.test(pw) },
  { label: "One special character",   test: (pw) => /[^a-zA-Z0-9]/.test(pw) },
  { label: "One number",              test: (pw) => /[0-9]/.test(pw) },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateNewPasswordPage() {
  const router = useRouter();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef  = useRef<HTMLInputElement>(null);

  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword,    setShowPassword]    = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [logOutAll,       setLogOutAll]       = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused,  setConfirmFocused]  = useState(false);

  const passwordFloated = passwordFocused || password.length > 0;
  const confirmFloated  = confirmFocused  || confirmPassword.length > 0;

  const allPassed      = requirements.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isFormValid    = allPassed && passwordsMatch;

  return (
    /*
     * Figma: 393 × 852px (fixed, scrollable content)
     */
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="relative bg-white overflow-hidden"
        style={{ width: "393px", height: "852px" }}
      >
        <div className="absolute inset-0 overflow-y-auto">

          {/*
           * Header
           * Figma: px 20px | gap 10px | no back button on this screen
           * Title: Switzer Semibold 20px #000 | centered
           */}
          <div
            className="px-5 flex flex-col items-center"
            style={{ paddingTop: "80px", gap: "10px" }}
          >
            {/* Empty 24px placeholder where back icon would be */}
            <div className="h-6 w-full" />
            <h1
              style={fontSwitzer}
              className="text-[20px] font-semibold leading-normal text-black text-center"
            >
              Create a new password
            </h1>
          </div>

          {/*
           * Body
           * Figma: top from header | px 20px | w 353px | outer gap 40px
           */}
          <div
            className="flex flex-col items-start px-5 pb-10"
            style={{ paddingTop: "50px", gap: "40px" }}
          >
            <div className="flex flex-col w-[353px]" style={{ gap: "30px" }}>

              {/*
               * Description
               * Figma: Switzer Regular 16px #333 leading-normal
               */}
              <p
                style={fontSwitzer}
                className="text-[16px] leading-normal text-[#333]"
              >
                Your new password must be different from your previous passwords
              </p>

              <div className="flex flex-col w-[353px]" style={{ gap: "20px" }}>

                {/*
                 * New Password field
                 * Figma (focused state): border rgba(2,95,201,0.4) | shadow 0 0 3px 2px rgba(2,95,201,0.1) | radius 12px
                 * px 16px | py 20px
                 * Label: Switzer Medium 16px #025fc9 (focused)
                 * Placeholder: Switzer Regular 16px #a09898
                 */}
                <div
                  className={`border rounded-[12px] transition-all duration-200 cursor-text w-full ${
                    passwordFocused
                      ? "border-[rgba(2,95,201,0.4)] shadow-[0_0_3px_2px_rgba(2,95,201,0.1)]"
                      : "border-[#d9d9d9]"
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
                        New Password
                      </label>
                      <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        style={fontSwitzer}
                        className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px] pr-8"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setShowPassword((p) => !p); }}
                      className="shrink-0"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/*
                 * Password requirements card
                 * Figma: border 1px #d9d9d9 | radius 12px | px 16px | py 20px
                 * Section label: Switzer Medium 16px #5e5757 leading-[21px] tracking-[0.16px]
                 * Each row: h 21px | gap 8px
                 * Req text: Switzer Regular 16px | green #11a75c | red #ff3838 | gray #a09898
                 *           leading-[21px] | tracking-[0.16px]
                 */}
                {password.length > 0 && (
                  <div className="border border-[#d9d9d9] rounded-[12px] px-4 py-5 w-full">
                    <div className="flex flex-col" style={{ gap: "6px" }}>
                      <p
                        style={fontSwitzer}
                        className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]"
                      >
                        PASSWORD MUST INCLUDE
                      </p>
                      <div className="flex flex-col mt-1" style={{ gap: "6px" }}>
                        {requirements.map((req) => {
                          const passed = req.test(password);
                          return (
                            <div key={req.label} className="flex items-center h-[21px]" style={{ gap: "8px" }}>
                              <RequirementDot passed={passed} started={password.length > 0} />
                              <span
                                style={fontSwitzer}
                                className={`text-[16px] leading-[21px] tracking-[0.16px] ${
                                  passed ? "text-[#11a75c]" : "text-[#ff3838]"
                                }`}
                              >
                                {req.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirm password + checkbox */}
                <div className="flex flex-col w-full" style={{ gap: "12px" }}>

                  {/*
                   * Confirm Password field
                   * Figma: border 1px #d9d9d9 | radius 12px | px 16px | py 20px
                   * Icon: hugeicons:tick-02 (checkmark) | 20×20px
                   * Label: Switzer Medium 16px #5e5757
                   * Placeholder: Switzer Regular 16px #a09898
                   */}
                  <div
                    className={`border rounded-[12px] transition-colors duration-200 cursor-text w-full ${
                      confirmFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
                    }`}
                    onClick={() => confirmRef.current?.focus()}
                  >
                    <div className="flex items-center gap-2 px-4 h-[64px]">
                      <CheckIcon
                        color={
                          passwordsMatch
                            ? "#11a75c"
                            : confirmFocused
                            ? "#025fc9"
                            : "#5e5757"
                        }
                      />
                      <div className="relative flex-1 h-full">
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
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onFocus={() => setConfirmFocused(true)}
                          onBlur={() => setConfirmFocused(false)}
                          style={fontSwitzer}
                          className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px] pr-8"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setShowConfirm((p) => !p); }}
                        className="shrink-0"
                      >
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Mismatch warning */}
                  {confirmPassword.length > 0 && !confirmFocused && !passwordsMatch && (
                    <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-1">
                      Passwords do not match
                    </p>
                  )}
                  {passwordsMatch && !confirmFocused && (
                    <p style={fontSwitzer} className="text-[12px] text-[#11a75c] px-1">
                      ✓ Passwords match
                    </p>
                  )}

                  {/*
                   * Log out of all devices checkbox
                   * Figma: checkbox 16×16px | border #5e5757 | radius 2px
                   * Label: Switzer Regular 14px #5e5757
                   * gap: 8px
                   */}
                  <button
                    type="button"
                    onClick={() => setLogOutAll((l) => !l)}
                    className="flex items-center"
                    style={{ gap: "8px" }}
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                        logOutAll ? "bg-[#025fc9] border-[#025fc9]" : "border-[#5e5757]"
                      }`}
                    >
                      {logOutAll && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={fontSwitzer} className="text-[14px] leading-normal text-[#5e5757]">
                      Log out of all devices
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/*
             * Reset & Log In Button
             * Figma: bg #025fc9 | h 44px | radius 8px | w 353px
             * Label: Switzer Medium 16px white
             */}
            <button
              disabled={!isFormValid}
              onClick={() => router.push("/reset-password/success")}
              style={fontSwitzer}
              className={`w-[353px] h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium leading-normal text-white">
                Reset &amp; Log In
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}