"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { fontSwitzer } from "@/lib/styles";

type ContactTab = "phone" | "email";

export default function ResetPinPage() {
  const router = useRouter();

  const [tab, setTab] = useState<ContactTab>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const isValid =
    tab === "phone" ? phone.trim().length >= 6 : email.trim().length > 3;

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
                Reset your PIN
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[40px] px-5 pt-[30px] pb-10">

            {/* Illustration */}
            <div className="w-full rounded-[12px] overflow-hidden h-[232px] relative">
              <Image
                src="/images/reset-password.png"
                alt="Reset PIN illustration"
                fill
                className="object-cover"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-[20px]">
              <p style={fontSwitzer} className="text-[16px] text-[#333]">
                Type your registered phone or email to reset your PIN.
              </p>

              {/* Phone / Email Tab */}
              <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden bg-white">
                <div className="flex items-center justify-between px-[16px] py-[8px] gap-2">
                  <button
                    onClick={() => setTab("phone")}
                    style={fontSwitzer}
                    className={`flex-1 flex items-center justify-center gap-2 h-[37px] rounded-[8px] text-[16px] font-medium transition-all border ${
                      tab === "phone"
                        ? "border-[#025fc9] text-[#025fc9] border-b-2"
                        : "border-transparent text-[#5e5757]"
                    }`}
                  >
                    <Phone size={18} />
                    Phone
                  </button>
                  <button
                    onClick={() => setTab("email")}
                    style={fontSwitzer}
                    className={`flex-1 flex items-center justify-center gap-2 h-[37px] rounded-[8px] text-[16px] font-medium transition-all border ${
                      tab === "email"
                        ? "border-[#025fc9] text-[#025fc9] border-b-2"
                        : "border-transparent text-[#5e5757]"
                    }`}
                  >
                    <Mail size={18} />
                    Email
                  </button>
                </div>

                {/* Input */}
                <div className="px-4 pb-4">
                  {tab === "phone" ? (
                    <div className="flex flex-col gap-[10px]">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
                        PHONE NUMBER
                      </p>
                      <div className="flex items-center gap-3 border-b border-[#d9d9d9] py-[10px]">
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Bangladesh flag emoji fallback */}
                          <span className="text-[18px]">🇧🇩</span>
                          <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">+880</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#5e5757]">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="Enter your number"
                          style={fontSwitzer}
                          className="flex-1 text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[10px]">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px]">
                        EMAIL ADDRESS
                      </p>
                      <div className="border-b border-[#d9d9d9] py-[10px]">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={fontSwitzer}
                          className="w-full text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Need Help */}
              <div className="flex items-center gap-1">
                <span style={fontSwitzer} className="text-[14px] text-[#333]">Need help?</span>
                <button style={fontSwitzer} className="text-[14px] text-[#0052b4] font-medium">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              disabled={!isValid}
              onClick={() => router.push("/reset-pin/create")}
              style={fontSwitzer}
              className={`w-full h-11 bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
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