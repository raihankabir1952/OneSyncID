"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info } from "lucide-react";

function ToggleRow({ label, description, value, onChange }: {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex items-center justify-between w-full">
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
          {label}
        </span>
        <button
          onClick={onChange}
          className="relative inline-flex items-center rounded-full shrink-0"
          style={{
            width: "44px", height: "24px",
            backgroundColor: value ? "#025fc9" : "#d9d9d9",
            transition: "background-color 0.2s",
          }}
        >
          <span
            className="inline-block rounded-full bg-white"
            style={{
              width: "20px", height: "20px",
              transform: value ? "translateX(22px)" : "translateX(2px)",
              transition: "transform 0.2s",
            }}
          />
        </button>
      </div>
      <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
        {description}
      </p>
    </div>
  );
}

export default function PhoneNumberSyncPage() {
  const router = useRouter();

  const [syncFromDevice, setSyncFromDevice] = useState(true);
  const [autoMatch, setAutoMatch] = useState(true);
  const [manualSync, setManualSync] = useState(true);

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
            <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} style={{ objectFit: "contain" }} />
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
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "24px" }}
        >
          {/* Heading */}
          <div className="flex items-center gap-[5px]">
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Phone Number Sync
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Toggles */}
          <ToggleRow
            label="Sync From Device Contacts"
            description="Allows the app to access your device contacts for syncing."
            value={syncFromDevice}
            onChange={() => setSyncFromDevice(!syncFromDevice)}
          />

          <ToggleRow
            label="Auto Match Existing Users"
            description="Automatically identifies which of your contacts are already using OneSyncID."
            value={autoMatch}
            onChange={() => setAutoMatch(!autoMatch)}
          />

          <ToggleRow
            label="Manual Sync"
            description="Enable or disable syncing contacts manually at any time."
            value={manualSync}
            onChange={() => setManualSync(!manualSync)}
          />

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "#f0f0f0" }} />

          {/* Synced Contacts */}
          <div className="flex flex-col gap-[8px] w-full">
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Synced Contacts
            </span>
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "20px" }}>
              See the contacts synced to your account and remove any you don't want stored.
            </p>
            <button
              onClick={() => router.push("/phone-number-sync/synced-contacts")}
              className="flex items-center justify-center rounded-[8px] self-start"
              style={{ height: "40px", paddingLeft: "16px", paddingRight: "16px", border: "1px solid #d9d9d9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>
                Manage Synced Contacts
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}