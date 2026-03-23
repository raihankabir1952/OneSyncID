// app/support/what-is-onesyncid/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const STEPS = [
  {
    number: 1,
    title: "Check your welcome email",
    description: `When you first registered, a welcome email was sent containing your OneSyncID username. Search your inbox for "OneSync" or "OSY-".`,
  },
  {
    number: 2,
    title: "Recognize the format",
    description: `When you first registered, a welcome email was sent containing your username. Search your inbox for "OneSync" or "OSY-".`,
  },
  {
    number: 3,
    title: "Find it inside the app",
    description: "Once signed in, go to Profile → Account Details. Your OneSyncID username is displayed at the top.",
  },
  {
    number: 4,
    title: "Still can't find it?",
    description: "Contact support with your registered phone number or email. We'll verify your identity and recover your OneSyncID account.",
  },
];

export default function WhatIsOneSyncIdPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-3">
          <button onClick={() => router.back()} className="w-6 h-6 flex items-center justify-center">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <p style={fontSwitzer} className="text-[14px] font-medium text-[#025fc9]">
            FINDING YOUR ID
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[40px] px-5 pt-5 pb-[50px]">

          {/* Title + Description */}
          <div className="flex flex-col gap-3">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              What is my OneSyncID
            </h1>
            <p style={fontSwitzer} className="text-[16px] text-[#5e5757] leading-normal">
              Your OneSyncID username is a unique identifier that links your account across all government and connected services.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-[10px] items-start">
                {/* Number badge */}
                <div className="bg-[rgba(2,95,201,0.1)] flex items-center justify-center rounded-[10px] shrink-0 size-5">
                  <span style={fontSwitzer} className="text-[14px] text-[#025fc9]">
                    {step.number}
                  </span>
                </div>
                {/* Text */}
                <div className="flex flex-col gap-[2px] flex-1">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-black leading-normal">
                    {step.title}
                  </p>
                  <p style={fontSwitzer} className="text-[14px] text-[#5e5757] leading-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}