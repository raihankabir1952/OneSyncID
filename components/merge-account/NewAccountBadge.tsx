import { fontSwitzer } from "@/lib/styles";

interface NewAccountBadgeProps {
  email: string;
}

export default function NewAccountBadge({ email }: NewAccountBadgeProps) {
  return (
    <div
      className="flex items-center px-[16px] py-[10px] rounded-[12px] w-[353px] shrink-0"
      style={{
        backgroundColor: "rgba(2, 95, 201, 0.05)",
        border: "1px solid rgba(2, 95, 201, 0.2)",
      }}
    >
      <div className="flex flex-col gap-[6px] items-start">
        <p
          style={fontSwitzer}
          className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#025fc9] whitespace-nowrap"
        >
          NEW ACCOUNT BEING CREATED
        </p>
        <p
          style={fontSwitzer}
          className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-black whitespace-nowrap"
        >
          {email}
        </p>
      </div>
    </div>
  );
}