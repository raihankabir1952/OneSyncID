"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Plus, Pencil, MoreVertical, Scan } from "lucide-react";

const DOC_TYPES = ["Identity", "Work", "Financial", "Educational", "Property", "Medical", "Other"] as const;
type DocType = typeof DOC_TYPES[number];

interface DocumentCardProps {
  filename: string;
  uploadDate: string;
  selectedType: DocType;
  onTypeChange: (t: DocType) => void;
  thumbnail?: string;
}

function DocumentCard({ filename, uploadDate, selectedType, onTypeChange, thumbnail }: DocumentCardProps) {
  return (
    <div className="flex flex-col gap-[10px]">

      {/* DOCUMENT DETAILS label */}
      <p
        style={{ fontFamily: "SF Pro Text, sans-serif", fontSize: "14px", fontWeight: 500, color: "#767676", letterSpacing: "0.14px", paddingTop: "10px" }}
      >
        DOCUMENT DETAILS
      </p>

      {/* Card */}
      <div
        className="flex flex-col gap-[20px] p-[20px] rounded-[12px] w-full"
        style={{ border: "1px solid #d9d9d9" }}
      >
        {/* File row */}
        <div className="flex items-start justify-between w-full" style={{ height: "44px" }}>
          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            <div
              className="rounded-[8px] overflow-hidden shrink-0"
              style={{ width: "65px", height: "43px", border: "1px solid #d9d9d9", padding: "3px" }}
            >
              {thumbnail ? (
                <img src={thumbnail} alt="doc" className="w-full h-full object-cover rounded-[6px] opacity-70" />
              ) : (
                <div className="w-full h-full bg-[#f5f5f5] rounded-[6px] opacity-70" />
              )}
            </div>

            {/* Name + date */}
            <div className="flex flex-col gap-[5px]" style={{ width: "163px" }}>
              <div className="flex items-center justify-between w-full">
                <span style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px" }}>
                  {filename}
                </span>
                <Pencil size={20} className="text-[#5e5757] shrink-0" />
              </div>
              <span style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                Upload Date: {uploadDate}
              </span>
            </div>
          </div>

          {/* More options */}
          <MoreVertical size={24} className="text-[#5e5757] shrink-0" />
        </div>

        {/* Document type selector */}
        <div className="flex flex-col gap-2 w-full">
          <p style={{ ...fontSwitzer, fontSize: "12px", color: "#a09898", letterSpacing: "0.12px", lineHeight: "21px" }}>
            Select document type
          </p>
          <div className="flex flex-wrap gap-2" style={{ minHeight: "62px" }}>
            {DOC_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className="flex items-center justify-center rounded-[8px]"
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  border: selectedType === type ? "1px solid #025fc9" : "1px solid #d9d9d9",
                  backgroundColor: selectedType === type ? "rgba(2, 95, 201, 0.1)" : "#fff",
                }}
              >
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: selectedType === type ? "#025fc9" : "#5e5757",
                    letterSpacing: "0.14px",
                    lineHeight: "21px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {type}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scan Document button */}
      <button
        className="flex items-center justify-center w-full rounded-[12px]"
        style={{ height: "44px", border: "1px solid #d9d9d9", gap: "12px" }}
      >
        <Scan size={24} className="text-[#5e5757] shrink-0" />
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#5e5757", letterSpacing: "0.16px" }}>
          Scan Document
        </span>
      </button>

      {/* Helper text */}
      <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
        Upload or scan your documents using your phone. Accepted Formats: PDF, JPG, PNG (maximum 5 MB per file)
      </p>
    </div>
  );
}

export default function UploadedFilePreviewPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [docs, setDocs] = useState<{ id: number; type: DocType; filename: string }[]>([
    { id: 1, type: "Identity", filename: "birthcertificate.pdf" },
    { id: 2, type: "Identity", filename: "birthcertificate.pdf" },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocs((prev) => [...prev, { id: Date.now(), type: "Identity", filename: file.name }]);
    // reset so same file can be picked again
    e.target.value = "";
  };

  const updateDocType = (id: number, type: DocType) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, type } : d)));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* ── Nav h=54 ── */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image
              src="/images/Vector.png"
              alt="OneSyncID"
              width={116}
              height={20}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
              <Bell size={24} className="text-black" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
              <Mail size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>
              Search
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "10px" }}
        >

          {/* Quick Setup heading */}
          <div className="flex items-center" style={{ gap: "5px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Quick Setup
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Add another document */}
          <button
            className="flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={20} className="text-[#025fc9]" />
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
              Add another document
            </span>
          </button>

          {/* Document list */}
          {docs.map((doc) => (
            <DocumentCard
              key={doc.id}
              filename={doc.filename}
              uploadDate="24/10/2025"
              selectedType={doc.type}
              onTypeChange={(type) => updateDocType(doc.id, type)}
            />
          ))}

          {/* Continue button */}
          <button
            onClick={() => router.push("/upload-file/preview/extracted-information")}
            className="flex items-center justify-center w-full rounded-[8px] shrink-0"
            style={{ height: "44px", backgroundColor: "#025fc9", marginTop: "20px" }}
          >
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
              Continue
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}