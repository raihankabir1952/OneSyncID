"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { fontSwitzer } from "@/lib/styles";

// ─── Types ────────────────────────────────────────────────────────────────────
export type OtpStatus = "idle" | "success" | "error";

type Props = {
  value: string[];
  onChange: (val: string[]) => void;
  status: OtpStatus;
};

// ─── Border color per status ──────────────────────────────────────────────────
function boxBorder(index: number, filled: boolean, status: OtpStatus, activeIndex: number) {
  if (status === "success") return "border-[#11a75c]";
  if (status === "error")   return "border-[#ff3838]";
  if (index === activeIndex) return "border-[#025fc9]";
  if (filled)                return "border-[#025fc9]";
  return "border-[#d9d9d9]";
}

// ─── Component ───────────────────────────────────────────────────────────────
/*
 * Figma: 6 boxes | each 50×50px | gap 10px | border 2px | radius 12px
 * Total width: 6×50 + 5×10 = 350px ≈ fits inside w-[353px] container
 *
 * Fix: use fixed w-[50px] h-[50px] instead of flex-1
 * to prevent overflow on small/variable screens
 */
export default function OtpInput({ value, onChange, status }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const activeIndex = value.findIndex((v) => v === "");
  const focusIndex  = activeIndex === -1 ? 5 : activeIndex;

  const handleChange = (i: number, char: string) => {
    if (!/^\d$/.test(char)) return;
    const next = [...value];
    next[i] = char;
    onChange(next);
    if (i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...value];
      if (next[i]) {
        next[i] = "";
        onChange(next);
      } else if (i > 0) {
        next[i - 1] = "";
        onChange(next);
        refs.current[i - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = Array(6).fill("");
    pasted.split("").forEach((c, i) => { next[i] = c; });
    onChange(next);
    const focusAt = Math.min(pasted.length, 5);
    refs.current[focusAt]?.focus();
  };

  return (
    <div className="flex items-center justify-between w-full">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={() => refs.current[i]?.select()}
          style={{ ...fontSwitzer, width: "50px", height: "50px" }}
          className={`shrink-0 rounded-[12px] border-2 text-center text-[18px] font-semibold text-black outline-none transition-colors bg-white
            ${boxBorder(i, !!digit, status, focusIndex)}`}
        />
      ))}
    </div>
  );
}