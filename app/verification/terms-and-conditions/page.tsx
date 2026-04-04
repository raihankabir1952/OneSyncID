"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, ArrowLeft } from "lucide-react";

const CONNECTED_APPS = [
  { platform: "Applying Next", acceptedOn: "19 Oct 2025" },
  { platform: "Tax Somadhan", acceptedOn: "05 Jan 2025" },
];

export default function TermsAndConditionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Nav */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image src="/images/Vector.png" alt="OneSyncID" width={116} height={20} style={{ objectFit: "contain" }} />
          </div>
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Notifications">
              <Bell size={24} className="text-black" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Messages">
              <Mail size={24} className="text-black" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>Search</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px", paddingBottom: "40px", gap: "20px" }}
        >
          {/* Back + Title */}
          <div className="flex items-center gap-[12px]">
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} className="text-black" />
            </button>
            <span style={{ ...fontSwitzer, fontSize: "18px", fontWeight: 600, color: "#000", letterSpacing: "0.8px" }}>
              Terms & Conditions
            </span>
          </div>

          {/* Last Updated */}
          <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px" }}>
            Last Updated: <span style={{ fontWeight: 600, color: "#000" }}>October 31st, 2025</span>
          </p>

          {/* Section 1 */}
          <Section title="1. Introduction">
            By creating or using a OneSyncID account, you agree to the terms outlined below. OneSyncID provides a unified sign-in and identity platform that allows you to access supported services such as Applying Next, Tax Somadhan, Kantribute, and other connected apps. These terms explain how your information is used, shared, protected, and managed across the platform.
          </Section>

          {/* Section 2 */}
          <Section title="2. Account & Identity Information">
            To create and maintain your OneSyncID account, you may be required to provide accurate personal information including identity documents (NID, passport, driving license, residence permit, birth certificate) and profile details such as personal, parental, educational, work, and biometric data. You are responsible for ensuring that all information provided is truthful and up-to-date.
          </Section>

          {/* Section 3 */}
          <Section title="3. Use of Your Data">
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px", marginBottom: "8px" }}>
              Your information is used to:
            </p>
            {["Verify your identity", "Provide secure access to connected apps", "Improve authentication accuracy and reduce fraud", "Maintain your account, preferences, and security settings"].map((item) => (
              <p key={item} style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px" }}>
                • {item}
              </p>
            ))}
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px", marginTop: "8px" }}>
              Your data is processed according to applicable laws and platform policies.
            </p>
          </Section>

          {/* Section 4 — Connected Applications */}
          <Section title="4. Connected Applications">
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px", marginBottom: "12px" }}>
              These are the applications whose Terms & Conditions you have accepted through OneSyncID:
            </p>

            {/* Table */}
            <div className="w-full rounded-[8px] overflow-hidden" style={{ border: "1px solid #d9d9d9" }}>
              {/* Header */}
              <div className="flex items-center w-full px-[12px] py-[8px]" style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #d9d9d9" }}>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#767676", letterSpacing: "0.12px", flex: 1 }}>Platform</span>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#767676", letterSpacing: "0.12px", flex: 1 }}>Accepted On</span>
                <span style={{ ...fontSwitzer, fontSize: "12px", fontWeight: 600, color: "#767676", letterSpacing: "0.12px", width: "60px" }}>View Terms</span>
              </div>
              {CONNECTED_APPS.map((app, idx) => (
                <div
                  key={app.platform}
                  className="flex items-center w-full px-[12px] py-[10px]"
                  style={{ borderBottom: idx < CONNECTED_APPS.length - 1 ? "1px solid #d9d9d9" : "none" }}
                >
                  <span style={{ ...fontSwitzer, fontSize: "13px", color: "#000", letterSpacing: "0.13px", flex: 1 }}>{app.platform}</span>
                  <span style={{ ...fontSwitzer, fontSize: "13px", color: "#000", letterSpacing: "0.13px", flex: 1 }}>{app.acceptedOn}</span>
                  <button style={{ width: "60px" }}>
                    <span style={{ ...fontSwitzer, fontSize: "13px", color: "#025fc9", letterSpacing: "0.13px" }}>View</span>
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 5 */}
          <Section title="5. Permissions You Grant">
            {["Allow us to store and manage your identity documents securely.", "Allow connected apps to verify your identity through OneSyncID.", "Allow us to contact you regarding account activity, verification, and security updates."].map((item) => (
              <p key={item} style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px" }}>
                • {item}
              </p>
            ))}
          </Section>

          {/* Section 6 */}
          <Section title="6. Security & Protection">
            We use encrypted storage, multi-layer verification, and industry-standard security measures to protect your data. However, you are responsible for keeping your login credentials confidential.
          </Section>

          {/* Your Acceptance */}
          <div className="flex flex-col gap-[8px] w-full" style={{ borderTop: "1px solid #d9d9d9", paddingTop: "20px" }}>
            <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 600, color: "#000", letterSpacing: "0.16px" }}>
              Your Acceptance
            </span>
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px" }}>
              You accepted the current Terms & Conditions on: <span style={{ fontWeight: 600, color: "#000" }}>12 November 2025</span>
            </p>
            <p style={{ ...fontSwitzer, fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px" }}>
              To review previous versions, contact{" "}
              <span style={{ color: "#025fc9", fontWeight: 500 }}>Support.</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <span style={{ fontFamily: "inherit", fontSize: "15px", fontWeight: 600, color: "#000", letterSpacing: "0.15px" }}>
        {title}
      </span>
      <div style={{ fontSize: "13px", color: "#5e5757", lineHeight: "21px" }}>
        {typeof children === "string" ? (
          <p style={{ fontFamily: "inherit", fontSize: "13px", color: "#5e5757", letterSpacing: "0.13px", lineHeight: "21px" }}>
            {children}
          </p>
        ) : children}
      </div>
    </div>
  );
}