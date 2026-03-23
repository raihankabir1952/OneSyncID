"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, Lock, Smartphone, Key, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import SupportIssueItem from "@/components/support/SupportIssueItem";
import PhoneEmailToggle from "@/components/support/PhoneEmailToggle";
import PhoneInputField from "@/components/support/PhoneInputField";
import EmailInputField from "@/components/support/EmailInputField";

type VerifyMethod = "phone" | "email";

export default function SupportPage() {
  const router = useRouter();
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const isDisabled = verifyMethod === "phone" ? !phoneNumber.trim() : !email.trim();

  const handleSendOtp = () => {
    if (isDisabled) return;
    const contact = verifyMethod === "phone" ? phoneNumber : email;
    router.push(`/support/otp?phone=${encodeURIComponent(contact)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
          <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <div className="flex items-center justify-center w-full">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              OneSyncID Support
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[30px] flex-1 px-5 pt-[50px] pb-[50px]">

          {/* Common Issues */}
          <div className="flex flex-col gap-[10px]">
            <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
              COMMON ISSUES
            </p>
            <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
              <SupportIssueItem
                icon={<HelpCircle size={14} className="text-[#025fc9]" />}
                title="What is my OneSyncID?"
                subtitle="Learn how to find your unique identifier"
                onClick={() => router.push("/support/what-is-onesyncid")}
              />
              <SupportIssueItem
                icon={<Lock size={14} className="text-[#025fc9]" />}
                title="Account locked or blocked"
                subtitle="Regain access after failed attempts"
              />
              <SupportIssueItem
                icon={<Smartphone size={14} className="text-[#025fc9]" />}
                title="Didn't receive OTP code"
                subtitle="Troubleshoot email and SMS delivery"
              />
              <SupportIssueItem
                icon={<Key size={14} className="text-[#025fc9] rotate-180" />}
                title="Passkey not working"
                subtitle="Reset or re-register your passkey"
                showBorder={false}
              />
            </div>
          </div>

          {/* Smart Support */}
          <div className="flex flex-col gap-[10px]">
            <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
              SMART SUPPORT
            </p>
            <div className="bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-[12px] overflow-hidden">
              <div className="flex items-start px-4 py-5">
                <div className="flex flex-1 gap-2 items-start">
                  <div className="bg-[rgba(2,95,201,0.1)] flex items-center justify-center rounded-[8px] shrink-0 size-6">
                    <MessageSquare size={14} className="text-[#025fc9]" />
                  </div>
                  <div className="flex flex-col gap-[10px] flex-1">
                    <div className="flex flex-col gap-[3px]">
                      <p style={fontSwitzer} className="text-[18px] font-semibold text-black tracking-[0.18px] leading-[21px]">
                        Describe your issue
                      </p>
                      <p style={fontSwitzer} className="text-[14px] text-[#5e5757] tracking-[0.14px] leading-[21px]">
                        Get instant answers or connect with a human agent
                      </p>
                    </div>
                    <button className="flex gap-[6px] items-center" onClick={() => router.push("/support/chat")}>
                      <span style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9]">Start Chatting</span>
                      <ArrowRight size={18} className="text-[#025fc9]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verify Section */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
                VERIFY TO START TRACKING YOUR CASE
              </p>
              <div className="flex flex-col gap-[10px]">
                <PhoneEmailToggle activeMethod={verifyMethod} onMethodChange={setVerifyMethod} />
                {verifyMethod === "phone" ? (
                  <PhoneInputField value={phoneNumber} onChange={setPhoneNumber} />
                ) : (
                  <EmailInputField value={email} onChange={setEmail} />
                )}
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOtp}
              disabled={isDisabled}
              className={`h-[44px] rounded-[8px] w-full flex items-center justify-center transition-opacity ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
              } bg-[#025fc9]`}
            >
              <span style={fontSwitzer} className="text-[16px] font-medium text-white">Send OTP</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="border border-[#d9d9d9] flex gap-[6px] items-start px-4 py-[10px] rounded-[12px] w-full">
            <ShieldCheck size={14} className="text-[#a09898] shrink-0 mt-[1px]" />
            <p style={fontSwitzer} className="text-[12px] text-[#a09898] tracking-[0.12px] leading-[14px] flex-1">
              Support staff will n
              <span className="text-[#5e5757]">ever ask for your password or full OTP. </span>
              End the conversation and report it if they do.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}