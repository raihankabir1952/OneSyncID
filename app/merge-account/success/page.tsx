"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Mail } from "lucide-react";

export default function MergeSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Content */}
        <div className="flex flex-col gap-[40px] items-center w-full pt-[80px]">

          {/* Top section */}
          <div className="flex flex-col gap-[20px] items-center px-[20px] w-full">

            <div className="flex flex-col gap-[20px] items-center w-full">
              {/* Illustration */}
              <div className="flex flex-col gap-[10px] items-center w-full">
                <div className="h-[24px] w-full shrink-0" />
                <Image
                  src="/images/merge-success.png"
                  alt="Merge successful"
                  width={353}
                  height={232}
                  className="w-full h-auto"
                />
              </div>

              {/* Title */}
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center w-full">
                Account merging successful!
              </h1>
            </div>

            {/* Description */}
            <p style={fontSwitzer} className="text-[16px] text-[#333] w-full">
              Both email addresses now sign in to the same account. Your documents and history are intact.
            </p>

            {/* Email badges */}
            <div className="flex flex-col gap-[12px] w-full">
              {["johndoe@gmail.com", "johndoe24@yahoo.com"].map((email) => (
                <div
                  key={email}
                  className="bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-[12px] px-[16px] py-[10px] flex items-center gap-[10px]"
                >
                  <Mail size={20} className="text-[#025fc9] shrink-0" />
                  <p style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9] leading-[21px] tracking-[0.16px]">
                    {email}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Button */}
          <div className="px-[20px] w-full">
            <button
              onClick={() => router.push("/get-started")}
              style={fontSwitzer}
              className="w-full h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-white">Sign In Now</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}