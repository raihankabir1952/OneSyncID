"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import {
  Menu,
  Bell,
  Mail,
  Search,
  Info,
  Plus,
  Pencil,
  MoreVertical,
  Scan,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const DOC_TYPES = [
  "Identity",
  "Work",
  "Financial",
  "Educational",
  "Property",
  "Medical",
  "Other",
] as const;

type DocType = typeof DOC_TYPES[number];

interface DocumentCardProps {
  filename: string;
  uploadDate: string;
  selectedType: DocType;
  onTypeChange: (t: DocType) => void;
}

function DocumentCard({
  filename,
  uploadDate,
  selectedType,
  onTypeChange,
}: DocumentCardProps) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p
        style={{
          fontFamily: "SF Pro Text, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: "#767676",
          letterSpacing: "0.14px",
          paddingTop: "10px",
        }}
      >
        DOCUMENT DETAILS
      </p>

      <div
        className="flex flex-col gap-[20px] p-[20px] rounded-[12px] w-full"
        style={{ border: "1px solid #d9d9d9" }}
      >
        {/* File row */}
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-3">
            {/* Thumbnail Image */}
            <div
              className="rounded-[8px] overflow-hidden shrink-0"
              style={{
                width: "65px",
                height: "43px",
                border: "1px solid #d9d9d9",
                padding: "3px",
              }}
            >
              <Image
                src="/images/birth-certificate-thumb.png"
                alt="Document preview"
                width={65}
                height={43}
                className="w-full h-full object-cover rounded-[6px]"
              />
            </div>

            <div className="flex flex-col gap-[5px]">
              <div className="flex items-center gap-[6px]">
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "16px",
                    color: "#000",
                    letterSpacing: "0.16px",
                  }}
                >
                  {filename}
                </span>

                <Pencil
                  size={20}
                  className="text-[#5e5757] shrink-0"
                />
              </div>

              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  letterSpacing: "0.12px",
                }}
              >
                Upload Date: {uploadDate}
              </span>
            </div>
          </div>

          <MoreVertical
            size={24}
            className="text-[#5e5757] shrink-0"
          />
        </div>

        {/* Document type */}
        <div className="flex flex-col gap-2 w-full">
          <p
            style={{
              ...fontSwitzer,
              fontSize: "12px",
              color: "#a09898",
            }}
          >
            Select document type
          </p>

          <div className="flex flex-wrap gap-2">
            {DOC_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className="rounded-[8px]"
                style={{
                  padding: "3px 8px",
                  border:
                    selectedType === type
                      ? "1px solid #025fc9"
                      : "1px solid #d9d9d9",
                  backgroundColor:
                    selectedType === type
                      ? "rgba(2,95,201,0.1)"
                      : "#fff",
                }}
              >
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "14px",
                    fontWeight: 500,
                    color:
                      selectedType === type
                        ? "#025fc9"
                        : "#5e5757",
                  }}
                >
                  {type}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scan button */}
      <button
        className="flex items-center justify-center w-full rounded-[12px]"
        style={{
          height: "44px",
          border: "1px solid #d9d9d9",
          gap: "12px",
        }}
      >
        <Scan size={24} className="text-[#5e5757]" />

        <span
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            fontWeight: 600,
            color: "#5e5757",
          }}
        >
          Scan Document
        </span>
      </button>
    </div>
  );
}

export default function UploadedFilePreviewPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [docs, setDocs] = useState([
    { id: 1, type: "Identity" as DocType, filename: "birthcertificate.pdf" },
    { id: 2, type: "Identity" as DocType, filename: "birthcertificate.pdf" },
  ]);

  const updateDocType = (id: number, type: DocType) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, type } : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">

          {/* Nav */}
          <div
            className="flex items-center justify-between bg-white"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              height: "54px",
            }}
          >
            <div className="flex items-center gap-[20px]">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-6 h-6 flex items-center justify-center"
              >
                <Menu size={24} />
              </button>

              <Image
                src="/images/Vector.png"
                alt="OneSyncID"
                width={116}
                height={20}
              />
            </div>

            <div className="flex gap-[20px]">
              <Bell size={24} />
              <Mail size={24} />
            </div>
          </div>

          {/* Search */}
          <div
            className="bg-white"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "10px",
            }}
          >
            <div
              className="flex items-center w-full"
              style={{
                height: "44px",
                border: "1px solid #9fbfe4",
                borderRadius: "28px",
                paddingLeft: "20px",
                gap: "10px",
              }}
            >
              <Search size={20} />
              <span>Search</span>
            </div>
          </div>

        </div>

        {/* Body */}
        <div
          className="flex flex-col overflow-y-auto"
          style={{
            padding: "20px",
            gap: "10px",
          }}
        >
          <div className="flex items-center gap-[5px]">
            <span
              style={{
                ...fontSwitzer,
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Quick Setup
            </span>

            <Info size={16} className="text-[#025fc9]" />
          </div>

          <button
            className="flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={20} className="text-[#025fc9]" />
            Add another document
          </button>

          {docs.map((doc) => (
            <DocumentCard
              key={doc.id}
              filename={doc.filename}
              uploadDate="24/10/2025"
              selectedType={doc.type}
              onTypeChange={(type) =>
                updateDocType(doc.id, type)
              }
            />
          ))}

          <button
            onClick={() =>
              router.push(
                "/upload-file/preview/extracted-information"
              )
            }
            className="w-full rounded-[8px]"
            style={{
              height: "44px",
              backgroundColor: "#025fc9",
              marginTop: "20px",
              color: "#fff",
            }}
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}