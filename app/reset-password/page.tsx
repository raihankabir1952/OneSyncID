"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, ChevronDown } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type ContactTab = "phone" | "email";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [tab, setTab] = useState<ContactTab>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const isValid = tab === "phone" ? phone.length >= 10 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

        {/* Scrollable Content */}
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
                <div className="border border-[#d9d9d9] rounded-xl px-4 py-5">
                  {tab === "phone" ? (
                    <div className="flex items-center gap-3">
                      {/* BD Flag */}
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="w-[30px] h-[20px] rounded-[2px] overflow-hidden border border-[#eee] shrink-0">
                          <div className="w-full h-full bg-[#006A4E] flex items-center justify-center">
                            <div className="w-[11px] h-[11px] rounded-full bg-[#F42A41] ml-[2px]" />
                          </div>
                        </div>
                        <span style={fontSwitzer} className="text-[16px] text-[#5e5757]">+880</span>
                        <ChevronDown size={16} className="text-[#5e5757]" />
                      </div>
                      <div className="w-px h-[48px] bg-[#d9d9d9] shrink-0" />
                      <div style={fontSwitzer} className="flex flex-col gap-[6px] flex-1">
                        <p className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">PHONE NUMBER</p>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="Enter your phone number"
                          className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
                          style={fontSwitzer}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Mail size={20} className="text-[#5e5757] shrink-0 mt-[2px]" />
                      <div style={fontSwitzer} className="flex flex-col gap-[6px] flex-1">
                        <p className="text-[16px] font-medium text-[#5e5757] leading-[21px] tracking-[0.16px]">EMAIL ADDRESS</p>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="text-[16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
                          style={fontSwitzer}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Need help */}
                <div className="flex items-center gap-1">
                  <span style={fontSwitzer} className="text-[14px] text-[#333]">Need help?</span>
                  <button style={fontSwitzer} className="text-[14px] font-medium text-[#0052b4]">
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
