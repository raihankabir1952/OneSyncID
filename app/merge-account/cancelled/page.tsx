"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function MergeCancelledPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Content — top-[80px] matching Figma */}
        <div className="flex flex-col gap-[40px] items-center pt-[80px]">

          <div className="flex flex-col gap-[20px] items-center px-5 w-full">

            <div className="flex flex-col gap-[20px] items-center w-full">
              {/* Empty space above illustration */}
              <div className="flex flex-col gap-[10px] items-center w-full">
                <div className="h-[24px] w-full" />
                {/* Illustration */}
                <Image
                  src="/images/merge-cancelled.png"
                  alt="Merge cancelled"
                  width={353}
                  height={232}
                  className="w-full h-auto"
                />
              </div>

              {/* Title */}
              <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center w-full">
                Merge cancelled
              </h1>
            </div>

            {/* Description */}
            <p style={fontSwitzer} className="text-[16px] text-[#5e5757] tracking-[0.16px] w-full">
              No changes were made. Your accounts remain separate and independent.
            </p>

          </div>

          {/* Button */}
          <div className="px-5 w-full">
            <button
              onClick={() => router.push("/create-account/personal")}
              style={fontSwitzer}
              className="w-full h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-white">Continue to Account Creation</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}