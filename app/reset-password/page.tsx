"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, ChevronDown } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type ContactTab = "phone" | "email";

export default function ResetPasswordPage() {
  const router = useRouter();

  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [tab,          setTab]          = useState<ContactTab>("phone");
  const [phone,        setPhone]        = useState("");
  const [email,        setEmail]        = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const phoneFloated = phoneFocused || phone.length > 0;
  const emailFloated = emailFocused || email.length > 0;

  const isValid = tab === "phone"
    ? phone.length >= 10
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
                Reset your password
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[40px] px-5 pt-[50px] pb-10">
            <div className="flex flex-col gap-[20px]">

              {/* Illustration */}
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/reset-password.png"
                  alt="Reset password"
                  width={353}
                  height={232}
                  className="w-full h-auto"
                />
              </div>

              <div className="flex flex-col gap-3">

                {/* Description */}
                <p style={fontSwitzer} className="text-[16px] text-[#333]">
                  Type your registered phone or email to reset your password.
                </p>

                {/* Phone / Email Tab */}
                <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-xl px-[10px] py-2 flex items-center gap-2">
                  <button
                    onClick={() => setTab("phone")}
                    style={fontSwitzer}
                    className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium flex items-center justify-center gap-2 transition-all ${
                      tab === "phone"
                        ? "bg-white border border-[#025fc9] text-[#025fc9]"
                        : "text-[#5e5757]"
                    }`}
                  >
                    <Phone size={18} />
                    Phone
                  </button>
                  <button
                    onClick={() => setTab("email")}
                    style={fontSwitzer}
                    className={`flex-1 h-[37px] rounded-lg text-[16px] font-medium flex items-center justify-center gap-2 transition-all ${
                      tab === "email"
                        ? "bg-white border border-[#025fc9] text-[#025fc9]"
                        : "text-[#5e5757]"
                    }`}
                  >
                    <Mail size={18} />
                    Email
                  </button>
                </div>

                {/* Input */}
                {tab === "phone" ? (
                  <div
                    className={`border rounded-xl transition-colors duration-200 cursor-text ${
                      phoneFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
                    }`}
                    onClick={() => phoneRef.current?.focus()}
                  >
                    <div className="flex items-center gap-3 px-4 h-[64px]">
                      {/* BD Flag */}
                      <div
                        className="flex items-center gap-1 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="w-[30px] h-[20px] rounded-[2px] overflow-hidden border border-[#eee] shrink-0">
                          <div className="w-full h-full bg-[#006A4E] flex items-center justify-center">
                            <div className="w-[11px] h-[11px] rounded-full bg-[#F42A41] ml-[2px]" />
                          </div>
                        </div>
                        <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">+880</span>
                        <ChevronDown size={16} className="text-[#5e5757]" />
                      </div>
                      <div className="w-px h-[40px] bg-[#d9d9d9] shrink-0" />
                      <div className="relative flex-1 h-full">
                        <label
                          style={fontSwitzer}
                          className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                            phoneFloated
                              ? "top-[10px] text-[11px] text-[#025fc9]"
                              : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          ref={phoneRef}
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          onFocus={() => setPhoneFocused(true)}
                          onBlur={() => setPhoneFocused(false)}
                          style={fontSwitzer}
                          className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border rounded-xl transition-colors duration-200 cursor-text ${
                      emailFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
                    }`}
                    onClick={() => emailRef.current?.focus()}
                  >
                    <div className="flex items-center gap-2 px-4 h-[64px]">
                      <Mail
                        size={20}
                        className={`shrink-0 transition-colors ${emailFocused || email ? "text-[#025fc9]" : "text-[#5e5757]"}`}
                      />
                      <div className="relative flex-1 h-full">
                        <label
                          style={fontSwitzer}
                          className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                            emailFloated
                              ? "top-[10px] text-[11px] text-[#025fc9]"
                              : "top-1/2 -translate-y-1/2 text-[16px] text-[#a09898]"
                          }`}
                        >
                          Email Address
                        </label>
                        <input
                          ref={emailRef}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                          style={fontSwitzer}
                          className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Need help */}
                <div className="flex items-center gap-1">
                  <span style={fontSwitzer} className="text-[14px] text-[#333]">Need help?</span>
                  <button
                    onClick={() => router.push("/support")}
                    style={fontSwitzer}
                    className="text-[14px] font-medium text-[#0052b4]"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              disabled={!isValid}
              onClick={() => router.push("/reset-password/new")}
              style={fontSwitzer}
              className={`w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center transition-opacity ${
                !isValid ? "opacity-60 cursor-not-allowed" : "opacity-100"
              }`}
            >
              <span className="text-[16px] font-medium text-white">Send OTP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}