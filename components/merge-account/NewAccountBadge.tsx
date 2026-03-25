"use client";

import { fontSwitzer } from "@/lib/styles";

type Props = {
  email: string;
};

export default function NewAccountBadge({ email }: Props) {
  return (
    <div
      style={fontSwitzer}
      className="bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-[12px] px-4 py-[10px] flex items-start"
    >
      <div className="flex flex-col gap-[6px]">
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