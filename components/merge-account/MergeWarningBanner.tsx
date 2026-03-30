import { fontSwitzer } from "@/lib/styles";

const ShieldIcon = () => (
  <svg width="11" height="15" viewBox="0 0 11 15" fill="none">
    <path
      d="M5.5 0L0 2.5V7C0 10.55 2.36 13.74 5.5 15C8.64 13.74 11 10.55 11 7V2.5L5.5 0Z"
      fill="#996500"
    />
  </svg>
);

export default function MergeWarningBanner() {
  return (
    <div
      className="flex gap-[3px] items-start px-[16px] py-[10px] rounded-[12px] w-[353px] shrink-0"
      style={{
        backgroundColor: "rgba(255, 244, 229, 0.7)",
        border: "1px solid #fde3e0",
      }}
    >
      <div className="shrink-0 mt-[1px]">
        <ShieldIcon />
      </div>
      <p
        style={fontSwitzer}
        className="text-[12px] leading-[14px] text-[#996500] tracking-[0.12px] flex-1"
      >
        We need to confirm you own the existing account before merging.{" "}
        This prevents unauthorized account takeovers.
      </p>
    </div>
  );
}