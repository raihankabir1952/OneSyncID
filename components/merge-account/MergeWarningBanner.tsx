"use client";

import { fontSwitzer } from "@/lib/styles";

/*
 * Figma node: 1854:11462
 * bg: rgba(255,244,229,0.7) | border: #fde3e0 | radius: 12px
 * px: 16px | py: 10px | gap: 3px | w: 353px | h: 62px
 * Icon: mynaui:shield 11×15px | #996500
 * Text: Switzer Regular | 12px | #996500 | tracking-[0.12px] | leading-[14px]
 */
export default function MergeWarningBanner() {
  return (
    <div
      style={{ ...fontSwitzer, gap: "3px" }}
      className="bg-[rgba(255,244,229,0.7)] border border-[#fde3e0] rounded-[12px] px-4 py-[10px] flex items-start w-[353px]"
    >
      {/* Inline shield SVG — no expiry */}
      <svg
        width="11"
        height="15"
        viewBox="0 0 11 15"
        fill="none"
        className="shrink-0 mt-[1px]"
      >
        <path
          d="M5.5 0.5L0.5 3V7C0.5 10.31 2.74 13.36 5.5 14.25C8.26 13.36 10.5 10.31 10.5 7V3L5.5 0.5Z"
          stroke="#996500"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 7.5L4.8 8.8L7.5 6"
          stroke="#996500"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p
        style={fontSwitzer}
        className="text-[12px] text-[#996500] tracking-[0.12px] leading-[14px] flex-1"
      >
        We need to confirm you own the existing account before merging.{" "}
        This prevents unauthorized account takeovers.
      </p>
    </div>
  );
}