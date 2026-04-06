"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info, Pencil } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface InfoRowProps {
  label: string;
  value: string;
  borderBottom?: boolean;
}

function InfoRow({ label, value, borderBottom = true }: InfoRowProps) {
  return (
    <div
      className="flex items-center px-[16px] py-[20px] w-full"
      style={{ borderBottom: borderBottom ? "1px solid #d9d9d9" : "none" }}
    >
      <div className="flex flex-col gap-[6px]">
        <span
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            fontWeight: 500,
            color: "#a09898",
            letterSpacing: "0.16px",
            lineHeight: "21px",
          }}
        >
          {label}
        </span>
        <span
          style={{
            ...fontSwitzer,
            fontSize: "16px",
            color: "#333",
            letterSpacing: "0.16px",
            lineHeight: "21px",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default function ExtractedInformationPage() {
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
          {/* Quick Setup heading */}
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

          {/* Content */}
          <div className="flex flex-col gap-[20px] w-full">
            <p
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                color: "#000",
                letterSpacing: "0.16px",
                lineHeight: "normal",
              }}
            >
              We&apos;ve extracted details from your uploaded documents. You can always
              edit these later in their respective sections.
            </p>

            <div className="flex flex-col gap-[30px] w-full">
              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  letterSpacing: "0.12px",
                }}
              >
                Corrections may be submitted for evaluation.
              </p>

              {/* Extracted Info Card */}
              <div
                className="flex flex-col w-full rounded-[12px]"
                style={{ border: "1px solid #d9d9d9" }}
              >
                <div className="flex items-center justify-between px-[16px] pt-[20px]">
                  <span
                    style={{
                      ...fontSwitzer,
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#000",
                      letterSpacing: "0.16px",
                    }}
                  >
                    Extracted Information
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/upload-file/preview/edit-extracted-information")
                    }
                  >
                    <Pencil size={20} className="text-[#5e5757]" />
                  </button>
                </div>

                <InfoRow label="NAME" value="John Doe" />
                <InfoRow label="DATE OF BIRTH" value="12 April 2000" />
                <InfoRow label="FATHER'S NAME" value="Jack Doe" />
                <InfoRow label="MOTHER'S NAME" value="Country" borderBottom={false} />
              </div>
            </div>
          </div>

          {/* Back + Finish Setup */}
          <div className="flex items-center gap-[20px] w-full">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-[12px] shrink-0"
              style={{ width: "90px", height: "44px", border: "1px solid #d9d9d9" }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#5e5757",
                  letterSpacing: "0.16px",
                }}
              >
                Back
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/upload-file/preview/finish-setup")}
              className="flex items-center justify-center rounded-[8px] flex-1"
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
                Finish Setup
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}