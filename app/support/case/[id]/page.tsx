"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, User, Clock } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const MOCK_CASES: Record<string, {
  id: string;
  title: string;
  description: string;
  status: "submitted" | "in_review" | "decision";
}> = {
  OSY6578902: {
    id: "OSY6578902",
    title: "Unable to update phone number",
    description: "Unable to update phone number. I've tried 3 times but the system is not accepting.",
    status: "in_review",
  },
  OSY6573411: {
    id: "OSY6573411",
    title: "Document verification taking too long",
    description: "My document verification has been pending for over 5 days. No update received.",
    status: "in_review",
  },
};

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const caseData = MOCK_CASES[id];

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col items-center justify-center px-5">
          <p style={fontSwitzer} className="text-[16px] text-[#5e5757]">Case not found.</p>
          <button onClick={() => router.back()} style={fontSwitzer} className="mt-4 text-[#025fc9] text-[14px]">Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-[12px]">
          <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <div className="flex items-center justify-between w-full">
            <p style={fontSwitzer} className="text-[14px] font-medium text-[#025fc9] tracking-[0.14px]">
              CASE ID: {caseData.id}
            </p>
            <div className="bg-[rgba(255,244,229,0.71)] border border-[#fde3e0] px-[10px] py-[3px] rounded-[8px]">
              <p style={fontSwitzer} className="text-[12px] font-medium text-[#996500] tracking-[0.12px]">
                In Review
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[40px] px-5 pt-[20px] pb-10">

          {/* Title & Description */}
          <div className="flex flex-col gap-[10px]">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              Title: {caseData.title}
            </h1>
            <p style={fontSwitzer} className="text-[16px] text-[#5e5757]">
              {caseData.description}
            </p>
          </div>

          {/* Case Progress */}
          <div className="flex flex-col gap-[12px]">
            <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">CASE PROGRESS</p>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-[8px] items-center shrink-0">
                <div className="bg-[#025fc9] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <p style={fontSwitzer} className="text-[12px] text-[#025fc9] font-medium">SUBMITTED</p>
              </div>
              <div className="flex-1 h-[1.5px] bg-[#025fc9] mx-1" />
              <div className="flex flex-col gap-[8px] items-center shrink-0 w-[59px]">
                <div className="bg-[rgba(2,95,201,0.1)] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9]">2</p>
                </div>
                <p style={fontSwitzer} className="text-[12px] text-[#025fc9] text-center">IN REVIEW</p>
              </div>
              <div className="flex-1 h-[1.5px] bg-[#d9d9d9] mx-1" />
              <div className="flex flex-col gap-[8px] items-center shrink-0 w-[59px]">
                <div className="bg-[#d9d9d9] w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-white">3</p>
                </div>
                <p style={fontSwitzer} className="text-[12px] text-[#a09898] text-center">DECISION</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-[12px]">
            <p style={fontSwitzer} className="text-[14px] font-medium text-[#767676] tracking-[0.14px]">TIMELINE</p>
            <div className="flex flex-col gap-[5px]">
              <div className="flex gap-[8px] items-start">
                <div className="shrink-0 w-6 h-6 rounded-full border-2 border-[#025fc9] flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-[#025fc9]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">Case Submitted</p>
                  <p style={fontSwitzer} className="text-[14px] text-[#a09898]">Your case has been submitted successfully</p>
                </div>
              </div>
              <div className="w-[1.5px] h-[30px] bg-[#025fc9] ml-[11px]" />
              <div className="flex gap-[8px] items-start">
                <div className="shrink-0 w-6 h-6 rounded-full border-2 border-[#025fc9] flex items-center justify-center">
                  <User size={13} className="text-[#025fc9]" />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">Agent Assigned</p>
                  <p style={fontSwitzer} className="text-[14px] text-[#a09898]">An agent has been assigned to your case. You'll receive decision within 24 hours.</p>
                </div>
              </div>
              <div className="w-[1.5px] h-[30px] bg-[#d9d9d9] ml-[11px]" />
              <div className="flex gap-[8px] items-center">
                <div className="shrink-0 w-6 h-6 rounded-full border-2 border-[#d9d9d9] flex items-center justify-center">
                  <Clock size={13} className="text-[#a09898]" />
                </div>
                <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757]">Final Decision</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}