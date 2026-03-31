"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Lock, Eye, EyeOff, ScanFace, Fingerprint } from "lucide-react";
import Link from "next/link";
import { fontSwitzer } from "@/lib/styles";

type AuthTab = "password" | "pin";

export default function SignInPage() {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [authTab,         setAuthTab]         = useState<AuthTab>("password");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password,        setPassword]        = useState("");
  const [pin,             setPin]             = useState("");
  const [showPassword,    setShowPassword]    = useState(false);
  const [rememberMe,      setRememberMe]      = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const usernameFloated = usernameFocused || usernameOrEmail.length > 0;
  const passwordFloated = passwordFocused || password.length > 0;

  const isFormValid =
    usernameOrEmail.trim().length > 0 &&
    (authTab === "password" ? password.length >= 6 : pin.length === 6);

  // "Forgot" button routes differently per tab
  const handleForgot = () => {
    if (authTab === "password") {
      router.push("/reset-password");
    } else {
      router.push("/reset-pin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
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
            <div className="flex flex-col gap-3">

              {/* Main Input Card */}
              <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden bg-white">

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
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        onFocus={() => setUsernameFocused(true)}
                        onBlur={() => setUsernameFocused(false)}
                        style={fontSwitzer}
                        className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Password / PIN Tab */}
                <div className="bg-[#f5f5f5] border-b border-[#d9d9d9] px-[10px] py-[8px] flex items-center gap-1">
                  <button
                    onClick={() => setAuthTab("password")}
                    style={fontSwitzer}
                    className={`flex-1 h-[37px] rounded-[8px] text-[16px] font-medium transition-all ${
                      authTab === "password"
                        ? "bg-white border border-[#025fc9] text-[#025fc9]"
                        : "text-[#5e5757] border border-transparent"
                    }`}
                  >
                    Password
                  </button>
                  <button
                    onClick={() => setAuthTab("pin")}
                    style={fontSwitzer}
                    className={`flex-1 h-[37px] rounded-[8px] text-[16px] font-medium transition-all ${
                      authTab === "pin"
                        ? "bg-white border border-[#025fc9] text-[#025fc9]"
                        : "text-[#5e5757] border border-transparent"
                    }`}
                  >
                    PIN
                  </button>
                </div>

                {/* Password Input */}
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
                )}

                {/* PIN Input  */}
                {authTab === "pin" && (
                  <div className="px-4 py-5">
                    <div className="flex flex-col gap-[6px]">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">
                        6 DIGIT PIN
                      </p>
                      <div className="flex items-center justify-center gap-6 py-2">
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
                      <input
                        type="tel"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="opacity-0 absolute w-0 h-0"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.querySelector('input[type="tel"]') as HTMLInputElement;
                          input?.focus();
                        }}
                        style={fontSwitzer}
                        className="text-[13px] text-[#a09898] text-center"
                      >
                        Tap here to enter PIN
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                {authTab === "password" ? (
                  <button
                    type="button"
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
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={handleForgot}
                  style={fontSwitzer}
                  className="text-[14px] text-[#0052b4]"
                >
                  {authTab === "password" ? "Forgot password?" : "Forgot PIN?"}
                </button>
              </div>

              {/* Face ID + Fingerprint */}
              <div className="flex items-center gap-[12px] pt-5">
                <button
                  type="button"
                  onClick={() => router.push("/passkey/not-found")}
                  style={fontSwitzer}
                  className="flex-1 flex items-center justify-center gap-2 bg-[rgba(2,95,201,0.1)] rounded-[12px] px-4 py-[8px]"
                >
                  <ScanFace size={20} className="text-[#025fc9]" />
                  <span className="text-[16px] font-medium text-[#025fc9] leading-[21px] tracking-[0.16px]">Face ID</span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/passkey/not-found")}
                  style={fontSwitzer}
                  className="flex-1 flex items-center justify-center gap-2 bg-[rgba(2,95,201,0.1)] rounded-[12px] px-4 py-[8px]"
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
                style={fontSwitzer}
                className={`w-full h-11 bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
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
              type="button"
              onClick={() => router.push("/sign-in/otp")}
              style={fontSwitzer}
              className="w-full h-11 border-[1.5px] border-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-[#025fc9]">Sign In with One Time Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}