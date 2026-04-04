"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Pencil, AlertCircle } from "lucide-react";

interface InfoRowProps {
  label: string;
  value: string;
  borderBottom?: boolean;
  pending?: boolean;
}

function InfoRow({ label, value, borderBottom = true, pending = false }: InfoRowProps) {
  return (
    <div
      className="flex items-center px-[16px] py-[20px] w-full"
      style={{ borderBottom: borderBottom ? "1px solid #d9d9d9" : "none" }}
    >
      <div className="flex flex-col gap-[6px] flex-1">
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#a09898", letterSpacing: "0.16px", lineHeight: "21px" }}>
          {label}
        </span>
        <div className="flex items-center justify-between w-full">
          <span style={{ ...fontSwitzer, fontSize: "16px", color: "#333", letterSpacing: "0.16px", lineHeight: "21px" }}>
            {value}
          </span>
          {pending && (
            <div
              className="flex items-center gap-[5px] rounded-[8px] shrink-0"
              style={{
                backgroundColor: "rgba(255, 244, 229, 0.71)",
                border: "1px solid #fde3e0",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 500, color: "#996500", letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
                Pending
              </span>
              <AlertCircle size={14} className="text-[#996500]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FinishSetupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Nav */}
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

        {/* Search Bar */}
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

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "30px" }}
        >
          {/* Heading */}
          <div className="flex items-center" style={{ gap: "5px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Quick Setup
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[20px] w-full">
            <p style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px" }}>
              We've extracted details from your uploaded documents. You can always edit these later in their respective sections.
            </p>

            <div className="flex flex-col gap-[30px] w-full">
              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                Corrections may be submitted for evaluation.
              </p>

              {/* Extracted Info Card */}
              <div className="flex flex-col w-full rounded-[12px]" style={{ border: "1px solid #d9d9d9" }}>
                <div className="flex items-center justify-between px-[16px] pt-[20px]">
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                    Extracted Information
                  </span>
                  <button onClick={() => router.push("/upload-file/preview/edit-extracted-information")}>
                    <Pencil size={20} className="text-[#5e5757]" />
                  </button>
                </div>

                <InfoRow label="NAME" value="John Doe" pending={true} />
                <InfoRow label="DATE OF BIRTH" value="12 April 2000" />
                <InfoRow label="FATHER'S NAME" value="Jack Doe" />
                <InfoRow label="MOTHER'S NAME" value="Country" borderBottom={false} />
              </div>
            </div>
          </div>

          {/* Back + Finish Setup */}
          <div className="flex items-center gap-[20px] w-full">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-[12px] shrink-0"
              style={{ width: "90px", height: "44px", border: "1px solid #5e5757" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>
                Back
              </span>
            </button>
            <button
              onClick={() => router.push("/personal-information")}
              className="flex items-center justify-center rounded-[8px] flex-1"
              style={{ height: "44px", backgroundColor: "#025fc9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
                Finish Setup
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}