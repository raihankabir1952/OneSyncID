"use client";

import Image from "next/image";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Upload, Scan, Info } from "lucide-react";

export default function UploadFilePage() {
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
            {/* Logo w=116 h=20 */}
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

        {/* ── Search Bar — 3px gap after Nav, h=44 ── */}
        <div
          className="bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}
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
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>
              Search
            </span>
          </div>
        </div>

        {/* ── Body — 47px top padding to match Figma y=104 (54nav+3gap+44search+3=104) ── */}
        <div
          className="bg-white flex flex-col"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "30px" }}
        >

          {/* Quick Setup heading — inner y=20, so pt=20 within the 47px body */}
          <div className="flex items-center" style={{ gap: "5px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Quick Setup
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Upload section */}
          <div className="flex flex-col" style={{ gap: "30px" }}>

            {/* Title + subtitle */}
            <div className="flex flex-col w-full" style={{ gap: "8px" }}>
              <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", textAlign: "center", letterSpacing: "0.16px", lineHeight: "21px" }}>
                Upload or scan a valid document
              </p>
              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                Suggested documents:{" "}
                <span style={{ fontWeight: 500 }}>NID Card, birth certificate, or passport.</span>
              </p>
            </div>

            {/* Buttons + helper text */}
            <div className="flex flex-col w-full">

              {/* Upload document h=44 */}
              <button
                className="flex items-center justify-center w-full"
                style={{ height: "44px", border: "1px solid #d9d9d9", borderRadius: "12px", gap: "12px" }}
              >
                <Upload size={24} className="text-[#5e5757] shrink-0" />
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#5e5757", letterSpacing: "0.16px" }}>
                  Upload document
                </span>
              </button>

              {/* gap between buttons = 20px */}
              <div style={{ height: "20px" }} />

              {/* Scan document h=44 */}
              <button
                className="flex items-center justify-center w-full"
                style={{ height: "44px", border: "1px solid #d9d9d9", borderRadius: "12px", gap: "12px" }}
              >
                <Scan size={24} className="text-[#5e5757] shrink-0" />
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#5e5757", letterSpacing: "0.16px" }}>
                  Scan Document
                </span>
              </button>

              {/* gap before helper text = 20px (y=128, buttons end at 108) */}
              <div style={{ height: "20px" }} />

              {/* Helper text */}
              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                Upload or scan your documents using your phone. Accepted Formats: PDF, JPG, PNG (maximum 5 MB per file)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}