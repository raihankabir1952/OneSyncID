"use client";

import { useState } from "react";
import { fontSwitzer } from "@/lib/styles";
import * as Flags from "country-flag-icons/react/3x2";

// ─── Inline SVG Icons (no expiry) ────────────────────────────────────────────
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const FlagOutlineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#5e5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const languages = [
  { code: "EN", label: "English" },
  { code: "BN", label: "বাংলা" },
];

const countries = [
  { code: "BD", name: "Bangladesh",    phoneCode: "+880" },
  { code: "US", name: "United States", phoneCode: "+1"   },
  { code: "GB", name: "United Kingdom",phoneCode: "+44"  },
  { code: "CA", name: "Canada",        phoneCode: "+1"   },
  { code: "AU", name: "Australia",     phoneCode: "+61"  },
  { code: "IN", name: "India",         phoneCode: "+91"  },
  { code: "PK", name: "Pakistan",      phoneCode: "+92"  },
  { code: "MY", name: "Malaysia",      phoneCode: "+60"  },
  { code: "SG", name: "Singapore",     phoneCode: "+65"  },
  { code: "AE", name: "UAE",           phoneCode: "+971" },
  { code: "SA", name: "Saudi Arabia",  phoneCode: "+966" },
  { code: "QA", name: "Qatar",         phoneCode: "+974" },
  { code: "KW", name: "Kuwait",        phoneCode: "+965" },
  { code: "DE", name: "Germany",       phoneCode: "+49"  },
  { code: "FR", name: "France",        phoneCode: "+33"  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function FlagIcon({ countryCode, className }: { countryCode: string; className?: string }) {
  const Flag = Flags[countryCode as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className={className} />;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Props = {
  onCountryChange: (phoneCode: string, countryCode: string) => void;
};

// ─── Component ───────────────────────────────────────────────────────────────
/*
 * Figma: APP/1.2.1 — node 1482:12883
 *
 * Layout: NO outer border/radius — two flat rows separated by border-b
 * Language row : py 10px | gap 8px | ChevronDown
 *   Empty  → "Language"  Switzer Medium 16px #5e5757
 *   Filled → code(12px) + label(16px) text-black side by side
 * Country row  : py 10px | gap 8px | ChevronDown
 *   Empty  → "Country"   Switzer Medium 16px #5e5757
 *   Filled → flag(24×16) + name(16px) text-black
 */
export default function LanguageCountryCard({ onCountryChange }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCountry,  setSelectedCountry]  = useState(countries[0]);
  const [showLangDD,  setShowLangDD]  = useState(false);
  const [showCountDD, setShowCountDD] = useState(false);
  const [search, setSearch]           = useState("");

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const pickCountry = (c: typeof countries[0]) => {
    setSelectedCountry(c);
    onCountryChange(c.phoneCode, c.code);
    setShowCountDD(false);
    setSearch("");
  };

  return (
    <div className="relative w-full">

      {/* ── Language row ── */}
      <div
        className="border-b border-[#d9d9d9] flex items-center justify-between py-[10px] cursor-pointer"
        onClick={() => { setShowLangDD(!showLangDD); setShowCountDD(false); }}
      >
        <div className="flex items-center gap-[8px]">
          <GlobeIcon />
          {/* Filled state: code (12px) + label (16px) */}
          <div className="flex items-end gap-[6px]">
            <span style={fontSwitzer} className="text-[12px] text-black tracking-[0.12px] leading-[21px]">
              {selectedLanguage.code}
            </span>
            <span style={fontSwitzer} className="text-[16px] text-black tracking-[0.16px] leading-[21px]">
              {selectedLanguage.label}
            </span>
          </div>
        </div>
        <div className={`transition-transform duration-200 ${showLangDD ? "rotate-180" : ""}`}>
          <ChevronDownIcon />
        </div>
      </div>

      {/* Language dropdown */}
      {showLangDD && (
        <div className="absolute left-0 right-0 z-20 bg-white border border-[#d9d9d9] rounded-[12px] shadow-lg overflow-hidden mt-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => { setSelectedLanguage(lang); setShowLangDD(false); }}
              className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-[#f5f5f5] transition-colors ${
                selectedLanguage.code === lang.code ? "bg-[#f0f7ff]" : ""
              }`}
            >
              <span style={fontSwitzer} className="text-[12px] text-[#5e5757] w-6">{lang.code}</span>
              <span style={fontSwitzer} className={`text-[16px] ${selectedLanguage.code === lang.code ? "text-[#025fc9] font-medium" : "text-black"}`}>
                {lang.label}
              </span>
              {selectedLanguage.code === lang.code && <span className="ml-auto text-[#025fc9]">✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* ── Country row ── */}
      <button
        type="button"
        className="border-b border-[#d9d9d9] flex items-center justify-between py-[10px] w-full mt-[20px]"
        onClick={() => { setShowCountDD(!showCountDD); setShowLangDD(false); }}
      >
        <div className="flex items-center gap-[8px]">
          <FlagOutlineIcon />
          <div className="flex items-center gap-[6px]">
            <FlagIcon
              countryCode={selectedCountry.code}
              className="w-[24px] h-[16px] border border-[#eee] shrink-0"
            />
            <span style={fontSwitzer} className="text-[16px] text-black tracking-[0.16px] leading-[21px]">
              {selectedCountry.name}
            </span>
          </div>
        </div>
        <div className={`transition-transform duration-200 ${showCountDD ? "rotate-180" : ""}`}>
          <ChevronDownIcon />
        </div>
      </button>

      {/* Country dropdown */}
      {showCountDD && (
        <div className="absolute left-0 right-0 z-20 bg-white border border-[#d9d9d9] rounded-[12px] shadow-lg overflow-hidden mt-1">
          {/* Search */}
          <div className="px-4 py-3 border-b border-[#d9d9d9]">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={fontSwitzer}
              className="w-full text-[14px] text-black placeholder-[#a09898] outline-none border border-[#d9d9d9] rounded-lg px-3 py-2"
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filtered.length > 0 ? filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => pickCountry(c)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f5f5f5] transition-colors ${
                  selectedCountry.code === c.code ? "bg-[#f0f7ff]" : ""
                }`}
              >
                <FlagIcon countryCode={c.code} className="w-[24px] h-[16px] border border-[#eee]" />
                <span style={fontSwitzer} className="text-[16px] text-black flex-1 text-left">{c.name}</span>
                <span style={fontSwitzer} className="text-[14px] text-[#5e5757]">{c.phoneCode}</span>
                {selectedCountry.code === c.code && <span className="text-[#025fc9]">✓</span>}
              </button>
            )) : (
              <p style={fontSwitzer} className="text-center text-[14px] text-[#a09898] py-4">No country found</p>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {(showLangDD || showCountDD) && (
        <div className="fixed inset-0 z-[5]" onClick={() => { setShowLangDD(false); setShowCountDD(false); }} />
      )}
    </div>
  );
}