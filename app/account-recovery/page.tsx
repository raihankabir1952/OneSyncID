"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft, ChevronDown } from "lucide-react";

const SECURITY_QUESTIONS = [
  "Your first pet's name",
  "Your mother's maiden name",
  "The city you were born in",
  "Your childhood nickname",
  "The name of your first school",
];

// ── Shared styles ─────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", fontWeight: 500,
  color: "#5e5757", letterSpacing: "0.16px", lineHeight: "21px",
};
const inputStyle: React.CSSProperties = {
  ...fontSwitzer, fontSize: "16px", color: "#000",
  border: "none", outline: "none", background: "transparent", width: "100%",
};
const fieldBorder: React.CSSProperties = {
  borderBottom: "1px solid #d9d9d9", paddingTop: "10px", paddingBottom: "10px",
};

// ── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{
        width: "47px", height: "24px", borderRadius: "12px",
        backgroundColor: value ? "#025fc9" : "#d9d9d9",
        position: "relative", transition: "background-color 0.2s ease",
        border: "none", outline: "none", cursor: "pointer", flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute", top: "2px",
        left: value ? "25px" : "2px",
        width: "20px", height: "20px", borderRadius: "50%",
        backgroundColor: "#fff",
        transition: "left 0.2s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AccountRecoveryPage() {
  const router = useRouter();
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryPhone, setRecoveryPhone] = useState("");
  const [securityQuestionEnabled, setSecurityQuestionEnabled] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[40px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Account Recovery
          </span>
        </div>

        {/* Recovery Email */}
        <div className="flex flex-col gap-[10px] w-full">
          <span style={labelStyle}>RECOVERY EMAIL ADDRESS</span>
          <div style={fieldBorder}>
            <input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{ ...inputStyle, color: recoveryEmail ? "#000" : "#a09898" }}
            />
          </div>
        </div>

        {/* Recovery Phone */}
        <div className="flex flex-col gap-[10px] w-full">
          <span style={labelStyle}>RECOVERY PHONE NUMBER</span>
          <div className="flex items-center gap-[10px]" style={fieldBorder}>
            {/* Country code selector */}
            <div className="flex items-center gap-[3px] shrink-0">
              <div className="flex items-center gap-[8px]">
                {/* Bangladesh flag */}
                <div
                  className="shrink-0 overflow-hidden"
                  style={{ width: "30px", height: "20px", border: "0.5px solid #eee", borderRadius: "2px", backgroundColor: "#006a4e", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#f42a41", marginLeft: "-2px" }} />
                </div>
                <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", whiteSpace: "nowrap" }}>+880</span>
              </div>
              <ChevronDown size={16} className="text-[#5e5757] shrink-0" />
            </div>
            <input
              type="tel"
              value={recoveryPhone}
              onChange={(e) => setRecoveryPhone(e.target.value)}
              placeholder="Enter your number"
              style={{ ...inputStyle, color: recoveryPhone ? "#000" : "#a09898" }}
            />
          </div>
        </div>

        {/* Security Question section */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Header with toggle */}
          <div className="flex flex-col gap-[10px] pb-[10px]">
            <div className="flex items-center justify-between w-full">
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                Security Question
              </span>
              <Toggle value={securityQuestionEnabled} onChange={setSecurityQuestionEnabled} />
            </div>
            <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px", lineHeight: "normal" }}>
              Choose a question and answer that only you would know for enhanced account protection if we ever need to verify your identity.
            </p>
          </div>

          {/* Question & Answer fields */}
          <div className="flex flex-col gap-[20px] w-full">
            {/* Question dropdown */}
            <div className="flex flex-col gap-[10px] w-full">
              <span style={labelStyle}>QUESTION</span>
              <div className="flex items-center justify-between" style={fieldBorder}>
                <select
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1 appearance-none bg-transparent"
                  style={{ ...fontSwitzer, fontSize: "16px", color: question ? "#000" : "#a09898", border: "none", outline: "none", letterSpacing: "0.16px" }}
                  disabled={!securityQuestionEnabled}
                >
                  <option value="" disabled>Your first pet&apos;s name</option>
                  {SECURITY_QUESTIONS.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#5e5757] shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Answer input */}
            <div className="flex flex-col gap-[8px] w-full">
              <span style={labelStyle}>ANSWER</span>
              <div style={fieldBorder}>
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer here"
                  disabled={!securityQuestionEnabled}
                  style={{ ...inputStyle, color: answer ? "#000" : "#a09898", opacity: securityQuestionEnabled ? 1 : 0.5 }}
                />
              </div>
            </div>

            {/* Cancel + Save */}
            <div className="flex items-center gap-[12px] justify-end w-full">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "44px", width: "90px", border: "1px solid #5e5757" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px" }}>
                  Cancel
                </span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-[8px]"
                style={{ height: "44px", width: "90px", backgroundColor: "#025fc9" }}
              >
                <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
                  Save
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}