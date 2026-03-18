"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Smartphone } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type LogoutDays = 30 | 60 | 90 | null;

export default function TrustDevicePage() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<LogoutDays>(null);

  const handleTrust = () => {
    router.push("/dashboard");
  };

  const handleDontTrust = () => {
    router.push("/dashboard");
  };

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
        <div className="flex-1 flex flex-col gap-[50px] pt-[30px] pb-10">

          {/* Title */}
          <div className="flex justify-center px-5">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black text-center">
              Do you trust this device?
            </h1>
          </div>

          <div className="flex flex-col gap-[40px] px-5">

            {/* Description + Device card */}
            <div className="flex flex-col gap-[20px]">
              <p style={fontSwitzer} className="text-[16px] text-[#333]">
                Trusted devices skip verification on future sign-ins. Only trust devices you own and regularly use.
              </p>

              {/* Device Card */}
              <div className="border border-[#d9d9d9] rounded-xl px-5 py-2 flex items-center gap-[10px] bg-white">
                <div className="bg-[rgba(2,95,201,0.1)] p-2 rounded-lg shrink-0">
                  <Smartphone size={20} className="text-[#025fc9]" />
                </div>
                <div className="flex flex-col">
                  <p style={fontSwitzer} className="text-[14px] font-medium text-[#333] leading-[21px] tracking-[0.14px]">
                    iPhone 15 Pro
                  </p>
                  <p style={fontSwitzer} className="text-[12px] text-[#5e5757] leading-[21px] tracking-[0.12px]">
                    Dhaka, Bangladesh · Just now
                  </p>
                </div>
              </div>
            </div>

            {/* Auto logout options */}
            <div className="flex flex-col gap-2">
              <p style={fontSwitzer} className="text-[14px] text-[#333]">
                Automatically logout this device after
              </p>
              <div className="flex items-center gap-0">
                {([30, 60, 90] as const).map((days, i) => (
                  <button
                    key={days}
                    onClick={() => setSelectedDays(days === selectedDays ? null : days)}
                    className={`flex items-center gap-2 ${i > 0 ? "px-2" : "pr-2"}`}
                  >
                    <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                      selectedDays === days
                        ? "bg-[#025fc9] border-[#025fc9]"
                        : "border-[#333]"
                    }`}>
                      {selectedDays === days && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={fontSwitzer} className="text-[14px] text-[#333]">
                      {days} Days
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Warning + Buttons */}
            <div className="flex flex-col gap-[20px]">
              <p style={fontSwitzer} className="text-[14px] text-[#5e5757]">
                Choosing &quot;Don&apos;t Trust&quot; means you&apos;ll need to verify with OTP every time you sign in on this device.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleTrust}
                  style={fontSwitzer}
                  className="w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center"
                >
                  <span className="text-[16px] font-medium text-white">Yes, Trust This Device</span>
                </button>

                <button
                  onClick={handleDontTrust}
                  style={fontSwitzer}
                  className="w-full h-11 border-[1.5px] border-[#d9d9d9] rounded-lg flex items-center justify-center"
                >
                  <span className="text-[16px] font-medium text-[#5e5757]">Don&apos;t Trust</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}