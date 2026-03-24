"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, Mail, Search, Info } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const onesyncLogo = "https://www.figma.com/api/mcp/asset/c836c861-5465-491f-98fd-7f5f8b4be9a6";
const documentIcon = "https://www.figma.com/api/mcp/asset/63acb2f3-9a4d-4ace-a79b-c96264fbc21b";

export default function QuickSetupUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    router.push("/quick-setup/preview");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

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

          {/* Upload Section */}
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-2 items-center">
              <p style={fontSwitzer} className="text-[16px] font-medium text-black text-center tracking-[0.16px]">
                Upload a valid identity document
              </p>
              <p style={fontSwitzer} className="text-[12px] text-[#5e5757] text-center tracking-[0.12px]">
                Suggested documents:{" "}
                <span className="font-medium">NID Card, birth certificate, or passport.</span>
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col gap-5 items-center py-[30px] rounded-[12px] border border-dashed border-[#002d94] transition-colors ${
                isDragging ? "bg-[rgba(2,95,201,0.05)]" : "bg-[rgba(2,95,201,0.02)]"
              }`}
            >
              <img src={documentIcon} alt="Document" className="w-[50px] h-[50px] object-contain" />

              <div className="flex flex-col gap-2 items-center w-full">
                <p style={fontSwitzer} className="text-[16px] font-medium text-black text-center tracking-[0.16px] w-full">
                  Upload your file here
                </p>
                <p style={fontSwitzer} className="text-[12px] text-[#5e5757] text-center tracking-[0.12px]">
                  Accepted Formats: PDF, JPG, PNG &nbsp; (Max 5 MB per file)
                </p>
                <p style={fontSwitzer} className="text-[16px] font-medium text-black text-center tracking-[0.16px]">
                  or
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                style={fontSwitzer}
                className="h-[40px] px-[10px] bg-[#025fc9] rounded-[8px] flex items-center justify-center w-[111px]"
              >
                <span className="text-[16px] font-medium text-white tracking-[0.16px]">Browse files</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}