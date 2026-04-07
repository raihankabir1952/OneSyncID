"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft } from "lucide-react";

const methods = [
  {
    id: "password",
    title: "Password",
    description: "Manage your password and update it when needed to keep your account secure.",
    buttonLabel: "Change Password",
    route: "/sign-in-methods/change-password",
  },
  {
    id: "pin",
    title: "PIN",
    description: "Manage your password and update it when needed to keep your account secure.",
    buttonLabel: "Add PIN",
    route: "",
  },
  {
    id: "passkey",
    title: "Passkey",
    description: "Manage your password and update it when needed to keep your account secure.",
    buttonLabel: "Add Passkey",
    route: "",
  },
];

function MethodSection({ title, description, buttonLabel, onButtonClick }: {
  title: string; description: string; buttonLabel: string; onButtonClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
        {title}
      </p>
      <div className="flex flex-col gap-[12px]">
        <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "normal" }}>
          {description}
        </p>
        <button
          type="button"
          onClick={onButtonClick}
          className="flex items-center justify-center rounded-[8px]"
          style={{ height: "40px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #5e5757", width: "fit-content" }}
        >
          <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px", whiteSpace: "nowrap" }}>
            {buttonLabel}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function SignInMethodsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Sign-in Methods
          </span>
        </div>
        {methods.map((m) => (
          <MethodSection
            key={m.id}
            title={m.title}
            description={m.description}
            buttonLabel={m.buttonLabel}
            onButtonClick={() => m.route && router.push(m.route)}
          />
        ))}
      </div>
    </div>
  );
}