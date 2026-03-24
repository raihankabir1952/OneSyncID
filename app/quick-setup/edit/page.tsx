"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, Mail, Search, Info } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const onesyncLogo = "https://www.figma.com/api/mcp/asset/b9c7fff5-8a3d-4835-ab9b-0867b04f4295";

const FIELDS = [
  { key: "name", label: "NAME" },
  { key: "dob", label: "DATE OF BIRTH" },
  { key: "fatherName", label: "FATHER'S NAME" },
  { key: "motherName", label: "MOTHER'S NAME" },
];

export default function EditExtractedInfoPage() {
  const router = useRouter();
  const [editData, setEditData] = useState({
    name: "John Doe",
    dob: "12 April 2000",
    fatherName: "Jack Doe",
    motherName: "Jane Doe",
  });

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

              {/* Edit Card */}
              <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">
                <div className="flex items-center pt-5 px-4 pb-2">
                  <p style={fontSwitzer} className="text-[16px] font-medium text-black tracking-[0.16px]">
                    Extracted Information
                  </p>
                </div>

                {FIELDS.map((field, index) => (
                  <div
                    key={field.key}
                    className={`flex items-center px-4 py-5 ${
                      index < FIELDS.length - 1 ? "border-b border-[#d9d9d9]" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-[6px] flex-1">
                      <p style={fontSwitzer} className="text-[16px] font-medium text-[#a09898] tracking-[0.16px]">
                        {field.label}
                      </p>
                      <input
                        type="text"
                        value={editData[field.key as keyof typeof editData]}
                        onChange={(e) =>
                          setEditData({ ...editData, [field.key]: e.target.value })
                        }
                        style={fontSwitzer}
                        className="text-[16px] text-[#333] tracking-[0.16px] bg-transparent outline-none border-none border-b border-[#025fc9] pb-1 w-full"
                      />
                    </div>
                  </div>
                ))}

                {/* Save / Cancel */}
                <div className="flex items-center gap-5 px-4 pt-[10px] pb-5">
                  <button
                    onClick={() => router.push("/quick-setup/finish")}
                    style={fontSwitzer}
                    className="h-[44px] w-[90px] border border-[#025fc9] rounded-[8px] flex items-center justify-center"
                  >
                    <span className="text-[16px] text-[#025fc9] tracking-[0.16px]">Save</span>
                  </button>
                  <button
                    onClick={() => router.back()}
                    style={fontSwitzer}
                    className="h-[44px] flex items-center justify-center"
                  >
                    <span className="text-[16px] text-[#5e5757] tracking-[0.16px]">Cancel</span>
                  </button>
                </div>
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
              onClick={() => router.push("/quick-setup/finish")}
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