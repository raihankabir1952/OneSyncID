import { fontSwitzer } from "@/lib/styles";

interface NewAccountBadgeProps {
  email: string;
}

export default function NewAccountBadge({ email }: NewAccountBadgeProps) {
  return (
    <div className="bg-[rgba(2,95,201,0.05)] border border-[rgba(2,95,201,0.2)] rounded-xl px-4 py-[10px]">
      <div style={fontSwitzer} className="flex flex-col gap-[6px]">
        <p className="text-[16px] font-medium text-[#025fc9] leading-[21px] tracking-[0.16px]">
          NEW ACCOUNT BEING CREATED
        </p>
        <p className="text-[16px] font-medium text-black leading-[21px] tracking-[0.16px]">
          {email}
        </p>
      </div>
    </div>
  );
}