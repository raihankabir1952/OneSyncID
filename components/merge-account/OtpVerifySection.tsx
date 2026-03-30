"use client";

import { fontSwitzer } from "@/lib/styles";

const PhoneIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M14.5 12.5c-.83 0-1.63-.13-2.38-.37a.75.75 0 00-.75.18l-1.47 1.47a11.32 11.32 0 01-4.68-4.68l1.47-1.47a.75.75 0 00.18-.75A7.43 7.43 0 016.5 4.5C6.5 4.22 6.28 4 6 4H3.5C3.22 4 3 4.22 3 4.5 3 11.4 7.6 17 14.5 17c.28 0 .5-.22.5-.5V14c0-.28-.22-.5-.5-.5z"
      fill={active ? "#025fc9" : "#5e5757"}
    />
  </svg>
);

const EmailIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M16 4H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1zm0 2l-6 4.5L4 6"
      stroke={active ? "#025fc9" : "#5e5757"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 8l5 5 5-5" stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface OtpVerifySectionProps {
  otpTab: "phone" | "email";
  onOtpTabChange: (tab: "phone" | "email") => void;
  phoneNumber: string;
  onPhoneNumberChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
}

export default function OtpVerifySection({
  otpTab,
  onOtpTabChange,
  phoneNumber,
  onPhoneNumberChange,
  email,
  onEmailChange,
}: OtpVerifySectionProps) {
  return (
    <div className="flex flex-col gap-[30px] w-full">
      {/* Tab switcher */}
      <div
        className="flex items-center justify-between px-[16px] py-[8px] rounded-[12px] w-full"
        style={{ border: "1px solid #d9d9d9" }}
      >
        {/* Phone Tab */}
        <button
          type="button"
          onClick={() => onOtpTabChange("phone")}
          className="flex flex-1 gap-[8px] items-center justify-center p-[8px]"
          style={
            otpTab === "phone"
              ? { borderBottom: "3px solid #025fc9" }
              : {}
          }
        >
          <PhoneIcon active={otpTab === "phone"} />
          <span
            style={fontSwitzer}
            className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] whitespace-nowrap ${
              otpTab === "phone" ? "text-[#025fc9]" : "text-[#5e5757]"
            }`}
          >
            Phone
          </span>
        </button>

        {/* Email Tab */}
        <button
          type="button"
          onClick={() => onOtpTabChange("email")}
          className="flex flex-1 gap-[8px] items-center justify-center p-[8px]"
          style={
            otpTab === "email"
              ? { borderBottom: "3px solid #025fc9" }
              : {}
          }
        >
          <EmailIcon active={otpTab === "email"} />
          <span
            style={fontSwitzer}
            className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] whitespace-nowrap ${
              otpTab === "email" ? "text-[#025fc9]" : "text-[#5e5757]"
            }`}
          >
            Email
          </span>
        </button>
      </div>

      {/* Phone Number Input */}
      {otpTab === "phone" ? (
        <div className="flex flex-col gap-[10px] w-full">
          <p
            style={fontSwitzer}
            className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]"
          >
            PHONE NUMBER
          </p>
          <div
            className="flex items-center justify-between py-[10px] w-full"
            style={{ borderBottom: "1px solid #d9d9d9" }}
          >
            {/* Country code selector */}
            <div className="flex gap-[3px] items-center shrink-0">
              <div className="flex gap-[8px] items-center">
                {/* BD flag */}
                <div
                  className="w-[30px] h-[20px] shrink-0 rounded-[1px] overflow-hidden"
                  style={{ border: "0.5px solid #eee" }}
                >
                  <div className="w-full h-full bg-[#006a4e] flex items-center justify-center">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#f42a41] ml-[-2px]" />
                  </div>
                </div>
                <span
                  style={fontSwitzer}
                  className="text-[16px] text-[#5e5757] whitespace-nowrap"
                >
                  +880
                </span>
              </div>
              <DownArrow />
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              placeholder="Enter your number"
              style={fontSwitzer}
              className="flex-1 text-[16px] leading-[normal] tracking-[0.16px] text-black placeholder-[#a09898] bg-transparent outline-none ml-2"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px] w-full">
          <p
            style={fontSwitzer}
            className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]"
          >
            EMAIL ADDRESS
          </p>
          <div
            className="flex items-center py-[10px] w-full"
            style={{ borderBottom: "1px solid #d9d9d9" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter your email"
              style={fontSwitzer}
              className="flex-1 text-[16px] leading-[21px] tracking-[0.16px] text-black placeholder-[#a09898] bg-transparent outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}