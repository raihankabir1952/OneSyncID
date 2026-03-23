"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Paperclip, Image as ImageIcon, Mic } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

// ---- Types ----
type MessageRole = "user" | "bot";

interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  steps?: { title: string; description: string }[];
  showAgentCard?: boolean;
}

// ---- Mock AI reply ----
const getMockReply = (userText: string): ChatMessage => {
  const lower = userText.toLowerCase();

  if (lower.includes("passkey")) {
    return {
      id: Date.now().toString(),
      role: "bot",
      text: "Passkey failures are usually device-specific. Here's what to check:",
      steps: [
        {
          title: "Confirm biometrics are set up",
          description:
            "Go to your device Settings → Face ID / Fingerprint and ensure it's enrolled.",
        },
        {
          title: "Remove and re-register the passkey",
          description:
            "Sign in with OTP → Profile → Security → Passkeys → Remove, then re-add.",
        },
        {
          title: "Update the OneSyncID app",
          description:
            "An outdated app version can break passkey authentication.",
        },
      ],
      showAgentCard: true,
    };
  }

  if (lower.includes("otp") || lower.includes("code")) {
    return {
      id: Date.now().toString(),
      role: "bot",
      text: "OTP delivery issues can happen for a few reasons. Try the following:",
      steps: [
        {
          title: "Check your spam/junk folder",
          description: "Sometimes OTP emails get filtered by spam filters.",
        },
        {
          title: "Verify your phone number",
          description:
            "Make sure the number on file is correct and can receive SMS.",
        },
        {
          title: "Wait a few minutes",
          description:
            "Network delays can cause OTPs to arrive late. Try again after 2 minutes.",
        },
      ],
      showAgentCard: true,
    };
  }

  if (lower.includes("locked") || lower.includes("account")) {
    return {
      id: Date.now().toString(),
      role: "bot",
      text: "Account lockouts usually happen after multiple failed login attempts. Here's how to recover:",
      steps: [
        {
          title: "Wait 30 minutes",
          description:
            "The account auto-unlocks after a cooldown period ends.",
        },
        {
          title: "Use OTP to sign in",
          description:
            "If passkey fails, try signing in with a one-time password instead.",
        },
        {
          title: "Reset your credentials",
          description:
            "Go to the login page → Forgot credentials to start the reset process.",
        },
      ],
      showAgentCard: true,
    };
  }

  return {
    id: Date.now().toString(),
    role: "bot",
    text: "I understand you're having an issue. Let me help you with that. Could you provide more details so I can give you the most accurate solution?",
    showAgentCard: true,
  };
};

// ---- Bot Avatar ----
function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#025fc9] flex items-center justify-center shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.4 7.8 8.2 8.3 8.9C6.9 9.5 6 10.9 6 12.5V14H18V12.5C18 10.9 17.1 9.5 15.7 8.9C16.2 8.2 16.5 7.4 16.5 6.5C16.5 4 14.5 2 12 2Z"
          fill="white"
        />
        <rect x="8" y="15" width="8" height="5" rx="1" fill="white" />
      </svg>
    </div>
  );
}

// ---- Message bubbles ----
function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end w-full">
      <div className="bg-[#025fc9] rounded-[12px] px-3 py-2 max-w-[75%]">
        <p style={fontSwitzer} className="text-[16px] text-white leading-[22.75px]">
          {text}
        </p>
      </div>
    </div>
  );
}

function BotBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex gap-[10px] items-start w-full">
      <BotAvatar />
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Main reply card */}
        <div className="bg-white border border-[#d9d9d9] rounded-[12px] p-4 flex flex-col gap-5">
          <p style={fontSwitzer} className="text-[16px] text-[#5e5757] leading-[22.75px]">
            {message.text}
          </p>
          {message.steps && message.steps.length > 0 && (
            <div className="flex flex-col gap-2">
              {message.steps.map((step, i) => (
                <div key={i} className="flex flex-col gap-[2px]">
                  <p style={fontSwitzer} className="text-[16px] font-semibold text-[#333]">
                    {step.title}
                  </p>
                  <p style={fontSwitzer} className="text-[14px] text-[#5e5757] leading-[22.75px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agent card */}
        {message.showAgentCard && (
          <div className="bg-white border border-[#d9d9d9] rounded-[12px] overflow-hidden">
            <div className="border-b border-[#d9d9d9] p-4">
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[3px]">
                  <p
                    style={fontSwitzer}
                    className="text-[14px] text-[#5e5757] leading-[21px] tracking-[0.14px]"
                  >
                    STILL NOT RESOLVED?
                  </p>
                  <p
                    style={fontSwitzer}
                    className="text-[16px] font-semibold text-black leading-[21px] tracking-[0.16px]"
                  >
                    Talk to a human agent
                  </p>
                </div>
                <button className="w-full h-10 bg-[#025fc9] rounded-[8px] flex items-center justify-center">
                  <span
                    style={fontSwitzer}
                    className="text-[16px] font-medium text-white tracking-[0.16px]"
                  >
                    Connect to Agent
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Main Page ----
export default function SupportChatConversationPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botReply = getMockReply(trimmed);
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1200);
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
              <h1 style={fontSwitzer} className="text-[18px] font-semibold text-black leading-normal">
                Smart Support
              </h1>
              <p style={fontSwitzer} className="text-[14px] text-[#5e5757] leading-normal">
                Usually answers in seconds
              </p>
            </div>
            <button className="flex items-center gap-[3px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12v3c0 1.1.9 2 2 2h1c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4.07C4.56 7.19 7.92 4 12 4s7.44 3.19 7.93 7H19c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h.5c-.49 1.69-1.9 3-3.5 3h-1.5c-.55 0-1-.45-1-1s.45-1 1-1H16c2.21 0 4-1.79 4-4v-3c0-5.52-4.48-10-10-10z"
                  fill="#025fc9"
                />
              </svg>
              <span style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9] whitespace-nowrap">
                Agent Support
              </span>
            </button>
          </div>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 bg-[rgba(185,185,185,0.05)] overflow-y-auto px-5 pt-[30px] pb-4">
          <div className="flex flex-col gap-5">
            {messages.map((msg) =>
              msg.role === "user" ? (
                <UserBubble key={msg.id} text={msg.text} />
              ) : (
                <BotBubble key={msg.id} message={msg} />
              )
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-[10px] items-start w-full">
                <BotAvatar />
                <div className="bg-white border border-[#d9d9d9] rounded-[12px] px-4 py-3">
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-[#a09898] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Bottom input */}
        <div className="border-t border-[#d9d9d9] flex flex-col items-center justify-center px-5 pt-5 pb-[30px] shrink-0 bg-white">
          <div className="flex gap-2 items-center w-full">
            <div className="flex-1 h-11 bg-white border border-[#d9d9d9] rounded-full flex items-center justify-between px-4 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe your issue..."
                style={fontSwitzer}
                className="flex-1 text-[14px] text-[#5e5757] bg-transparent outline-none placeholder:text-[#5e5757] min-w-0"
              />
              <div className="flex gap-[10px] items-center ml-2 shrink-0">
                <button className="w-5 h-5 flex items-center justify-center">
                  <Paperclip size={18} className="text-[#5e5757]" />
                </button>
                <button className="w-5 h-5 flex items-center justify-center">
                  <ImageIcon size={18} className="text-[#5e5757]" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-[#025fc9] rounded-full flex items-center justify-center shrink-0"
            >
              <Mic size={18} className="text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
