import { fontSwitzer } from "@/lib/styles";

export default function MergeWarningBanner() {
  return (
    <div className="flex gap-[3px] items-start bg-[rgba(255,244,229,0.7)] border border-[#fde3e0] rounded-xl px-4 py-[10px]">
      <svg width="11" height="15" viewBox="0 0 11 15" fill="none" className="shrink-0 mt-[1px]">
        <path
          d="M5.5 0.5L1 2.5V7C1 9.76 3.03 12.36 5.5 13C7.97 12.36 10 9.76 10 7V2.5L5.5 0.5Z"
          stroke="#996500" strokeWidth="1" fill="none"
        />
        <path
          d="M5.5 4.5V7.5M5.5 9H5.506"
          stroke="#996500" strokeWidth="1.2" strokeLinecap="round"
        />
      </svg>
      <div style={fontSwitzer} className="text-[12px] text-[#996500] leading-[14px] tracking-[0.12px]">
        <p>We need to confirm you own the existing account before merging.</p>
        <p>This prevents unauthorized account takeovers.</p>
      </div>
    </div>
  );
}