"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import AccountTypeToggle from "@/components/create-account/AccountTypeToggle";

type AccountType = "personal" | "organization";

export default function CreateAccountPage() {
  const [accountType, setAccountType] = useState<AccountType>("organization");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex flex-col gap-[10px]">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <div className="flex flex-col items-center gap-[10px]">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              Create your OneSyncID
            </h1>
            <p style={fontSwitzer} className="text-[14px] text-[#a09898]">
              Already have an account?{" "}
              <Link href="/merge-account" className="text-[#025fc9]">
                Merge now
              </Link>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-[50px] px-5 pt-[50px] pb-8">

          <div className="flex flex-col gap-[20px]">

            {/* Section Label */}
            <p style={fontSwitzer} className="text-[14px] text-[#767676] font-medium">
              ACCOUNT TYPE
            </p>

            {/* Toggle */}
            <AccountTypeToggle
              activeType={accountType}
              onTypeChange={(type) => {
                if (type === "personal") {
                  router.push("/create-account/personal");
                } else {
                  setAccountType("organization");
                }
              }}
            />

            {/* Organization Message + Illustration */}
            {accountType === "organization" && (
              <div className="flex flex-col gap-[12px]">
                <p
                  style={fontSwitzer}
                  className="text-[16px] text-[#333] tracking-[0.16px] text-justify"
                >
                  Want to register your Brand, Business, Education, or NGO/Government?
                </p>
                <Link
                  href="/create-account/personal"
                  style={fontSwitzer}
                  className="text-[16px] text-[#0052b4] text-justify"
                >
                  Please create a personal account first to proceed.
                </Link>

                {/* AI Screen Illustration */}
                <div className="relative h-[232px] w-full overflow-hidden rounded-[12px]">
                  <Image
                    src="/images/ai-screen.png"
                    alt="AI Screen illustration"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            )}
          </div>

          {/* Merge accounts banner */}
          <div className="flex items-start gap-[3px] bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-[12px] px-[16px] py-[10px]">
            <Info size={16} className="text-[#025fc9] shrink-0 mt-0.5" />
            <div
              style={fontSwitzer}
              className="text-[12px] text-[#025fc9] leading-4 tracking-[0.12px] flex-1"
            >
              <p>Already have an account with another email?</p>
              <Link href="/merge-account">
                <p className="font-semibold">Merge accounts</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}