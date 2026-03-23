import { ReactNode } from "react";
import { fontSwitzer } from "@/lib/styles";

interface SupportIssueItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  showBorder?: boolean;
  onClick?: () => void;
}

export default function SupportIssueItem({
  icon,
  title,
  subtitle,
  showBorder = true,
  onClick,
}: SupportIssueItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-5 w-full text-left ${
        showBorder ? "border-b border-[#d9d9d9]" : ""
      }`}
    >
      <div className="flex flex-1 gap-2 items-start">
        <div className="bg-[rgba(2,95,201,0.1)] flex items-center justify-center rounded-[8px] shrink-0 size-6">
          {icon}
        </div>
        <div className="flex flex-col gap-[3px] flex-1">
          <p style={fontSwitzer} className="text-[16px] font-medium text-black tracking-[0.16px] leading-[21px]">
            {title}
          </p>
          <p style={fontSwitzer} className="text-[14px] text-[#5e5757] tracking-[0.14px] leading-[21px]">
            {subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}
