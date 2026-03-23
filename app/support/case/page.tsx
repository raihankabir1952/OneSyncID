"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, Lock, Smartphone, Key, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import SupportIssueItem from "@/components/support/SupportIssueItem";

// Mock data 
const MOCK_USER = {
  name: "John Doe",
  email: "johndoe26@yahoo.com",
  avatarUrl: "https://www.figma.com/api/mcp/asset/4bc12df0-2963-40b0-9546-8d345e93cc99",
  isVerified: true,
};

const MOCK_CASES = [
  {
    id: "OSY6578902",
    title: "Unable to update phone number",
    status: "active",
  },
  {
    id: "OSY6573411",
    title: "Document verification taking too long",
    status: "pending",
  },
];

export default function SupportCasePage() {
  const router = useRouter();

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

          {/* User Info */}
          <div className="flex items-center gap-[10px]">
            <div className="relative shrink-0 size-[40px] rounded-full overflow-hidden">
              <img
                src={MOCK_USER.avatarUrl}
                alt={MOCK_USER.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="flex items-center gap-[8px]">
                <p style={fontSwitzer} className="text-[16px] font-medium text-black tracking-[0.16px]">
                  {MOCK_USER.name}
                </p>
                {MOCK_USER.isVerified && (
                  <CheckCircle2 size={16} className="text-[#025fc9] fill-[#025fc9] stroke-white" />
                )}
              </div>
              <p style={fontSwitzer} className="text-[12px] text-[#5e5757] tracking-[0.12px]">
                {MOCK_USER.email}
              </p>
            </div>
          </div>

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
                    <button
                      className="flex gap-[6px] items-center"
                      onClick={() => router.push("/support/chat")}
                    >
                      <span style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9]">
                        Start Chatting
                      </span>
                      <ArrowRight size={18} className="text-[#025fc9]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Cases */}
          <div className="flex flex-col gap-[10px]">
            <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">
              YOUR CASES
            </p>
            <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
              {MOCK_CASES.map((caseItem, index) => (
                <button
                  key={caseItem.id}
                  onClick={() => router.push(`/support/case/${caseItem.id}`)} // ← এটাই change হয়েছে
                  className={`flex items-center px-4 py-5 w-full text-left ${
                    index < MOCK_CASES.length - 1 ? "border-b border-[#d9d9d9]" : ""
                  }`}
                >
                  <div className="flex flex-1 gap-[8px] items-start">
                    {/* Status dot */}
                    <div
                      className={`shrink-0 size-[16px] rounded-full mt-[2px] ${
                        caseItem.status === "active"
                          ? "bg-[#11a75c]"
                          : "bg-[#c4860a]"
                      }`}
                    />
                    <div className="flex flex-col gap-[3px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] text-[#5e5757] leading-[18px] tracking-[0.16px]">
                        Case ID: {caseItem.id}
                      </p>
                      <p style={fontSwitzer} className="text-[16px] font-medium text-black leading-[21px] tracking-[0.16px]">
                        {caseItem.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}