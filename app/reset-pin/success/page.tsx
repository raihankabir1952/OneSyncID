"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { fontSwitzer } from "@/lib/styles";

export default function PinResetSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto">

          {/* Top spacer (no back button on success screen per Figma) */}
          <div className="h-[80px]" />

          {/* Body */}
          <div className="flex flex-col gap-[40px] px-5 pb-10">

            {/* Illustration */}
            <div className="w-full rounded-[12px] overflow-hidden h-[232px] relative">
              <Image
                src="/images/pin-success.png"
                alt="PIN changed successfully"
                fill
                className="object-cover"
              />
            </div>

            {/* Title + Description */}
            <div className="flex flex-col gap-[20px]">
              <h2
                style={fontSwitzer}
                className="text-[20px] font-semibold text-black text-center leading-[1.4] whitespace-pre-line"
              >
                {"You're all set!\nPIN changed successfully."}
              </h2>
              <p style={fontSwitzer} className="text-[16px] text-[#333]">
                Your PIN is now updated and secured. Let's get you back in.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-[12px] items-center">
              <button
                onClick={() => router.push("/sign-in")}
                style={fontSwitzer}
                className="w-full h-11 bg-[#025fc9] rounded-[8px] flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-white">Sign In Now</span>
              </button>
              <p style={fontSwitzer} className="text-[12px] text-[#0052b4] text-center">
                You're protected. Enable two-step login for extra peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}