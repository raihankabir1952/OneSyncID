"use client";

import { fontSwitzer } from "@/lib/styles";

type Props = {
  email: string;
};

/*
 * Figma node: 1854:11466
 * bg: rgba(2,95,201,0.05) | border: rgba(2,95,201,0.2) | radius: 12px
 * px: 16px | py: 10px | w: 353px | h: 68px
 * "NEW ACCOUNT BEING CREATED": Switzer Medium | 16px | #025fc9 | leading-[21px] | tracking-[0.16px]
 * email: Switzer Medium | 16px | #000 | leading-[21px] | tracking-[0.16px]
 * gap between lines: 6px
 */
export default function NewAccountBadge({ email }: Props) {
  return (
    <div
      style={fontSwitzer}
      className="bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-[12px] px-4 py-[10px] flex items-start w-[353px]"
    >
      <div className="flex flex-col" style={{ gap: "6px" }}>
        <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#025fc9]">
          NEW ACCOUNT BEING CREATED
        </p>
        <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-black">
          {email}
        </p>
      </div>
    </div>
  );
}