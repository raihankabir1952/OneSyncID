"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import {
  Menu,
  Bell,
  Mail,
  Search,
  Info,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function QuickVerifyPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            className="flex items-center justify-between bg-white shrink-0"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              height: "54px",
            }}
          >
            <div className="flex items-center" style={{ gap: "20px" }}>

              {/* Menu Button */}
              <button
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
                className="w-6 h-6 flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell size={24} className="text-black" />
              </button>

              <button
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
              <Search
                size={20}
                className="text-[#5e5757] shrink-0"
              />

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
          className="bg-white flex flex-col"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "47px",
            paddingBottom: "40px",
            gap: "30px",
          }}
        >

          {/* Heading */}
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
              Quick Verify
            </span>

            <Info
              size={16}
              className="text-[#025fc9]"
            />
          </div>

          {/* Center content */}
          <div
            className="flex flex-col items-center"
            style={{
              gap: "30px",
              paddingTop: "40px",
            }}
          >

            {/* Scan Frame */}
            <div
              className="flex items-center justify-center"
              style={{
                width: "120px",
                height: "120px",
              }}
            >
              <div className="relative w-full h-full">

                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#025fc9] rounded-tl-[4px]" />

                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#025fc9] rounded-tr-[4px]" />

                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#025fc9] rounded-bl-[4px]" />

                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#025fc9] rounded-br-[4px]" />

                <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-[#025fc9] -translate-y-1/2" />

              </div>
            </div>

            {/* Text */}
            <div
              className="flex flex-col items-center w-full"
              style={{ gap: "8px" }}
            >

              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#000",
                  textAlign: "center",
                }}
              >
                Verify your identity to access entire profile
              </p>

              <p
                style={{
                  ...fontSwitzer,
                  fontSize: "12px",
                  color: "#5e5757",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Suggested documents: NID card, birth certificate,
                driver's license or passport.
              </p>

            </div>

            {/* Button */}
            <button
              onClick={() =>
                router.push("/upload-file/scan")
              }
              className="flex items-center justify-center w-full rounded-[12px]"
              style={{
                height: "44px",
                backgroundColor: "#025fc9",
              }}
            >
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                Start Scanning
              </span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}