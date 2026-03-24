"use client";

import { useState } from "react";
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

            {/* Toggle — Personal বাটনটা আসলে একটা Link */}
            <div className="bg-[#f5f5f5] border border-[#d9d9d9] rounded-[12px] px-[10px] py-[8px] flex gap-1">

              {/* ✅ Personal = Link, instant navigation */}
              <Link
                href="/create-account/personal"
                style={fontSwitzer}
                className={`flex-1 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] text-center transition-all ${
                  accountType === "personal"
                    ? "bg-white border border-[#025fc9] text-[#025fc9]"
                    : "text-[#a09898] border border-transparent"
                }`}
              >
                Personal
              </Link>

              {/* Organization = button, state change করে */}
              <button
                type="button"
                onClick={() => setAccountType("organization")}
                style={fontSwitzer}
                className={`flex-1 py-[8px] rounded-[8px] text-[16px] font-medium tracking-[0.16px] transition-all ${
                  accountType === "organization"
                    ? "bg-white border border-[#025fc9] text-[#025fc9]"
                    : "text-[#a09898] border border-transparent"
                }`}
              >
                Organization
              </button>
            </div>

            {/* Organization Message */}
            {accountType === "organization" && (
              <div className="flex flex-col gap-[12px]">
                <p
                  style={fontSwitzer}
                  className="text-[16px] text-[#333] tracking-[0.16px] text-justify"
                >
                  Want to register your Brand, Business, Education, or NGO/Government?
                </p>
                <p
                  style={fontSwitzer}
                  className="text-[16px] text-[#0052b4] text-justify"
                >
                  Please create a personal account first to proceed.
                </p>
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