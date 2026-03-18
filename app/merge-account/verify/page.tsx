"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Link2 } from "lucide-react";

interface AccountCardProps {
  email: string;
  badge: "Existing" | "New";
}

function AccountCard({ email, badge }: AccountCardProps) {
  return (
    <div className="border border-[#d9d9d9] rounded-xl p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#d9d9d9] shrink-0" />
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#333] tracking-[0.16px]">
          {email}
        </p>
      </div>
      <div className="bg-[rgba(2,95,201,0.1)] rounded-xl px-2 py-[3px]">
        <p style={fontSwitzer} className="text-[12px] font-medium text-[#025fc9] tracking-[0.12px]">
          {badge}
        </p>
      </div>
    </div>
  );
}

export default function MergeVerifyPage() {
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
        <div className="flex-1 flex flex-col gap-[50px] pt-[30px] pb-10">

          {/* Title */}
          <div className="flex justify-center px-5">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black">
              2 accounts merged
            </h1>
          </div>

          <div className="flex flex-col gap-[30px] px-5">

            {/* Accounts Preview */}
            <div className="flex flex-col items-center w-full">
              <AccountCard email="johndoe9@gmail.com" badge="Existing" />
              <div className="flex flex-col items-center py-1">
                <div className="w-px h-5 bg-[#d9d9d9]" />
                <div className="w-10 h-10 rounded-full bg-[rgba(2,95,201,0.1)] flex items-center justify-center">
                  <Link2 size={20} className="text-[#025fc9]" />
                </div>
                <div className="w-px h-5 bg-[#d9d9d9]" />
              </div>
              <AccountCard email="johndoe@yahoo.com" badge="New" />
            </div>

            {/* Info text */}
            <p style={fontSwitzer} className="text-[14px] text-[#5e5757] tracking-[0.14px]">
              Your documents, history & preferences from the existing account will carry over.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/merge-account/success")}
                style={fontSwitzer}
                className="w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-white">Confirm Merge</span>
              </button>

              <button
                onClick={() => router.push("/merge-account/cancelled")}
                style={fontSwitzer}
                className="w-full h-11 border-[1.5px] border-[#025fc9] rounded-lg flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-[#025fc9]">Undo & Disconnect</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}