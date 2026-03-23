"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const ISSUES = [
  "I've never had an account before",
  "I may have registered under a different contact",
  "My account was locked/banned",
];

export default function NoAccountPage() {
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
              We didn't find any account
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[30px] px-5 pt-[50px] pb-[50px]">
          <p style={fontSwitzer} className="text-[16px] text-[#333] leading-normal">
            Answers this questions below to help us identify the issue.
          </p>

          <div className="flex flex-col gap-3">
            {ISSUES.map((issue) => (
              <button
                key={issue}
                onClick={() => router.push("/support/no-account/contact")}
                className="border border-[#d9d9d9] rounded-[12px] px-4 py-[10px] w-full flex items-center justify-center"
              >
                <p style={fontSwitzer} className="text-[14px] font-medium text-[#333] tracking-[0.14px] text-center">
                  {issue}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}