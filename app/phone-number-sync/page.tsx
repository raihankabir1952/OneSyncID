"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft } from "lucide-react";

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="relative inline-flex items-center rounded-full shrink-0"
      style={{
        width: "47px",
        height: "24px",
        backgroundColor: value ? "#025fc9" : "#d9d9d9",
        transition: "background-color 0.2s",
        border: "none",
        outline: "none",
      }}
    >
      <span
        className="inline-block rounded-full bg-white"
        style={{
          width: "20px",
          height: "20px",
          transform: value ? "translateX(25px)" : "translateX(2px)",
          transition: "transform 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

// ── Toggle Row ────────────────────────────────────────────────────────────────
function ToggleRow({ label, description, value, onChange }: {
  label: string; description: string; value: boolean; onChange: () => void;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="flex items-center justify-between w-full">
        <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
          {label}
        </span>
        <Toggle value={value} onChange={onChange} />
      </div>
      <p style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px", lineHeight: "normal" }}>
        {description}
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PhoneNumberSyncPage() {
  const router = useRouter();
  const [syncFromDevice, setSyncFromDevice] = useState(true);
  const [autoMatch, setAutoMatch] = useState(true);
  const [manualSync, setManualSync] = useState(true);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Contacts Sync
          </span>
        </div>

        {/* Toggle rows */}
        <div className="flex flex-col gap-[30px] w-full">
          <ToggleRow
            label="Sync From Device Contacts"
            description="Allows the app to access your device contacts for syncing."
            value={syncFromDevice}
            onChange={() => setSyncFromDevice(!syncFromDevice)}
          />
          <div className="pt-[10px]">
            <ToggleRow
              label="Auto Match Existing Users"
              description="Automatically identifies which of your contacts are already using OneSyncID."
              value={autoMatch}
              onChange={() => setAutoMatch(!autoMatch)}
            />
          </div>
          <div className="pt-[10px]">
            <ToggleRow
              label="Manual Sync"
              description="Enable or disable syncing contacts manually at any time."
              value={manualSync}
              onChange={() => setManualSync(!manualSync)}
            />
          </div>
        </div>

        {/* Synced Contacts */}
        <div className="flex flex-col gap-[10px] w-full pt-[20px]">
          <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
            Synced Contacts
          </p>
          <div className="flex flex-col gap-[10px]">
            <p style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px", lineHeight: "normal" }}>
              See the contacts synced to your account and remove any you don&apos;t want stored.
            </p>
            <button
              type="button"
              onClick={() => router.push("/phone-number-sync/synced-contacts")}
              className="flex items-center justify-center rounded-[8px]"
              style={{ height: "40px", paddingLeft: "10px", paddingRight: "10px", border: "1px solid #5e5757", width: "fit-content" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
                Manage Synced Contacts
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}