"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function NoAccountContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-center justify-center px-5 pt-6 pb-2 shrink-0">
          <div className="flex h-6 items-center w-full" />
          <h1
            style={fontSwitzer}
            className="text-[20px] font-semibold text-black"
          >
            We didn't find any account
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[30px] items-start px-5 pt-[50px]">

          {/* Text */}
          <div className="flex flex-col gap-[10px] items-start w-full">
            <p style={fontSwitzer} className="text-[16px] text-[#333] leading-normal">
              We've received your feedback.
            </p>
            <p style={fontSwitzer} className="text-[16px] text-[#333] leading-normal">
              You can use our AI powered Smart Support or contact our team
              directly. No account needed.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 items-center w-full">
            {/* Primary: Smart Support */}
            <button
              onClick={() => router.push("/support/chat")}
              className="flex-1 h-11 bg-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span
                style={fontSwitzer}
                className="text-[16px] font-medium text-white"
              >
                Smart Support
              </span>
            </button>

            {/* Secondary: Agent Support */}
            <button
              onClick={() => router.push("/support/agent")}
              className="flex-1 h-11 border-[1.5px] border-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span
                style={fontSwitzer}
                className="text-[16px] font-medium text-[#025fc9]"
              >
                Agent Support
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
