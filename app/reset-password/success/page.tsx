"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function ResetPasswordSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
          <span className="text-[17px] font-semibold text-black">9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-[2px] h-[12px]">
              <div className="w-[3px] h-[4px] bg-black rounded-sm" />
              <div className="w-[3px] h-[6px] bg-black rounded-sm" />
              <div className="w-[3px] h-[8px] bg-black rounded-sm" />
              <div className="w-[3px] h-[10px] bg-black rounded-sm" />
            </div>
            <svg width="16" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 18C12.83 18 13.5 18.67 13.5 19.5S12.83 21 12 21 10.5 20.33 10.5 19.5 11.17 18 12 18Z" fill="black" />
              <path d="M12 13C14.21 13 16.21 13.9 17.66 15.34L19.07 13.93C17.24 12.1 14.75 11 12 11S6.76 12.1 4.93 13.93L6.34 15.34C7.79 13.9 9.79 13 12 13Z" fill="black" />
              <path d="M12 8C15.54 8 18.73 9.44 21.04 11.77L22.45 10.36C19.75 7.66 16.06 6 12 6S4.25 7.66 1.55 10.36L2.96 11.77C5.27 9.44 8.46 8 12 8Z" fill="black" />
            </svg>
            <div className="flex items-center">
              <div className="w-[22px] h-[11px] border border-black rounded-[2px] flex items-center px-[1px]">
                <div className="w-full h-[7px] bg-black rounded-[1px]" />
              </div>
              <div className="w-[1px] h-[4px] bg-black ml-[1px]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-[40px] pt-[30px] pb-10">

          {/* Illustration + Text */}
          <div className="flex flex-col gap-[20px] items-center px-5">
            <div className="flex flex-col gap-[20px] items-center w-full">

              {/* Illustration */}
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/reset-password-success.png"
                  alt="Password changed successfully"
                  width={353}
                  height={232}
                  className="w-full h-auto"
                />
              </div>

              {/* Title */}
              <h1
                style={fontSwitzer}
                className="text-[20px] font-semibold text-black text-center w-full leading-normal"
              >
                You&apos;re all set!
                <br />
                Password changed successfully.
              </h1>
            </div>

            {/* Description */}
            <p style={fontSwitzer} className="text-[16px] text-[#333] w-full leading-normal">
              Your password is now updated and secured. Let&apos;s get you back in.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 px-5">
            <button
              onClick={() => router.push("/sign-in")}
              style={fontSwitzer}
              className="w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-white">Sign In Now</span>
            </button>

            <p style={fontSwitzer} className="text-[12px] text-[#0052b4] text-center">
              You&apos;re protected. Enable two-step login for extra peace of mind.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
