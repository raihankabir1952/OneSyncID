"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

interface Requirement {
  label: string;
  test: (pw: string) => boolean;
}

const requirements: Requirement[] = [
  { label: "Minimum 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase character", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase character", test: (pw) => /[a-z]/.test(pw) },
  { label: "One special character", test: (pw) => /[^a-zA-Z0-9]/.test(pw) },
  { label: "One number", test: (pw) => /[0-9]/.test(pw) },
];

function RequirementDot({ passed, started }: { passed: boolean; started: boolean }) {
  if (!started) return <div className="w-4 h-4 rounded-full border-2 border-[#d9d9d9] shrink-0" />;
  if (passed) return <div className="w-4 h-4 rounded-full bg-[#11a75c] shrink-0 flex items-center justify-center"><Check size={10} className="text-white" /></div>;
  return <div className="w-4 h-4 rounded-full bg-[#ff3838] shrink-0" />;
}

export default function CreateNewPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [logOutAll, setLogOutAll] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const allPassed = requirements.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isFormValid = allPassed && passwordsMatch;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Status Bar */}
        {/* <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
          <span className="text-[17px] font-semibold text-black">9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-[2px] h-[12px]">
              <div className="w-[3px] h-[4px] bg-black rounded-sm" />
              <div className="w-[3px] h-[6px] bg-black rounded-sm" />
              <div className="w-[3px] h-[8px] bg-black rounded-sm" />
              <div className="w-[3px] h-[10px] bg-black rounded-sm" />
            </div>
            <svg width="16" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 18C12.83 18 13.5 18.67 13.5 19.5S12.83 21 12 21 10.5 20.33 10.5 19.5 11.17 18 12 18Z" fill="black" />
              <path d="M12 13C14.21 13 16.21 13.9 17.66 15.34L19.07 13.93C17.24 12.1 14.75 11 12 11S6.76 12.1 4.93 13.93L6.34 15.34C7.79 13.9 9.79 13 12 13Z" fill="black" />
              <path d="M12 8C15.54 8 18.73 9.44 21.04 11.77L22.45 10.36C19.75 7.66 16.06 6 12 6S4.25 7.66 1.55 10.36L2.96 11.77C5.27 9.44 8.46 8 12 8Z" fill="black" />
            </svg>
            <div className="flex items-center">
              <div className="w-[22px] h-[11px] border border-black rounded-[2px] flex items-center px-[1px]">
                <div className="w-full h-[7px] bg-black rounded-[1px]" />
              </div>
              <div className="w-[1px] h-[4px] bg-black ml-[1px]" />
            </div>
          </div>
        </div> */}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
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

                {/* New Password Input */}
                <div className={`border rounded-xl px-4 py-5 transition-all ${
                  passwordFocused
                    ? "border-[rgba(2,95,201,0.4)] shadow-[0_0_3px_2px_rgba(2,95,201,0.1)]"
                    : "border-[#d9d9d9]"
                }`}>
                  <div className="flex items-start gap-2">
                    <Lock size={20} className={`shrink-0 mt-[2px] ${passwordFocused ? "text-[#025fc9]" : "text-[#5e5757]"}`} />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] ${passwordFocused ? "text-[#025fc9]" : "text-[#5e5757]"}`}>
                        NEW PASSWORD
                      </p>
                      <div className="flex items-center justify-between">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                          placeholder="Create a strong password"
                          className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none flex-1"
                          style={fontSwitzer}
                        />
                        <button onClick={() => setShowPassword((p) => !p)} className="shrink-0 ml-2 text-[#a09898]">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements (shows when typing) */}
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
                                  password.length === 0
                                    ? "text-[#a09898]"
                                    : passed
                                    ? "text-[#11a75c]"
                                    : "text-[#ff3838]"
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
                  <div className="border border-[#d9d9d9] rounded-xl px-4 py-5">
                    <div className="flex items-start gap-2">
                      <Check size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
                      <div className="flex flex-col gap-[6px] flex-1">
                        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                          CONFIRM PASSWORD
                        </p>
                        <div className="flex items-center justify-between">
                          <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none flex-1"
                            style={fontSwitzer}
                          />
                          <button onClick={() => setShowConfirm((p) => !p)} className="shrink-0 ml-2 text-[#a09898]">
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Passwords don't match warning */}
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p style={fontSwitzer} className="text-[12px] text-[#ff3838] px-1">
                      Passwords do not match
                    </p>
                  )}

                  {/* Log out of all devices */}
                  <button
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
