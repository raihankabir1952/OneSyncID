"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Upload, Scan, Info } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function UploadFilePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Nav */}
          <div
            className="flex items-center justify-between bg-white shrink-0"
            style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
          >
            <div className="flex items-center" style={{ gap: "20px" }}>
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Menu"
                onClick={() => setSidebarOpen(true)}
              >
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
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell size={24} className="text-black" />
              </button>

              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Messages"
              >
                <Mail size={24} className="text-black" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="bg-white shrink-0"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "3px",
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
              <Search size={20} className="text-[#5e5757] shrink-0" />
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#5e5757",
                  letterSpacing: "0.5px",
                }}
              >
                Search
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "47px",
            paddingBottom: "40px",
            gap: "30px",
          }}
        >
          <div className="flex items-center" style={{ gap: "5px" }}>
            <span
              style={{
                ...fontSwitzer,
                fontSize: "20px",
                fontWeight: 600,
                color: "#000",
                letterSpacing: "0.8px",
                lineHeight: "32px",
              }}
            >
              Quick Setup
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          <div className="flex flex-col" style={{ gap: "30px" }}>
            <div className="flex flex-col w-full" style={{ gap: "8px" }}>
              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#000",
                  textAlign: "center",
                  letterSpacing: "0.16px",
                  lineHeight: "21px",
                }}
              >
                Upload or scan a valid document
              </p>

              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  letterSpacing: "0.12px",
                }}
              >
                Suggested documents:{" "}
                <span style={{ fontWeight: 500 }}>
                  NID Card, birth certificate, or passport.
                </span>
              </p>
            </div>

            <div className="flex flex-col w-full">
              {/* Upload document */}
              <button
                type="button"
                onClick={() => router.push("/upload-file/preview")}
                className="flex items-center justify-center w-full"
                style={{
                  height: "44px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "12px",
                  gap: "12px",
                }}
              >
                <Upload size={24} className="text-[#5e5757] shrink-0" />
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#5e5757",
                    letterSpacing: "0.16px",
                  }}
                >
                  Upload document
                </span>
              </button>

              <div style={{ height: "20px" }} />

              {/* Scan document */}
              <button
                type="button"
                onClick={() => router.push("/upload-file/quick-verify")}
                className="flex items-center justify-center w-full"
                style={{
                  height: "44px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "12px",
                  gap: "12px",
                }}
              >
                <Scan size={24} className="text-[#5e5757] shrink-0" />
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#5e5757",
                    letterSpacing: "0.16px",
                  }}
                >
                  Scan Document
                </span>
              </button>

              <div style={{ height: "20px" }} />

              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  letterSpacing: "0.12px",
                }}
              >
                Upload or scan your documents using your phone. Accepted
                Formats: PDF, JPG, PNG (maximum 5 MB per file)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}