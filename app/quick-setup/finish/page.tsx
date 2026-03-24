"use client";

import { useRouter } from "next/navigation";
import { Menu, Bell, Mail, Search, Info, AlertCircle } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const onesyncLogo = "https://www.figma.com/api/mcp/asset/8d9e9d5f-2895-4e90-bea6-722fb1bac7f1";
const editIcon = "https://www.figma.com/api/mcp/asset/120b38dd-5134-4552-91a8-7e6c526c8a6d";

const extractedData = [
  { label: "NAME", value: "John Doe", pending: true },
  { label: "DATE OF BIRTH", value: "12 April 2000", pending: false },
  { label: "FATHER'S NAME", value: "Jack Doe", pending: false },
  { label: "MOTHER'S NAME", value: "Jane Doe", pending: false },
];

export default function FinishSetupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Navbar */}
        <div className="flex items-center justify-between px-5 py-[15px] bg-white">
          <div className="flex items-center gap-5">
            <button><Menu size={24} className="text-[#5e5757]" /></button>
            <img src={onesyncLogo} alt="OneSyncID" className="h-5 w-[116px] object-contain" />
          </div>
          <div className="flex items-center gap-5">
            <Bell size={24} className="text-[#5e5757]" />
            <Mail size={24} className="text-[#5e5757]" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-[10px] h-[44px] px-5 border border-[#9fbfe4] rounded-[28px] bg-white">
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={fontSwitzer} className="text-[16px] text-[#5e5757] tracking-[0.5px]">Search</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[30px] px-5 pt-5 pb-8">

          {/* Title */}
          <div className="flex items-center gap-[5px]">
            <h1 style={fontSwitzer} className="text-[20px] font-semibold text-black tracking-[0.8px]">
              Quick Setup
            </h1>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          <div className="flex flex-col gap-[30px]">
            <p style={fontSwitzer} className="text-[16px] text-black tracking-[0.16px]">
              We've extracted details from your uploaded documents. You can always edit these later in their respective sections.
            </p>

            <div className="flex flex-col gap-[30px]">
              <p style={fontSwitzer} className="text-[12px] text-[#5e5757] tracking-[0.12px]">
                Corrections may be submitted for evaluation.
              </p>

              {/* Info Card */}
              <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between pt-5 px-4 pb-2">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-black tracking-[0.16px]">
                    Extracted Information
                  </p>
                  <button onClick={() => router.push("/quick-setup/edit")}>
                    <img src={editIcon} alt="edit" className="w-6 h-6" />
                  </button>
                </div>

                {extractedData.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center px-4 py-5 ${
                      index < extractedData.length - 1 ? "border-b border-[#d9d9d9]" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#a09898] tracking-[0.16px]">
                        {item.label}
                      </p>
                      <div className="flex items-center justify-between">
                        <p style={fontSwitzer} className="text-[16px] text-[#333] tracking-[0.16px]">
                          {item.value}
                        </p>
                        {item.pending && (
                          <div className="flex items-center gap-[5px] bg-[rgba(255,244,229,0.71)] border border-[#fde3e0] rounded-[8px] px-[10px] py-[3px]">
                            <span style={fontSwitzer} className="text-[12px] font-medium text-[#996500] tracking-[0.12px]">
                              Pending
                            </span>
                            <AlertCircle size={14} className="text-[#996500]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-5 items-center">
            <button
              onClick={() => router.back()}
              style={fontSwitzer}
              className="h-[44px] w-[90px] border border-[#5e5757] rounded-[12px] flex items-center justify-center shrink-0"
            >
              <span className="text-[16px] text-[#5e5757] tracking-[0.16px]">Back</span>
            </button>
            <button
              onClick={() => router.push("/passkey/not-found")}
              style={fontSwitzer}
              className="flex-1 h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-white tracking-[0.16px]">Finish Setup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
