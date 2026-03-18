"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Lock, Eye, EyeOff, ScanFace, Fingerprint } from "lucide-react";
import Link from "next/link";
import { fontSwitzer } from "@/lib/styles";

type AuthTab = "password" | "pin";

export default function SignInPage() {
  const router = useRouter();

  const [authTab, setAuthTab] = useState<AuthTab>("password");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isFormValid =
    usernameOrEmail.trim().length > 0 &&
    (authTab === "password" ? password.length >= 6 : pin.length === 6);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
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
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
            <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
              <ArrowLeft size={24} className="text-black" />
            </button>
            <div className="flex justify-center">
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
                Sign in to your account
              </h1>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-[40px] px-5 pt-[50px] pb-10">

            {/* Input Card + extras */}
            <div className="flex flex-col gap-3">

              {/* Main Input Card */}
              <div className="border border-[#d9d9d9] rounded-xl overflow-hidden bg-white">

                {/* Username / Email Row */}
                <div className="border-b border-[#d9d9d9] px-4 py-5">
                  <div className="flex items-start gap-2">
                    <User size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                        USERNAME OR EMAIL
                      </p>
                      <input
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        placeholder="Enter your username or email"
                        className="text-[16px] text-black placeholder:text-[#a09898] leading-[21px] tracking-[0.16px] bg-transparent outline-none w-full"
                        style={fontSwitzer}
                      />
                    </div>
                  </div>
                </div>

                {/* Password / PIN Tab */}
                <div className="bg-[#f5f5f5] border-b border-[#d9d9d9] px-[10px] py-2 flex items-center gap-2">
                  <button
                    onClick={() => setAuthTab("password")}
                    style={fontSwitzer}
                    className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium transition-all ${
                      authTab === "password"
                        ? "bg-white border border-[#025fc9] text-[#025fc9]"
                        : "text-[#5e5757]"
                    }`}
                  >
                    Password
                  </button>
                  <button
                    onClick={() => setAuthTab("pin")}
                    style={fontSwitzer}
                    className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium transition-all ${
                      authTab === "pin"
                        ? "bg-white border border-[#025fc9] text-[#025fc9]"
                        : "text-[#5e5757]"
                    }`}
                  >
                    PIN
                  </button>
                </div>

                {/* Password Input */}
                {authTab === "password" && (
                  <div className="px-4 py-5">
                    <div className="flex items-start gap-2">
                      <Lock size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
                      <div className="flex flex-col gap-[6px] flex-1">
                        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                          PASSWORD
                        </p>
                        <div className="flex items-center justify-between">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="text-[16px] text-black placeholder:text-[#a09898] leading-[21px] tracking-[0.16px] bg-transparent outline-none flex-1"
                            style={fontSwitzer}
                          />
                          <button
                            onClick={() => setShowPassword((p) => !p)}
                            className="shrink-0 ml-2 text-[#a09898]"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PIN Input */}
                {authTab === "pin" && (
                  <div className="px-4 py-5">
                    <div className="flex flex-col gap-[6px]">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                        6 DIGIT PIN
                      </p>
                      {/* PIN dots */}
                      <div className="flex items-center gap-6 py-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full border-2 transition-all ${
                              i < pin.length
                                ? "bg-[#025fc9] border-[#025fc9]"
                                : "border-[#d9d9d9] bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                      {/* Hidden input to capture PIN */}
                      <input
                        type="tel"
                        value={pin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setPin(val);
                        }}
                        className="opacity-0 absolute w-0 h-0"
                        autoFocus={authTab === "pin"}
                      />
                      {/* Tap to enter PIN */}
                      <button
                        onClick={() => {
                          const input = document.querySelector('input[type="tel"]') as HTMLInputElement;
                          input?.focus();
                        }}
                        style={fontSwitzer}
                        className="text-[14px] text-[#a09898] text-left"
                      >
                        Tap to enter PIN
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setRememberMe((r) => !r)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                    rememberMe ? "bg-[#025fc9] border-[#025fc9]" : "border-[#5e5757]"
                  }`}>
                    {rememberMe && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={fontSwitzer} className="text-[14px] text-[#5e5757]">Remember me</span>
                </button>

                <button
                  onClick={() => router.push("/reset-password")}
                  style={fontSwitzer}
                  className="text-[14px] text-[#0052b4]"
                >
                  {authTab === "password" ? "Forgot password?" : "Forgot PIN?"}
                </button>
              </div>

              {/* Face ID + Fingerprint */}
              <div className="flex items-center gap-3 pt-5">
                <button
                  onClick={() => router.push("/passkey/not-found")}
                  style={fontSwitzer}
                  className="flex-1 flex items-center justify-center gap-2 bg-[rgba(2,95,201,0.1)] rounded-xl px-4 py-2"
                >
                  <ScanFace size={20} className="text-[#025fc9]" />
                  <span className="text-[16px] font-medium text-[#025fc9] leading-[21px] tracking-[0.16px]">Face ID</span>
                </button>
                <button
                  onClick={() => router.push("/passkey/not-found")}
                  style={fontSwitzer}
                  className="flex-1 flex items-center justify-center gap-2 bg-[rgba(2,95,201,0.1)] rounded-xl px-4 py-2"
                >
                  <Fingerprint size={20} className="text-[#025fc9]" />
                  <span className="text-[16px] font-medium text-[#025fc9] leading-[21px] tracking-[0.16px]">Fingerprint</span>
                </button>
              </div>
            </div>

            {/* Terms + Sign In Button */}
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[12px] text-[#333]">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-[#025fc9]">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#025fc9]">Privacy Policy</Link>
              </p>

              <button
                disabled={!isFormValid}
                onClick={() => router.push("/welcome")}
                // onClick={() => router.push("/trust-device")}
                
                style={fontSwitzer}
                className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
                  !isFormValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
                }`}
              >
                <span className="text-[16px] font-medium text-white">Sign In</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-5">
              <div className="flex-1 h-px bg-[#d9d9d9]" />
              <span style={fontSwitzer} className="text-[14px] font-medium text-[#5e5757]">Or</span>
              <div className="flex-1 h-px bg-[#d9d9d9]" />
            </div>

            {/* OTP Button */}
            <button
              onClick={() => router.push("/sign-in/otp")}
              style={fontSwitzer}
              className="w-full h-11 border-[1.5px] border-[#025fc9] rounded-lg flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-[#025fc9]">Sign In with One Time Password</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
