"use client";

import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { ArrowLeft } from "lucide-react";

const CONNECTED_APPS = [
  { platform: "Applying Next", acceptedOn: "19 Oct 2025" },
  { platform: "Tax Somadhan",  acceptedOn: "05 Jan 2025" },
];

// ── Shared text styles ────────────────────────────────────────────────────────
const bodyText: React.CSSProperties = {
  ...fontSwitzer, fontSize: "14px", color: "#000",
  letterSpacing: "0.14px", lineHeight: "25px",
};

// ── Section component ─────────────────────────────────────────────────────────
function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px", lineHeight: "25px" }}>
        {"  "}{number}.{"  "}{title}
      </p>
      <div style={{ paddingLeft: "28px" }}>
        {children}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TermsAndConditionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen bg-white flex flex-col px-[20px] pt-[20px] pb-[50px] gap-[30px]">

        {/* Back + Title */}
        <div className="flex items-center gap-[10px] pt-[20px]">
          <button type="button" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft size={24} className="text-[#333]" />
          </button>
          <span style={{ ...fontSwitzer, fontSize: "14px", color: "#333", letterSpacing: "0.14px" }}>
            Terms &amp; Conditions
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[50px] w-full">
          <div className="flex flex-col gap-[20px] w-full">

            {/* Last Updated */}
            <p style={{ ...fontSwitzer, fontSize: "14px", color: "#000", letterSpacing: "0.14px" }}>
              <span style={{ fontWeight: 400 }}>Last Updated: </span>
              <span>October 31st, 2025</span>
            </p>

            {/* 1. Introduction */}
            <Section number="1" title="Introduction">
              <p style={bodyText}>
                By creating or using a OneSyncID account, you agree to the terms outlined below. OneSyncID provides a unified sign-in and identity platform that allows you to access supported services such as{" "}
                <span style={{ fontWeight: 500 }}>Applying Next</span>,{" "}
                <span style={{ fontWeight: 500 }}>Tax Somadhan</span>,{" "}
                <span style={{ fontWeight: 500 }}>Kantribute</span>, and other connected apps. These terms explain how your information is used, shared, protected, and managed across the platform.
              </p>
            </Section>

            {/* 2. Account & Identity Information */}
            <Section number="2" title="Account &amp; Identity Information">
              <p style={bodyText}>
                To create and maintain your OneSyncID account, you may be required to provide accurate personal information including identity documents (NID, passport, driving license, residence permit, birth certificate) and profile details such as personal, parental, educational, work, and biometric data.
                <br />
                You are responsible for ensuring that all information provided is truthful and up-to-date.
              </p>
            </Section>

            {/* 3. Use of Your Data */}
            <Section number="3" title="Use of Your Data">
              <div style={bodyText}>
                <p>
                  Your information is used to:
                  <br /> &bull; Verify your identity
                  <br /> &bull; Provide secure access to connected apps
                  <br /> &bull; Improve authentication accuracy and reduce fraud
                  <br /> &bull; Maintain your account, preferences, and security settings
                </p>
                <p style={{ marginTop: "0px" }}>&nbsp;</p>
                <p>Your data is processed according to applicable laws and platform policies.</p>
              </div>
            </Section>

            {/* 4. Connected Applications */}
            <Section number="4" title="Connected Applications">
              <div className="flex flex-col gap-[10px]">
                <p style={bodyText}>
                  These are the applications whose Terms &amp; Conditions you have accepted through OneSyncID:
                </p>

                {/* Table — no border, just columns */}
                <div className="flex flex-col w-full">
                  {/* Header */}
                  <div className="flex items-center w-full">
                    <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#5e5757", lineHeight: "1.3", flex: 1 }}>Platform</span>
                    <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#5e5757", lineHeight: "1.3", flex: 1 }}>Accepted On</span>
                    <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#5e5757", lineHeight: "1.3", width: "66px" }}>View Terms</span>
                  </div>
                  {/* Rows */}
                  {CONNECTED_APPS.map((app) => (
                    <div key={app.platform} className="flex items-center w-full">
                      <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", lineHeight: "25px", flex: 1, whiteSpace: "nowrap" }}>
                        {app.platform}
                      </span>
                      <span style={{ ...fontSwitzer, fontSize: "14px", color: "#000", lineHeight: "25px", flex: 1, whiteSpace: "nowrap" }}>
                        {app.acceptedOn}
                      </span>
                      <button type="button" style={{ width: "66px" }}>
                        <span style={{ ...fontSwitzer, fontSize: "14px", color: "#025fc9", lineHeight: "1.3" }}>View</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* 5. Permissions You Grant */}
            <Section number="5" title="Permissions You Grant">
              <p style={{ ...bodyText, whiteSpace: "pre-wrap" }}>
                By continuing to use OneSyncID:{"\n"}
                {" \u2022 You allow us to store and manage your identity documents securely.\n"}
                {" \u2022 You allow connected apps to verify your identity through OneSyncID.\n"}
                {" \u2022 You allow us to contact you regarding account activity, verification, and security updates."}
              </p>
            </Section>

            {/* 6. Security & Protection */}
            <Section number="6" title="Security &amp; Protection">
              <p style={bodyText}>
                We use encrypted storage, multi-layer verification, and industry-standard security measures to protect your data.
                <br />
                However, you are responsible for keeping your login credentials confidential.
              </p>
            </Section>
          </div>

          {/* Your Acceptance */}
          <div className="flex flex-col gap-[10px] w-full">
            <p style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px", lineHeight: "25px" }}>
              Your Acceptance
            </p>
            <div style={bodyText}>
              <p>You accepted the current Terms &amp; Conditions on: </p>
              <p>
                <span style={{ fontWeight: 600 }}>12 November 2025</span>
                <br />
                To review previous versions, contact{" "}
                <span style={{ color: "#025fc9", textDecoration: "underline" }}>Support</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}