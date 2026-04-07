"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";


// Figma asset URLs
const imgSiVerifiedFill = "https://www.figma.com/api/mcp/asset/a41fa205-d674-4d73-99b8-0e557ef79d79";
const imgVector = "https://www.figma.com/api/mcp/asset/c3de32bc-e267-4d26-ae96-3978c9b2c36e"; // user avatar placeholder
const imgSiShieldLine = "https://www.figma.com/api/mcp/asset/358bdfb6-3e7c-4f7e-a8e2-49aaa40e6a26"; // Quick Verify
const imgSetupSvgrepoCom = "https://www.figma.com/api/mcp/asset/067a2418-c775-4eb8-8fd7-741bbefb60c3"; // Quick Setup
const imgVector6 = "https://www.figma.com/api/mcp/asset/09470159-6237-4c5e-b981-34f458c96199"; // Profile Overview
const imgVector5 = "https://www.figma.com/api/mcp/asset/da1b59fb-26c2-440e-927c-3adfe0e312ac"; // Identification Documents
const imgVector4 = "https://www.figma.com/api/mcp/asset/68e66428-18a7-44e2-a8f5-736178e1c67d"; // Education Information
const imgVector2 = "https://www.figma.com/api/mcp/asset/4d435b7c-cf2e-442c-a4dd-73bf6c37100d"; // Work Experience / Activity
const imgMdiBankOutline = "https://www.figma.com/api/mcp/asset/462d2441-46bb-4485-b300-7763a881510a"; // Banking Information
const imgDocumentsStreamlineAtlasLine = "https://www.figma.com/api/mcp/asset/9a08d9ce-905a-4afa-b460-2aa00d6d4176"; // Guardian Information
const imgImage2 = "https://www.figma.com/api/mcp/asset/e58e6e71-028c-441f-bd34-e65694236005"; // Relatives
const imgVector3 = "https://www.figma.com/api/mcp/asset/f051a842-b6e6-46da-a0a8-6a67785779ad"; // Security & Authentication
const imgVector7 = "https://www.figma.com/api/mcp/asset/be41c5e1-9e10-4fe8-b06a-a91971597879"; // Verification
const imgVector8 = "https://www.figma.com/api/mcp/asset/07ff9da0-e2d3-4eef-ae38-8494db750a83"; // Phone Number Sync
const imgIcon1 = "https://www.figma.com/api/mcp/asset/24d53ddf-3482-4cc8-8817-92368e88ec1c"; // Plus icon
const imgLogout = "https://www.figma.com/api/mcp/asset/6a9acb99-9349-428f-b158-85027c236d6f"; // Logout
const imgMynauiGlobe = "https://www.figma.com/api/mcp/asset/518823df-b110-40d1-92fc-6e2757e0221b"; // Globe
const imgIcon = "/images/arrow.png"; // ChevronDown icon (local export from Figma)
// Connected Apps logos
const imgVector1 = "https://www.figma.com/api/mcp/asset/38271735-b7af-4d07-a870-f9c25e334a0d"; // logo 1
const imgA12 = "https://www.figma.com/api/mcp/asset/f97c5236-9476-4b8b-ac3b-820d91f2b25c"; // logo 2
const img1 = "https://www.figma.com/api/mcp/asset/b6ad6925-8a1f-44f5-94dd-4507768e5a0d"; // bank logo

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// My Account menu items matching Figma exactly
const MY_ACCOUNT_ITEMS: {
  imgSrc: string;
  label: string;
  href: string;
}[] = [
  { imgSrc: imgSiShieldLine, label: "Quick Verify", href: "/upload-file/quick-verify" },
  { imgSrc: imgSetupSvgrepoCom, label: "Quick Setup", href: "/upload-file" },
  { imgSrc: imgVector6, label: "Profile Overview", href: "/personal-information" },
  { imgSrc: imgVector5, label: "Identification Documents", href: "/identification-documents" },
  { imgSrc: imgVector4, label: "Education Information", href: "/education-information" },
  { imgSrc: imgVector2, label: "Work Experience", href: "/work-experience" },
  { imgSrc: imgMdiBankOutline, label: "Banking Information", href: "/banking-information" },
  { imgSrc: imgDocumentsStreamlineAtlasLine, label: "Guardian Information", href: "/guardian-information" },
  { imgSrc: imgImage2, label: "Relatives", href: "/relatives" },
  { imgSrc: imgVector3, label: "Security & Authentication", href: "/security" },
  { imgSrc: imgVector7, label: "Verification", href: "/verification" },
  { imgSrc: imgVector2, label: "Activity", href: "/activity" },
  { imgSrc: imgVector8, label: "Phone Number Sync", href: "/phone-number-sync" },
];

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-[12px]"
      >
        <span
          style={fontSwitzer}
          className="text-[16px] font-semibold text-black tracking-[0.16px]"
        >
          {title}
        </span>

        <img
          src={imgIcon}
          alt=""
          className="size-[24px] transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "2000px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-[10px]">{children}</div>
      </div>
    </div>
  );
}

function MenuItem({
  imgSrc,
  label,
  href,
  onClick,
}: {
  imgSrc: string;
  label: string;
  href: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-[13px] py-[10px] rounded-[8px] transition-colors ${
        isActive ? "bg-[rgba(2,95,201,0.08)]" : ""
      }`}
    >
      <img
        src={imgSrc}
        alt=""
        className="shrink-0 size-[24px]"
        style={{ opacity: isActive ? 1 : 0.85 }}
      />
      <span
        style={fontSwitzer}
        className={`text-[16px] font-medium ${
          isActive ? "text-[#025fc9]" : "text-[#333]"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function ProfileRow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start justify-between w-full text-left"
    >
      <div className="flex gap-[10px] items-start">
        <div className="relative shrink-0 size-[20px]">
          <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
        </div>
        <div className="flex flex-col gap-[5px] items-start justify-center w-[108px]">
          <div className="flex gap-[5px] items-center">
            <span
              className="text-[16px] font-semibold text-black whitespace-nowrap"
              style={{ fontFamily: "SF Pro Text, sans-serif" }}
            >
              John Doe
            </span>
            <img src={imgSiVerifiedFill} alt="" className="size-[16px]" />
          </div>
          <span
            className="text-[12px] text-[#5e5757]"
            style={{ fontFamily: "SF Pro Text, sans-serif" }}
          >
            onesync_john_doe
          </span>
        </div>
      </div>
      <div className="bg-[#d9d9d9] px-[8px] py-[5px] rounded-[10px] shrink-0">
        <span
          className="text-[12px] font-medium text-black"
          style={{ fontFamily: "SF Pro Text, sans-serif" }}
        >
          Personal
        </span>
      </div>
    </button>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isProfileActive = pathname === "/profile";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      {/* Sidebar Panel */}
      <div
        className="fixed top-0 left-0 z-50 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden"
        style={{
          width: "300px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden px-[30px] pb-[30px]">

          {/* Profile Header */}
          <div
            className="border-b border-[#d9d9d9] w-full"
            style={{ paddingTop: "70px", paddingBottom: "20px" }}
          >
            <ProfileRow
              onClick={() => {
                onClose();
                router.push("/profile");
              }}
            />
          </div>

          {/* My Account Items — directly listed, no accordion */}
          <div className="flex flex-col w-full pt-[4px]">
            {MY_ACCOUNT_ITEMS.map((item) => (
              <MenuItem
                key={item.href}
                imgSrc={item.imgSrc}
                label={item.label}
                href={item.href}
                onClick={onClose}
              />
            ))}
          </div>

          {/* Connected Apps */}
          <AccordionSection title="Connected Apps" defaultOpen={false}>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  Recently Used
                </p>
                <div className="flex items-center justify-between overflow-clip w-full">
                  <img src={imgVector1} alt="" className="h-[14px] w-[102px]" />
                  <img src={imgA12} alt="" className="h-[14px] w-[89px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  Government Services
                </p>
                <img src={imgA12} alt="" className="h-[14px] w-[89px]" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  Bank
                </p>
                <img src={img1} alt="" className="h-[18px] w-[56px]" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  Education
                </p>
                <img src={imgVector1} alt="" className="h-[14px] w-[102px]" />
              </div>
            </div>
          </AccordionSection>

          {/* Manage Profiles */}
          <AccordionSection title="Manage Profiles" defaultOpen={false}>
            <div className="flex flex-col gap-[20px]">
              {/* Recently Visited */}
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  Recently Visited
                </p>
                <ProfileRow
                  onClick={() => {
                    onClose();
                    router.push("/profile");
                  }}
                />
              </div>

              {/* All Profiles */}
              <div className="flex flex-col gap-[8px]">
                <p
                  className="text-[12px] text-[#5e5757]"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  All Profiles
                </p>
                {/* Profile row 1 */}
                <button
                  type="button"
                  onClick={() => { onClose(); router.push("/profile"); }}
                  className="flex items-start justify-between w-full text-left py-[10px]"
                >
                  <div className="flex gap-[10px] items-start">
                    <div className="relative shrink-0 size-[20px]">
                      <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <span
                        className="text-[16px] font-semibold text-black whitespace-nowrap"
                        style={{ fontFamily: "SF Pro Text, sans-serif" }}
                      >
                        John Doe
                      </span>
                      <img src={imgSiVerifiedFill} alt="" className="size-[16px]" />
                    </div>
                  </div>
                  <div className="bg-[#d9d9d9] px-[8px] py-[5px] rounded-[10px] shrink-0">
                    <span className="text-[12px] font-medium text-black" style={{ fontFamily: "SF Pro Text, sans-serif" }}>
                      Personal
                    </span>
                  </div>
                </button>
                {/* Profile row 2 */}
                <button
                  type="button"
                  className="flex items-start justify-between w-full text-left py-[10px]"
                >
                  <div className="flex gap-[10px] items-start">
                    <div className="relative shrink-0 size-[20px]">
                      <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <span
                        className="text-[16px] font-semibold text-black whitespace-nowrap"
                        style={{ fontFamily: "SF Pro Text, sans-serif" }}
                      >
                        John Doe
                      </span>
                      <img src={imgSiVerifiedFill} alt="" className="size-[16px]" />
                    </div>
                  </div>
                  <div className="bg-[#d9d9d9] px-[8px] py-[5px] rounded-[10px] shrink-0">
                    <span className="text-[12px] font-medium text-black" style={{ fontFamily: "SF Pro Text, sans-serif" }}>
                      Personal
                    </span>
                  </div>
                </button>
              </div>

              {/* See More */}
              <button
                type="button"
                className="border border-[#a09898] flex items-center justify-center px-[8px] py-[5px] rounded-[8px] self-start"
              >
                <span
                  className="text-[16px] font-medium text-black tracking-[0.16px] whitespace-nowrap"
                  style={{ fontFamily: "SF Pro Text, sans-serif" }}
                >
                  See More
                </span>
              </button>
            </div>
          </AccordionSection>

          {/* Add Account */}
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/create-account");
            }}
            className="w-full flex items-center gap-[10px] py-[12px]"
          >
            <img src={imgIcon1} alt="" className="size-[24px]" />
            <span
              className="text-[16px] font-semibold text-[#333]"
              style={{ fontFamily: "SF Pro Text, sans-serif" }}
            >
              Add Account
            </span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/sign-in");
            }}
            className="w-full flex items-center gap-[10px] py-[12px]"
          >
            <img src={imgLogout} alt="" className="size-[24px]" />
            <span
              className="text-[16px] font-semibold text-[#333]"
              style={{ fontFamily: "SF Pro Text, sans-serif" }}
            >
              Logout
            </span>
          </button>

          {/* Language */}
          <div
            className="flex items-center justify-between"
            style={{ paddingTop: "40px", paddingBottom: "30px" }}
          >
            <span
              style={{
                ...fontSwitzer,
                fontSize: "16px",
                color: "#5e5757",
                letterSpacing: "0.16px",
              }}
            >
              Select language
            </span>

            <div className="flex items-center gap-[3px]">
              <span
                style={{
                  ...fontSwitzer,
                  fontSize: "16px",
                  color: "#5e5757",
                  letterSpacing: "0.16px",
                  lineHeight: "16px",
                }}
              >
                English
              </span>
              <img src={imgMynauiGlobe} alt="" className="size-[20px]" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}