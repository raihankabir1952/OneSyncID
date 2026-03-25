"use client";

import { useRef, useState, useEffect } from "react";
import { User, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say" | "";

type Props = {
  fullName: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  gender: Gender;
  isActive?: boolean;
  onFullNameChange: (value: string) => void;
  onDateOfBirthChange: (value: string) => void;
  onGenderChange: (value: Gender) => void;
};

const genderOptions: { label: string; value: Gender }[] = [
  { label: "Male",              value: "male" },
  { label: "Female",            value: "female" },
  { label: "Non-binary",        value: "non-binary" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Gender icon — inline SVG (no expiry, no external URL)
function GenderIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      {/* Female circle */}
      <circle cx="12" cy="9" r="4" />
      <line x1="12" y1="13" x2="12" y2="21" />
      <line x1="9"  y1="18" x2="15" y2="18" />
      {/* Male arrow */}
      <line x1="17" y1="3" x2="22" y2="3" />
      <line x1="22" y1="3" x2="22" y2="8" />
      <line x1="16" y1="8" x2="22" y2="3" />
    </svg>
  );
}

function formatDisplay(dob: string) {
  if (!dob) return "";
  const [y, m, d] = dob.split("-");
  return `${d}/${m}/${y}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function PersonalInfoSection({
  fullName,
  dateOfBirth,
  gender,
  onFullNameChange,
  onDateOfBirthChange,
  onGenderChange,
}: Props) {
  const today = new Date();

  // Must be at least 18 years old
  const maxAllowed = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  // Max 120 years old
  const minAllowed = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  );

  const [calOpen,        setCalOpen]        = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  // Default calendar view: year 2000
  const initDate = dateOfBirth ? new Date(dateOfBirth) : new Date(2000, 0, 1);
  const [viewYear,  setViewYear]  = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setCalOpen(false);
        setShowYearPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Month navigation ── */
  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    const atMax =
      viewYear > maxAllowed.getFullYear() ||
      (viewYear === maxAllowed.getFullYear() && viewMonth >= maxAllowed.getMonth());
    if (atMax) return;
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function selectDay(day: number) {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    onDateOfBirthChange(iso);
    setCalOpen(false);
    setShowYearPicker(false);
  }

  function isSelected(day: number) {
    if (!dateOfBirth) return false;
    const [y, m, d] = dateOfBirth.split("-").map(Number);
    return y === viewYear && m - 1 === viewMonth && d === day;
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    return d > maxAllowed || d < minAllowed;
  }

  // Calendar grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = getFirstDayOfMonth(viewYear, viewMonth);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Year list: maxAllowed year → minAllowed year
  const years: number[] = [];
  for (let y = maxAllowed.getFullYear(); y >= minAllowed.getFullYear(); y--) {
    years.push(y);
  }

  const canGoNext =
    viewYear < maxAllowed.getFullYear() ||
    (viewYear === maxAllowed.getFullYear() && viewMonth < maxAllowed.getMonth());

  const hasName = fullName.trim().length > 0;

  return (
    <div
      style={fontSwitzer}
      className="bg-white border border-[rgba(2,95,201,0.4)] rounded-[12px] shadow-[0px_0px_3px_2px_rgba(2,95,201,0.1)] overflow-visible flex flex-col w-full"
    >
      {/* ── Full Name ── */}
      <div className="border-b border-[#d9d9d9] flex items-start gap-2 px-4 py-5">
        <User
          size={20}
          className={`shrink-0 mt-0.5 ${hasName ? "text-[#025fc9]" : "text-[#5e5757]"}`}
        />
        <div className="flex flex-col gap-[6px] flex-1">
          <p className={`text-[16px] font-medium leading-[21px] tracking-[0.16px] ${
            hasName ? "text-[#025fc9]" : "text-[#5e5757]"
          }`}>
            FULL NAME
          </p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="John Doe"
            className="text-[16px] font-normal leading-[21px] tracking-[0.16px] text-black placeholder:text-[#a09898] bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* ── Date of Birth ── */}
      <div className="border-b border-[#d9d9d9] flex items-start gap-2 px-4 py-5 relative" ref={calRef}>
        <button
          type="button"
          onClick={() => { setCalOpen(o => !o); setShowYearPicker(false); }}
          className="shrink-0 mt-0.5 focus:outline-none text-[#5e5757] hover:text-[#025fc9] transition-colors"
        >
          <Calendar size={20} />
        </button>

        <div className="flex flex-col gap-[6px] flex-1">
          <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
            DATE OF BIRTH
          </p>
          <button
            type="button"
            onClick={() => { setCalOpen(o => !o); setShowYearPicker(false); }}
            className="text-left focus:outline-none"
          >
            {dateOfBirth
              ? <span className="text-[16px] text-black font-normal">{formatDisplay(dateOfBirth)}</span>
              : <span className="text-[16px] text-[#a09898] font-normal">DD/MM/YYYY</span>
            }
          </button>
        </div>

        {/* ── Calendar Popup ── */}
        {calOpen && (
          <div
            className="absolute left-0 top-full mt-2 z-50 bg-white border border-[#d9d9d9] rounded-[16px] shadow-[0px_8px_32px_rgba(0,0,0,0.12)] p-4 w-[300px]"
            style={fontSwitzer}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
              >
                <ChevronLeft size={18} className="text-[#5e5757]" />
              </button>

              <button
                type="button"
                onClick={() => setShowYearPicker(y => !y)}
                className="flex items-center gap-1 text-[15px] font-semibold text-black hover:text-[#025fc9] transition-colors"
              >
                {MONTHS[viewMonth]} {viewYear}
                <ChevronRight
                  size={14}
                  className={`text-[#025fc9] transition-transform ${showYearPicker ? "rotate-90" : ""}`}
                />
              </button>

              <button
                type="button"
                onClick={nextMonth}
                disabled={!canGoNext}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  canGoNext ? "hover:bg-[#f5f5f5] text-[#5e5757]" : "text-[#d9d9d9] cursor-not-allowed"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {showYearPicker ? (
              <div className="h-[200px] overflow-y-auto flex flex-col gap-0.5 pr-1">
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      setViewYear(y);
                      if (y === maxAllowed.getFullYear() && viewMonth > maxAllowed.getMonth()) {
                        setViewMonth(maxAllowed.getMonth());
                      }
                      setShowYearPicker(false);
                    }}
                    className={`w-full py-1.5 rounded-[8px] text-[15px] transition-colors ${
                      y === viewYear
                        ? "bg-[#025fc9] text-white font-semibold"
                        : "text-[#333] hover:bg-[#f0f6ff] hover:text-[#025fc9]"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map((d) => (
                    <div key={d} className="text-center text-[12px] font-medium text-[#a09898] py-1">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`e-${i}`} />;
                    const selected = isSelected(day);
                    const disabled = isDisabled(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDay(day)}
                        className={`w-8 h-8 mx-auto rounded-full text-[14px] transition-colors ${
                          selected
                            ? "bg-[#025fc9] text-white font-semibold"
                            : disabled
                              ? "text-[#d9d9d9] cursor-not-allowed"
                              : "text-[#333] hover:bg-[#f0f6ff] hover:text-[#025fc9]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Gender ── */}
      <div className="flex items-start gap-2 px-4 py-5">
        <GenderIcon className="shrink-0 mt-0.5 text-[#5e5757]" />
        <div className="flex flex-col gap-[6px] flex-1">
          <p className="text-[16px] font-medium leading-[21px] tracking-[0.16px] text-[#5e5757]">
            GENDER
          </p>
          <div className="flex flex-wrap gap-3">
            {genderOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onGenderChange(opt.value)}
                className={`px-3 py-[5px] rounded-[8px] border text-[16px] leading-[21px] tracking-[0.16px] transition-colors ${
                  gender === opt.value
                    ? "border-[#025fc9] bg-[rgba(2,95,201,0.05)] text-[#025fc9] font-medium"
                    : "border-[#d9d9d9] text-[#767676] font-normal"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
