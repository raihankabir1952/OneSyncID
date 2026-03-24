"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Paperclip, Image as ImageIcon, Mic, Send } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

const QUICK_SUGGESTIONS = [
  "Account locked",
  "Passkey issue",
  "OTP not arriving",
  "Find my ID",
];

export default function SupportChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const hasText = message.trim().length > 0;

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    inputRef.current?.focus();
  };

  // ✅ Send করলে conversation page-এ navigate করে message নিয়ে
  const handleSend = () => {
    if (!message.trim()) return;
    router.push(
      `/support/chat/conversation?message=${encodeURIComponent(message.trim())}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="bg-white border-b border-[#d9d9d9] flex flex-col gap-[10px] items-center px-5 pb-5 pt-6 shrink-0">
          <div className="flex items-center w-full">
            <button
              onClick={() => router.back()}
              className="w-6 h-6 flex items-center justify-center"
            >
              <ArrowLeft size={24} className="text-black" />
            </button>
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-[3px]">
              <h1
                style={fontSwitzer}
                className="text-[18px] font-semibold text-black leading-normal"
              >
                Smart Support
              </h1>
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#5e5757] leading-normal"
              >
                Usually answers in seconds
              </p>
            </div>
            <button
              onClick={() => router.push("/support/agent")}
              className="flex items-center gap-[3px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12v3c0 1.1.9 2 2 2h1c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4.07C4.56 7.19 7.92 4 12 4s7.44 3.19 7.93 7H19c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h.5c-.49 1.69-1.9 3-3.5 3h-1.5c-.55 0-1-.45-1-1s.45-1 1-1H16c2.21 0 4-1.79 4-4v-3c0-5.52-4.48-10-10-10z"
                  fill="#025fc9"
                />
              </svg>
              <span
                style={fontSwitzer}
                className="text-[16px] font-medium text-[#025fc9] whitespace-nowrap"
              >
                Agent Support
              </span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 bg-[rgba(185,185,185,0.05)] flex flex-col justify-between pt-[60px]">

          <div className="flex flex-col gap-[30px] items-center w-full">

            {/* Chat icon + description */}
            <div className="flex flex-col gap-[10px] items-center px-5 w-full">
              <div className="w-10 h-10 rounded-[8px] bg-[rgba(2,95,201,0.1)] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                    fill="#025fc9"
                  />
                </svg>
              </div>
              <p
                style={fontSwitzer}
                className="text-[14px] text-[#a09898] text-center leading-[22.75px] tracking-[0.14px]"
              >
                Tell me what&apos;s going wrong with your account.{"\n"}
                I&apos;ll find the right answer or get you to someone who can help.
              </p>
            </div>

            {/* Quick suggestion chips */}
            <div className="px-5 w-full">
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white border border-[#d9d9d9] rounded-[8px] px-[10px] py-[5px]"
                  >
                    <span
                      style={fontSwitzer}
                      className="text-[14px] text-[#5e5757] leading-[22.75px] tracking-[0.14px] whitespace-nowrap"
                    >
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom chat input */}
          <div className="border-t border-[#d9d9d9] flex flex-col items-center justify-center px-5 pt-5 pb-[30px] w-full bg-white">

            {/* Hidden file inputs */}
            <input
              ref={attachRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) console.log("Attached:", file.name);
                e.target.value = "";
              }}
            />
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) console.log("Image:", file.name);
                e.target.value = "";
              }}
            />

            <div className="flex gap-2 items-center w-full">
              <div className="flex-1 h-[44px] bg-white border border-[#d9d9d9] rounded-full flex items-center justify-between px-4 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Describe your issue..."
                  style={fontSwitzer}
                  className="flex-1 text-[14px] text-[#5e5757] bg-transparent outline-none placeholder:text-[#5e5757] min-w-0"
                />
                <div className="flex gap-[10px] items-center ml-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => attachRef.current?.click()}
                    className="w-5 h-5 flex items-center justify-center"
                  >
                    <Paperclip size={18} className="text-[#5e5757]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => imageRef.current?.click()}
                    className="w-5 h-5 flex items-center justify-center"
                  >
                    <ImageIcon size={18} className="text-[#5e5757]" />
                  </button>
                </div>
              </div>

              {/* Send / Mic */}
              <button
                onClick={hasText ? handleSend : undefined}
                className="w-[40px] h-[40px] bg-[#025fc9] rounded-full flex items-center justify-center shrink-0 transition-all"
              >
                {hasText ? (
                  <Send size={18} className="text-white" />
                ) : (
                  <Mic size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}