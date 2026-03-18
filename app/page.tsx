"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/get-started");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    // Outer wrapper — gray background, centers the card
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/* Phone card — max 393px wide, white background */}
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Status Bar */}
        {/* <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
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
        </div> */}

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          {/* Logo */}
          <Image
            src="/images/onesync-logo.png"
            alt="OneSyncID Logo"
            width={261}
            height={45}
            priority
          />

          {/* Tagline */}
          <p
            style={{ fontFamily: "'Switzer', sans-serif" }}
            className="text-[16px] font-medium text-[#0052b4] tracking-[0.16px] text-center"
          >
            {/* Verify Once. Access Everything. */}
          </p>

          {/* Loading Spinner */}
          <div className="mt-4">
            <div className="w-[45px] h-[45px] border-[3px] border-[#0052b4]/20 border-t-[#0052b4] rounded-full animate-spin" />
          </div>
        </div>

      </div>
    </div>
  );
}
