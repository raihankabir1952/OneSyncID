"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { X, Image as ImageIcon, PlusCircle } from "lucide-react";

type ScanState = "idle" | "scanning" | "detected" | "complete";

export default function IdentificationScanPage() {
  const router = useRouter();
  const [scanState, setScanState] = useState<ScanState>("idle");

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

  if (scanState === "complete") {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">
          <div
            className="flex flex-col"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "60px",
              gap: "24px",
            }}
          >
            <h1
              style={{
                ...fontSwitzer,
                fontSize: "20px",
                fontWeight: 600,
                color: "#000",
                letterSpacing: "0.8px",
                textAlign: "center",
              }}
            >
              Scan complete
            </h1>

            <div className="flex flex-col" style={{ gap: "12px" }}>
              <div
                className="rounded-[12px] overflow-hidden relative"
                style={{ width: "140px", height: "100px" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/driver-license-sample.png"
                    alt="Scanned document"
                    fill
                    className="object-cover"
                  />

                  <span
                    style={{
                      ...fontSwitzer,
                      fontSize: "12px",
                      color: "#fff",
                      backgroundColor: "rgba(0,0,0,0.4)",
                      width: "100%",
                      textAlign: "center",
                      padding: "4px",
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                    }}
                  >
                    Page 1
                  </span>
                </div>
              </div>

              <button className="flex items-center gap-[6px]">
                <PlusCircle size={20} className="text-[#025fc9]" />
                <span
                  style={{
                    ...fontSwitzer,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#025fc9",
                    letterSpacing: "0.14px",
                  }}
                >
                  Add another page
                </span>
              </button>
            </div>

            <button
              onClick={() => router.push("/identification-documents")}
              className="flex items-center justify-center w-full rounded-[12px]"
              style={{
                height: "44px",
                backgroundColor: "#025fc9",
                marginTop: "12px",
              }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "0.16px",
                }}
              >
                Save and Finish Scanning
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[393px] mx-auto bg-[#1c1c1c] min-h-screen flex flex-col">
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          <X size={24} className="text-white" />
        </button>

        <span
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            fontWeight: 500,
            color: "#fff",
            letterSpacing: "0.16px",
          }}
        >
          Page 1
        </span>

        <div className="w-8" />
      </div>

      <div
        className="flex-1 flex items-center justify-center"
        style={{ padding: "10px" }}
      >
        <div
          className="w-full rounded-[16px] overflow-hidden relative"
          style={{ aspectRatio: "4/3", backgroundColor: "#3a3a3a" }}
        >
          {scanState === "scanning" && (
            <div
              className="absolute left-0 right-0 h-[3px] bg-blue-500 animate-bounce"
              style={{ top: "40%" }}
            />
          )}

          {scanState === "detected" && (
            <div
              className="absolute inset-[10px] rounded-[8px]"
              style={{ border: "2px dashed #025fc9" }}
            />
          )}

          <div className="absolute top-3 left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-[4px]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-[4px]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-[4px]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-[4px]" />
        </div>
      </div>

      <div className="flex items-center justify-center" style={{ paddingBottom: "24px" }}>
        <div
          className="flex items-center gap-[8px] rounded-[20px] px-[16px] py-[8px]"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          {scanState === "detected" && (
            <span style={{ color: "#025fc9", fontSize: "16px" }}>✓</span>
          )}

          <span
            style={{
              ...fontSwitzer,
              fontSize: "14px",
              color: "#fff",
              letterSpacing: "0.14px",
            }}
          >
            {scanState === "idle" && "Scan a valid document"}
            {scanState === "scanning" && "Scanning for document..."}
            {scanState === "detected" && "Document detected"}
          </span>
        </div>
      </div>

      {scanState === "detected" ? (
        <div className="flex flex-col gap-[12px] bg-white" style={{ padding: "20px" }}>
          <button
            onClick={() => setScanState("complete")}
            className="flex items-center justify-center w-full rounded-[12px]"
            style={{ height: "44px", backgroundColor: "#025fc9" }}
          >
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "0.16px",
              }}
            >
              Confirm
            </span>
          </button>

          <button
            onClick={() => setScanState("idle")}
            className="flex items-center justify-center w-full rounded-[12px] gap-[8px]"
            style={{ height: "44px", backgroundColor: "#f0f0f0" }}
          >
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                color: "#5e5757",
                letterSpacing: "0.16px",
              }}
            >
              ↺ Scan Again
            </span>
          </button>
        </div>
      ) : (
        <div
          className="flex items-center justify-between"
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "40px",
          }}
        >
          <button
            className="w-10 h-10 flex items-center justify-center rounded-[8px]"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ImageIcon size={22} className="text-white" />
          </button>

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