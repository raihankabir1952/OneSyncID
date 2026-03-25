"use client";

import { ShieldAlert } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

export default function MergeWarningBanner() {
  return (
    <div
      style={fontSwitzer}
      className="bg-[rgba(255,244,229,0.7)] border border-[#fde3e0] rounded-[12px] px-4 py-[10px] flex items-start gap-[6px]"
    >
      <ShieldAlert size={15} className="text-[#996500] shrink-0 mt-0.5" />
      <p className="text-[12px] text-[#996500] tracking-[0.12px] leading-[14px]">
        We need to confirm you own the existing account before merging.{" "}
        This prevents unauthorized account takeovers.
      </p>
    </div>
  );
}