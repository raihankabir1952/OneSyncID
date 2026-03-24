"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Paperclip, Image as ImageIcon, Mic, Send } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";
import Link from "next/link";

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
          description: "Go to your device Settings → Face ID / Fingerprint and ensure it's enrolled.",
        },
        {
          title: "Remove and re-register the passkey",
          description: "Sign in with OTP → Profile → Security → Passkeys → Remove, then re-add.",
        },
        {
          title: "Update the OneSyncID app",
          description: "An outdated app version can break passkey authentication.",
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
          description: "Make sure the number on file is correct and can receive SMS.",
        },
        {
          title: "Wait a few minutes",
          description: "Network delays can cause OTPs to arrive late. Try again after 2 minutes.",
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
          description: "The account auto-unlocks after a cooldown period ends.",
        },
        {
          title: "Use OTP to sign in",
          description: "If passkey fails, try signing in with a one-time password instead.",
        },
        {
          title: "Reset your credentials",
          description: "Go to the login page → Forgot credentials to start the reset process.",
        },
      ],
      showAgentCard: true,
    };
  }

  if (lower.includes("id") || lower.includes("find")) {
    return {
      id: Date.now().toString(),
      role: "bot",
      text: "Here's how to find your OneSyncID:",
      steps: [
        {
          title: "Check your welcome email",
          description: "Search your inbox for 'OneSync' or 'OSY-' to find your ID.",
        },
        {
          title: "Find it inside the app",
          description: "Go to Profile → Account Details. Your OneSyncID is displayed at the top.",
        },
        {
          title: "Contact support",
          description: "We'll verify your identity and help you recover your OneSyncID.",
        },
      ],
      showAgentCard: true,
    };
  }

  return {
    id: Date.now().toString(),
    role: "bot",
    text: "I understand you're having an issue. Could you provide more details so I can give you the most accurate solution?",
    showAgentCard: true,
  };
};

// ---- Bot Avatar ----
function BotAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#025fc9] flex items-center justify-center shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12v3c0 1.1.9 2 2 2h1c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4.07C4.56 7.19 7.92 4 12 4s7.44 3.19 7.93 7H19c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h.5c-.49 1.69-1.9 3-3.5 3h-1.5c-.55 0-1-.45-1-1s.45-1 1-1H16c2.21 0 4-1.79 4-4v-3c0-5.52-4.48-10-10-10z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// ---- User Bubble ----
function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end w-full">
      <div className="bg-[#025fc9] rounded-[12px] px-[12px] py-[8px] max-w-[75%]">
        <p style={fontSwitzer} className="text-[16px] text-white leading-[22.75px]">
          {text}
        </p>
      </div>
    </div>
  );
}

// ---- Bot Bubble ----
function BotBubble({ message, onConnectAgent }: { message: ChatMessage; onConnectAgent: () => void }) {
  return (
    <div className="flex gap-[10px] items-start w-full">
      <BotAvatar />
      <div className="flex flex-col gap-[12px] flex-1 min-w-0">

        {/* Main reply card */}
        <div className="bg-white border border-[#d9d9d9] rounded-[12px] p-[16px] flex flex-col gap-5">
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
            <div className="p-[16px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[3px]">
                  <p style={fontSwitzer} className="text-[14px] text-[#5e5757] leading-[21px] tracking-[0.14px]">
                    STILL NOT RESOLVED?
                  </p>
                  <p style={fontSwitzer} className="text-[16px] font-semibold text-black leading-[21px]">
                    Talk to a human agent
                  </p>
                </div>


              <Link
                href="/support/agent"
                className="w-full h-[40px] bg-[#025fc9] rounded-[8px] flex items-center justify-center"
              >
                <span style={fontSwitzer} className="text-[16px] font-medium text-white">
                  Connect to Agent
                </span>
              </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Main Content ----
function ConversationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  // ✅ Strict Mode double run fix
  const hasInitialized = useRef(false);

  const hasText = input.trim().length > 0;

  useEffect(() => {
    if (!initialMessage || hasInitialized.current) return;
    hasInitialized.current = true;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: initialMessage,
    };

    setMessages([userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getMockReply(initialMessage);
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1200);
  }, []);

  // Scroll to bottom
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

    setTimeout(() => {
      const botReply = getMockReply(trimmed);
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1200);
  };

  const handleConnectAgent = () => {
    router.push("/support/agent");
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
              <span style={fontSwitzer} className="text-[16px] font-medium text-[#025fc9] whitespace-nowrap">
                Agent Support
              </span>
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 bg-[rgba(185,185,185,0.05)] overflow-y-auto px-5 pt-[30px] pb-4">
          <div className="flex flex-col gap-5">
            {messages.map((msg) =>
              msg.role === "user" ? (
                <UserBubble key={msg.id} text={msg.text} />
              ) : (
                <BotBubble
                  key={msg.id}
                  message={msg}
                  onConnectAgent={handleConnectAgent}
                />
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

          <div className="flex gap-[8px] items-center w-full">
            <div className="flex-1 h-[44px] bg-white border border-[#d9d9d9] rounded-full flex items-center justify-between px-4 py-2">
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
  );
}

// ✅ Suspense wrapper
export default function SupportChatConversationPage() {
  return (
    <Suspense>
      <ConversationContent />
    </Suspense>
  );
}