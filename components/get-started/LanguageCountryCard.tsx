"use client";

import { useState } from "react";
import { Globe, ChevronRight } from "lucide-react";
import { fontSwitzer, colors } from "@/lib/styles";
import * as Flags from "country-flag-icons/react/3x2";

const languages = [
  { code: "EN", label: "English" },
  { code: "BN", label: "বাংলা" },
];

const countries = [
  { code: "BD", name: "Bangladesh", phoneCode: "+880" },
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
  { code: "IN", name: "India", phoneCode: "+91" },
  { code: "PK", name: "Pakistan", phoneCode: "+92" },
  { code: "MY", name: "Malaysia", phoneCode: "+60" },
  { code: "SG", name: "Singapore", phoneCode: "+65" },
  { code: "AE", name: "UAE", phoneCode: "+971" },
  { code: "SA", name: "Saudi Arabia", phoneCode: "+966" },
  { code: "QA", name: "Qatar", phoneCode: "+974" },
  { code: "KW", name: "Kuwait", phoneCode: "+965" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "FR", name: "France", phoneCode: "+33" },
];

// Dynamic flag component
function FlagIcon({ countryCode, className }: { countryCode: string; className?: string }) {
  const Flag = Flags[countryCode as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className={className} />;
}

type Props = {
  onCountryChange: (phoneCode: string, countryCode: string) => void;
};

export default function LanguageCountryCard({ onCountryChange }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    onCountryChange(country.phoneCode, country.code);
    setShowCountryDropdown(false);
    setCountrySearch("");
  };

  return (
    <div className="relative">
      <div className="border border-[#d9d9d9] rounded-xl overflow-visible">

        {/* Language Row */}
        <div
          className="flex items-center justify-between px-4 py-5 border-b border-[#d9d9d9] cursor-pointer"
          onClick={() => {
            setShowLanguageDropdown(!showLanguageDropdown);
            setShowCountryDropdown(false);
          }}
        >
          <div className="flex items-center gap-2">
            <Globe size={20} color={colors.textMuted} />
            <div className="flex items-end gap-1">
              <span style={fontSwitzer} className="text-[12px] text-black tracking-[0.12px]">
                {selectedLanguage.code}
              </span>
              <span style={fontSwitzer} className="text-[16px] text-black tracking-[0.16px]">
                {selectedLanguage.label}
              </span>
            </div>
          </div>
          <ChevronRight
            size={24}
            color={colors.textMuted}
            className={`transition-transform ${showLanguageDropdown ? "rotate-90" : ""}`}
          />
        </div>

        {/* Language Dropdown */}
        {showLanguageDropdown && (
          <div className="absolute left-0 right-0 z-20 bg-white border border-[#d9d9d9] rounded-xl shadow-lg mt-1 overflow-hidden top-[66px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageDropdown(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-[#f5f5f5] transition-colors ${
                  selectedLanguage.code === lang.code ? "bg-[#f0f7ff]" : ""
                }`}
              >
                <span style={fontSwitzer} className="text-[12px] text-[#5e5757]">
                  {lang.code}
                </span>
                <span style={fontSwitzer} className="text-[16px] text-black">
                  {lang.label}
                </span>
                {selectedLanguage.code === lang.code && (
                  <span className="ml-auto text-[#025fc9] text-[16px]">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Country Row */}
        <button
          className="w-full flex items-center justify-between px-4 py-5"
          onClick={() => {
            setShowCountryDropdown(!showCountryDropdown);
            setShowLanguageDropdown(false);
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <div className="flex items-center gap-2">
              <FlagIcon countryCode={selectedCountry.code} className="w-[24px] h-[16px] border border-[#eee]" />
              <span style={fontSwitzer} className="text-[16px] text-black tracking-[0.16px]">
                {selectedCountry.name}
              </span>
            </div>
          </div>
          <ChevronRight
            size={24}
            color={colors.textMuted}
            className={`transition-transform ${showCountryDropdown ? "rotate-90" : ""}`}
          />
        </button>
      </div>

      {/* Country Dropdown */}
      {showCountryDropdown && (
        <div className="absolute left-0 right-0 z-20 bg-white border border-[#d9d9d9] rounded-xl shadow-lg mt-1 overflow-hidden">
          {/* Search */}
          <div className="px-4 py-3 border-b border-[#d9d9d9]">
            <input
              type="text"
              placeholder="Search country..."
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              style={fontSwitzer}
              className="w-full text-[14px] text-black placeholder-[#a09898] outline-none border border-[#d9d9d9] rounded-lg px-3 py-2"
              autoFocus
            />
          </div>
          {/* Country List */}
          <div className="max-h-[200px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f5f5f5] transition-colors ${
                    selectedCountry.code === country.code ? "bg-[#f0f7ff]" : ""
                  }`}
                >
                  <FlagIcon countryCode={country.code} className="w-[24px] h-[16px] border border-[#eee]" />
                  <span style={fontSwitzer} className="text-[16px] text-black">
                    {country.name}
                  </span>
                  <span style={fontSwitzer} className="ml-auto text-[14px] text-[#5e5757]">
                    {country.phoneCode}
                  </span>
                  {selectedCountry.code === country.code && (
                    <span className="text-[#025fc9] text-[16px]">✓</span>
                  )}
                </button>
              ))
            ) : (
              <p style={fontSwitzer} className="text-center text-[14px] text-[#a09898] py-4">
                No country found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
