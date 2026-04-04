"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import { Menu, Bell, Mail, Search, Info } from "lucide-react";

export default function EditExtractedInformationPage() {
  const router = useRouter();

  const [fields, setFields] = useState({
    name: "John Doe",
    dob: "12 April 2000",
    fatherName: "Jack Doe",
    motherName: "Country",
  });

  const handleChange = (key: keyof typeof fields, val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }));
  };

  const inputStyle: React.CSSProperties = {
    ...fontSwitzer,
    fontSize: "16px",
    color: "#333",
    letterSpacing: "0.16px",
    lineHeight: "21px",
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    padding: 0,
  };

  const labelStyle: React.CSSProperties = {
    ...fontSwitzer,
    fontSize: "16px",
    fontWeight: 500,
    color: "#a09898",
    letterSpacing: "0.16px",
    lineHeight: "21px",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* ── Nav h=54 ── */}
        <div
          className="flex items-center justify-between bg-white shrink-0"
          style={{ paddingLeft: "20px", paddingRight: "20px", height: "54px" }}
        >
          <div className="flex items-center" style={{ gap: "20px" }}>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Menu">
              <Menu size={24} className="text-black" />
            </button>
            <Image
              src="/images/Vector.png"
              alt="OneSyncID"
              width={116}
              height={20}
              style={{ objectFit: "contain" }}
            />
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

        {/* ── Search Bar ── */}
        <div className="bg-white shrink-0" style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "3px" }}>
          <div
            className="flex items-center w-full"
            style={{ height: "44px", border: "1px solid #9fbfe4", borderRadius: "28px", paddingLeft: "20px", gap: "10px" }}
          >
            <Search size={20} className="text-[#5e5757] shrink-0" />
            <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.5px" }}>
              Search
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className="bg-white flex flex-col overflow-y-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "47px", paddingBottom: "40px", gap: "30px" }}
        >
          {/* Quick Setup heading */}
          <div className="flex items-center" style={{ gap: "5px" }}>
            <span style={{ ...fontSwitzer, fontSize: "20px", fontWeight: 600, color: "#000", letterSpacing: "0.8px", lineHeight: "32px" }}>
              Quick Setup
            </span>
            <Info size={16} className="text-[#025fc9]" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[20px] w-full">
            <p style={{ ...fontSwitzer, fontSize: "16px", color: "#000", letterSpacing: "0.16px" }}>
              We've extracted details from your uploaded documents. You can always edit these later in their respective sections.
            </p>

            <div className="flex flex-col gap-[30px] w-full">
              <p style={{ ...fontSwitzer, fontSize: "12px", color: "#5e5757", letterSpacing: "0.12px" }}>
                Corrections may be submitted for evaluation.
              </p>

              {/* Extracted Info Card — edit mode */}
              <div className="flex flex-col w-full rounded-[12px]" style={{ border: "1px solid #d9d9d9" }}>

                {/* Card header — no pencil in edit mode */}
                <div className="flex items-center px-[16px] pt-[20px]" style={{ height: "44px" }}>
                  <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>
                    Extracted Information
                  </span>
                </div>

                {/* NAME */}
                <div className="flex items-center px-[16px] py-[20px] w-full" style={{ borderBottom: "1px solid #d9d9d9" }}>
                  <div className="flex flex-col gap-[6px] w-full">
                    <span style={labelStyle}>NAME</span>
                    <input value={fields.name} onChange={(e) => handleChange("name", e.target.value)} style={inputStyle} />
                  </div>
                </div>

                {/* DATE OF BIRTH */}
                <div className="flex items-center px-[16px] py-[20px] w-full" style={{ borderBottom: "1px solid #d9d9d9" }}>
                  <div className="flex flex-col gap-[6px] w-full">
                    <span style={labelStyle}>DATE OF BIRTH</span>
                    <input value={fields.dob} onChange={(e) => handleChange("dob", e.target.value)} style={inputStyle} />
                  </div>
                </div>

                {/* FATHER'S NAME */}
                <div className="flex items-center px-[16px] py-[20px] w-full" style={{ borderBottom: "1px solid #d9d9d9" }}>
                  <div className="flex flex-col gap-[6px] w-full">
                    <span style={labelStyle}>FATHER'S NAME</span>
                    <input value={fields.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} style={inputStyle} />
                  </div>
                </div>

                {/* MOTHER'S NAME */}
                <div className="flex items-center px-[16px] py-[20px] w-full" style={{ borderBottom: "1px solid #d9d9d9" }}>
                  <div className="flex flex-col gap-[6px] w-full">
                    <span style={labelStyle}>MOTHER'S NAME</span>
                    <input value={fields.motherName} onChange={(e) => handleChange("motherName", e.target.value)} style={inputStyle} />
                  </div>
                </div>

                {/* Save / Cancel inside card */}
                <div className="flex items-center gap-[20px] px-[16px]" style={{ paddingTop: "10px", paddingBottom: "20px" }}>
                  <button
                    onClick={() => router.push("/upload-file/preview/finish-setup")}
                    className="flex items-center justify-center rounded-[8px] shrink-0"
                    style={{ width: "90px", height: "44px", border: "1px solid #025fc9" }}
                  >
                    <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px" }}>
                      Save
                    </span>
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center rounded-[8px]"
                    style={{ height: "44px", paddingLeft: "4px", paddingRight: "4px" }}
                  >
                    <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>
                      Cancel
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back + Finish Setup */}
          <div className="flex items-center gap-[20px] w-full">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-[12px] shrink-0"
              style={{ width: "90px", height: "44px", border: "1px solid #5e5757" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", color: "#5e5757", letterSpacing: "0.16px" }}>
                Back
              </span>
            </button>
            <button
              onClick={() => router.push("/upload-file/preview/finish-setup")}
              className="flex items-center justify-center rounded-[8px] flex-1"
              style={{ height: "44px", backgroundColor: "#025fc9" }}
            >
              <span style={{ ...fontSwitzer, fontSize: "16px", fontWeight: 500, color: "#fff", letterSpacing: "0.16px" }}>
                Finish Setup
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}