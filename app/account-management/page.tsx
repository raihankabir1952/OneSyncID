"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, ChevronDown } from "lucide-react";

const SECURITY_QUESTIONS = [
  "Your first pet's name",
  "Your mother's maiden name",
  "Your childhood nickname",
  "Your first school name",
];

export default function AccountManagementPage() {
  const router = useRouter();
  const [securityQuestionEnabled, setSecurityQuestionEnabled] = useState(true);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryPhone, setRecoveryPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Nav */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} style={{ objectFit: "contain" }} />
          </div>
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
              <Bell size={24} className="text-black" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
              <Mail size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "24px" }}
        >
          {/* Heading */}
          <div className="flex items-center gap-[5px]">
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Account Management
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Account Recovery Options */}
          <div className="flex flex-col gap-[16px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Account Recovery Options
            </span>

            <div
              className="flex flex-col w-full rounded-[12px] p-[16px]"
              style={{ border: "1px solid #d9d9d9", gap: "16px" }}
            >
              {/* Recovery Email */}
              <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  RECOVERY EMAIL ADDRESS
                </span>
                <input
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
                />
              </div>

              {/* Recovery Phone */}
              <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                  RECOVERY PHONE NUMBER
                </span>
                <div className="flex items-center gap-[8px]">
                  <span style={{ fontSize: "16px" }}>🇧🇩</span>
                  <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000" }}>+880</span>
                  <ChevronDown size={14} className="text-[#5e5757]" />
                  <input
                    value={recoveryPhone}
                    onChange={(e) => setRecoveryPhone(e.target.value)}
                    placeholder="Enter your number"
                    style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", flex: 1 }}
                  />
                </div>
              </div>

              {/* Security Question toggle */}
              <div className="flex flex-col gap-[10px] w-full">
                <div className="flex items-center justify-between w-full">
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
                    Security Question
                  </span>
                  <button
                    onClick={() => setSecurityQuestionEnabled(!securityQuestionEnabled)}
                    className="relative inline-flex items-center rounded-full shrink-0"
                    style={{
                      width: "44px", height: "24px",
                      backgroundColor: securityQuestionEnabled ? "#025fc9" : "#d9d9d9",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <span
                      className="inline-block rounded-full bg-white"
                      style={{
                        width: "20px", height: "20px",
                        transform: securityQuestionEnabled ? "translateX(22px)" : "translateX(2px)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                </div>

                <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "18px" }}>
                  Choose a question and answer that only you would know for enhanced account protection if we ever need to verify your identity.
                </p>

                {securityQuestionEnabled && (
                  <>
                    {/* Question */}
                    <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                        QUESTION
                      </span>
                      <div className="relative w-full">
                        <select
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="w-full appearance-none bg-transparent pr-6"
                          style={{ ...fontSwitzer, fontSize: "16px", color: question ? "#000" : "#a09898", border: "none", outline: "none" }}
                        >
                          <option value="" disabled>Your first pet's name</option>
                          {SECURITY_QUESTIONS.map((q) => <option key={q} value={q}>{q}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5e5757] pointer-events-none" />
                      </div>
                    </div>

                    {/* Answer */}
                    <div className="flex flex-col gap-[6px] w-full" style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: "12px" }}>
                      <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#767676", letterSpacing: "0.12px" }}>
                        ANSWER
                      </span>
                      <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter your answer here"
                        style={{ ...fontSwitzer, fontSize: "16px", color: "#000", border: "none", outline: "none", background: "transparent", width: "100%" }}
                      />
                    </div>

                    {/* Cancel + Save */}
                    <div className="flex items-center gap-[12px]">
                      <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center rounded-[8px]"
                        style={{ height: "44px", paddingLeft: "20px", paddingRight: "20px", border: "1px solid #d9d9d9" }}
                      >
                        <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>Cancel</span>
                      </button>
                      <button
                        className="flex items-center justify-center rounded-[8px]"
                        style={{ height: "44px", paddingLeft: "32px", paddingRight: "32px", backgroundColor: "#025fc9" }}
                      >
                        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>Save</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Delegate Access */}
          <div className="flex flex-col gap-[8px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Delegate Access
            </span>
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
              Grant access to your account to trusted users or platforms. Delegates may need OTP or digital signature to perform sensitive actions. You can manage, revoke, or monitor all delegated access here.
            </p>
            <button
              onClick={() => router.push("/account-management/delegate-access")}
              className="flex items-center justify-center rounded-[8px] self-start"
              style={{ height: "40px", paddingLeft: "16px", paddingRight: "16px", border: "1px solid #d9d9d9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>
                Manage Delegate
              </span>
            </button>
          </div>

          {/* Blocked Users / Organizations */}
          <div className="flex flex-col gap-[8px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Blocked Users / Organizations
            </span>
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
              See users/organizations you've blocked. Unblock to restore their ability to interact with you.
            </p>
            <button
              className="flex items-center justify-center rounded-[8px] self-start"
              style={{ height: "40px", paddingLeft: "16px", paddingRight: "16px", border: "1px solid #d9d9d9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>
                See Blocked Users
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}