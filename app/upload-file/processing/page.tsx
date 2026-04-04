"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { FileText } from "lucide-react";

export default function ProcessingScanPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(() => {
        router.push("/upload-file/identity-verified");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [progress, router]);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col items-center justify-center">

        <div
          className="flex flex-col items-center"
          style={{ gap: "20px", paddingLeft: "40px", paddingRight: "40px" }}
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: "72px", height: "72px", backgroundColor: "#e8f0fb" }}
          >
            <FileText size={32} className="text-[#025fc9]" />
          </div>

          {/* Label */}
          <p
            style={{
              ...fontSwitzer,
              fontSize: "16px",
              fontWeight: 500,
              color: "#000",
              letterSpacing: "0.16px",
            }}
          >
            Processing scan....
          </p>

          {/* Progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: "6px", backgroundColor: "#e0e0e0" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%`, backgroundColor: "#025fc9" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}