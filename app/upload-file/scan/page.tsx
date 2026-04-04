"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { X, Image as ImageIcon } from "lucide-react";

type ScanState = "idle" | "scanning" | "detected";

export default function ScanPage() {
  const router = useRouter();
  const [scanState, setScanState] = useState<ScanState>("idle");

  // idle → scanning after 2s (simulate camera detecting)
  useEffect(() => {
    if (scanState === "idle") {
      const t = setTimeout(() => setScanState("scanning"), 2000);
      return () => clearTimeout(t);
    }
    if (scanState === "scanning") {
      const t = setTimeout(() => setScanState("detected"), 2500);
      return () => clearTimeout(t);
    }
  }, [scanState]);

  return (
    <div className="w-full max-w-[393px] mx-auto bg-[#1c1c1c] min-h-screen flex flex-col relative">

      {/* Top bar */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "16px", paddingBottom: "16px" }}
      >
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          <X size={24} className="text-white" />
        </button>
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
          Page 1
        </span>
        <div className="w-8" />
      </div>

      {/* Camera viewfinder */}
      <div className="flex-1 flex items-center justify-center relative" style={{ padding: "10px" }}>
        <div
          className="w-full rounded-[16px] overflow-hidden relative"
          style={{ aspectRatio: "4/3", backgroundColor: "#3a3a3a" }}
        >
          {/* Scanning state — blue scan line */}
          {scanState === "scanning" && (
            <div
              className="absolute left-0 right-0 h-[3px] bg-blue-500 animate-bounce"
              style={{ top: "40%" }}
            />
          )}

          {/* Detected state — blue dashed border */}
          {scanState === "detected" && (
            <div
              className="absolute inset-[10px] rounded-[8px]"
              style={{ border: "2px dashed #025fc9" }}
            />
          )}

          {/* Corner brackets — always visible */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-[4px]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-[4px]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-[4px]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-[4px]" />
        </div>
      </div>

      {/* Status label */}
      <div className="flex items-center justify-center" style={{ paddingBottom: "24px" }}>
        <div
          className="flex items-center gap-[8px] rounded-[20px] px-[16px] py-[8px]"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          {scanState === "detected" && (
            <span style={{ color: "#025fc9", fontSize: "16px" }}>✓</span>
          )}
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#fff", letterSpacing: "0.14px" }}>
            {scanState === "idle" && "Scan a valid document"}
            {scanState === "scanning" && "Scanning for document..."}
            {scanState === "detected" && "Document detected"}
          </span>
        </div>
      </div>

      {/* Bottom controls — detected state shows Confirm/Scan Again */}
      {scanState === "detected" ? (
        <div className="flex flex-col gap-[12px] bg-white" style={{ padding: "20px" }}>
          <button
            onClick={() => router.push("/upload-file/scan/complete")}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9" }}
          >
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
              Confirm
            </span>
          </button>
          <button
            onClick={() => setScanState("idle")}
            className="flex items-center justify-center w-full rounded-[12px] gap-[8px]"
            style={{ height: "44px", backgroundColor: "#f0f0f0" }}
          >
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>
              ↺ Scan Again
            </span>
          </button>
        </div>
      ) : (
        <div
          className="flex items-center justify-between"
          style={{ paddingLeft: "40px", paddingRight: "40px", paddingBottom: "40px" }}
        >
          {/* Gallery button */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-[8px]"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ImageIcon size={22} className="text-white" />
          </button>

          {/* Capture button */}
          <button
            onClick={() => setScanState("scanning")}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ border: "3px solid white" }}
          >
            <div
              className="rounded-full"
              style={{
                width: "52px",
                height: "52px",
                backgroundColor: scanState === "scanning" ? "#025fc9" : "white",
              }}
            />
          </button>

          <div className="w-10" />
        </div>
      )}

    </div>
  );
}