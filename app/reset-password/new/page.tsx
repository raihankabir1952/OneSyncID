"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

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

function RequirementDot({ passed, started }: { passed: boolean; started: boolean }) {
  if (!started) return <div className="w-4 h-4 rounded-full border-2 border-[#d9d9d9] shrink-0" />;
  if (passed)   return <div className="w-4 h-4 rounded-full bg-[#11a75c] shrink-0 flex items-center justify-center"><Check size={10} className="text-white" /></div>;
  return <div className="w-4 h-4 rounded-full bg-[#ff3838] shrink-0" />;
}

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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-5 pt-6 pb-2 flex justify-center">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              Create a new password
            </h1>
          </div>

          <div className="flex flex-col gap-[40px] px-5 pt-[50px] pb-10">
            <div className="flex flex-col gap-[30px]">
              <p style={fontSwitzer} className="text-[16px] text-[#333]">
                Your new password must be different from your previous passwords
              </p>

              <div className="flex flex-col gap-[20px]">

                {/* New Password */}
                <div
                  className={`border rounded-xl transition-all duration-200 cursor-text ${
                    passwordFocused
                      ? "border-[rgba(2,95,201,0.4)] shadow-[0_0_3px_2px_rgba(2,95,201,0.1)]"
                      : "border-[#d9d9d9]"
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
                      className="shrink-0 text-[#a09898]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Requirements */}
                {password.length > 0 && (
                  <div className="border border-[#d9d9d9] rounded-xl px-4 py-5">
                    <div className="flex flex-col gap-[6px]">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                        PASSWORD MUST INCLUDE
                      </p>
                      <div className="flex flex-col gap-[6px] mt-1">
                        {requirements.map((req) => {
                          const passed = req.test(password);
                          return (
                            <div key={req.label} className="flex items-center gap-2">
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

                {/* Confirm Password */}
                <div className="flex flex-col gap-3">
                  <div
                    className={`border rounded-xl transition-colors duration-200 cursor-text ${
                      confirmFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
                    }`}
                    onClick={() => confirmRef.current?.focus()}
                  >
                    <div className="flex items-center gap-2 px-4 h-[64px]">
                      <Check
                        size={20}
                        className={`shrink-0 transition-colors ${
                          passwordsMatch ? "text-[#11a75c]" : confirmFocused ? "text-[#025fc9]" : "text-[#5e5757]"
                        }`}
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
                        className="shrink-0 text-[#a09898]"
                      >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Mismatch warning */}
                  {confirmPassword.length > 0 && !confirmFocused && !passwordsMatch && (
                    <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-1">
                      Passwords do not match
                    </p>
                  )}

                  {/* Match success */}
                  {passwordsMatch && !confirmFocused && (
                    <p style={fontSwitzer} className="text-[12px] text-[#11a75c] px-1">
                      ✓ Passwords match
                    </p>
                  )}

                  {/* Log out of all devices */}
                  <button
                    type="button"
                    onClick={() => setLogOutAll((l) => !l)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                      logOutAll ? "bg-[#025fc9] border-[#025fc9]" : "border-[#5e5757]"
                    }`}>
                      {logOutAll && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={fontSwitzer} className="text-[14px] text-[#5e5757]">Log out of all devices</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reset & Log In Button */}
            <button
              disabled={!isFormValid}
              onClick={() => router.push("/reset-password/success")}
              style={fontSwitzer}
              className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">Reset & Log In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}