"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, Mail, Search, Info, Plus, Pencil, MoreVertical } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const onesyncLogo = "https://www.figma.com/api/mcp/asset/9f99c8a0-6149-4b1e-b9f5-6971ecbb31f6";
const docPreview = "https://www.figma.com/api/mcp/asset/f89f8c6d-2ead-42a2-a175-1fa5f2a31ce7";

const DOC_TYPES = ["Identity", "Work", "Financial", "Educational", "Property", "Medical", "Other"];

type UploadedFile = {
  id: number;
  name: string;
  date: string;
  selectedType: string | null;
};

export default function QuickSetupPreviewPage() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: 1, name: "birthcertificate.pdf", date: "24/10/2025", selectedType: "Identity" },
    { id: 2, name: "birthcertificate.pdf", date: "24/10/2025", selectedType: null },
  ]);

  const selectType = (fileId: number, type: string) => {
    setFiles(files.map(f => f.id === fileId ? { ...f, selectedType: type } : f));
  };

  const allTypesSelected = files.every(f => f.selectedType !== null);

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

          {/* Add More */}
          <div className="flex justify-end">
            <button style={fontSwitzer} className="flex items-center gap-[10px] px-[10px] text-[#5e5757]">
              <Plus size={20} />
              <span className="text-[16px] tracking-[0.16px]">Add More</span>
            </button>
          </div>

          {/* File Cards */}
          <div className="flex flex-col gap-5">
            {files.map((file) => (
              <div key={file.id} className="border border-[#d9d9d9] rounded-[12px] p-5">
                <div className="flex flex-col gap-5">
                  {/* File Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="border border-[#d9d9d9] rounded-[8px] p-[3px] w-[65px] shrink-0">
                        <div className="h-[37px] rounded-[8px] overflow-hidden opacity-70">
                          <img src={docPreview} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <div className="flex items-center gap-2">
                          <span style={fontSwitzer} className="text-[16px] text-black tracking-[0.16px]">
                            {file.name}
                          </span>
                          <Pencil size={16} className="text-[#5e5757]" />
                        </div>
                        <span style={fontSwitzer} className="text-[12px] text-[#5e5757] tracking-[0.12px]">
                          Upload Date: {file.date}
                        </span>
                      </div>
                    </div>
                    <MoreVertical size={24} className="text-[#5e5757] shrink-0" />
                  </div>

                  {/* Document Type */}
                  <div className="flex flex-col gap-2">
                    <p style={fontSwitzer} className="text-[12px] text-[#a09898] tracking-[0.12px]">
                      Select document type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DOC_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => selectType(file.id, type)}
                          style={fontSwitzer}
                          className={`px-2 py-[3px] rounded-[8px] border text-[14px] font-medium tracking-[0.14px] transition-all ${
                            file.selectedType === type
                              ? "border-[#025fc9] bg-[rgba(2,95,201,0.1)] text-[#025fc9]"
                              : "border-[#d9d9d9] bg-white text-[#5e5757]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            disabled={!allTypesSelected}
            onClick={() => router.push("/quick-setup/extracted")}
            style={fontSwitzer}
            className={`w-full h-[44px] bg-[#025fc9] rounded-[8px] flex items-center justify-center transition-opacity ${
              !allTypesSelected ? "opacity-60 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <span className="text-[16px] font-medium text-white tracking-[0.16px]">Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}