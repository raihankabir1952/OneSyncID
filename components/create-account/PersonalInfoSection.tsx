"use client";

import { useRef, useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say" | "";

type Props = {
  fullName: string;
  dateOfBirth: string;
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
  const nameRef = useRef<HTMLInputElement>(null);
  const calRef  = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);

  const [nameFocused,    setNameFocused]    = useState(false);
  const [calOpen,        setCalOpen]        = useState(false);
  const [genderOpen,     setGenderOpen]     = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const today = new Date();
  const maxAllowed = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minAllowed = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

  const initDate = dateOfBirth ? new Date(dateOfBirth) : new Date(2000, 0, 1);
  const [viewYear,  setViewYear]  = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setCalOpen(false);
        setShowYearPicker(false);
      }
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) {
        setGenderOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = getFirstDayOfMonth(viewYear, viewMonth);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const years: number[] = [];
  for (let y = maxAllowed.getFullYear(); y >= minAllowed.getFullYear(); y--) years.push(y);

  const canGoNext =
    viewYear < maxAllowed.getFullYear() ||
    (viewYear === maxAllowed.getFullYear() && viewMonth < maxAllowed.getMonth());

  const selectedGenderLabel = genderOptions.find(o => o.value === gender)?.label;

  return (
    <div className="flex flex-col gap-[20px] w-full">

      {/* ── FULL NAME ── */}
      <div className="flex flex-col gap-[10px]">
        <p
          style={fontSwitzer}
          className={`text-[16px] font-medium tracking-[0.16px] leading-[21px] transition-colors ${
            nameFocused ? "text-[#025fc9]" : "text-[#5e5757]"
          }`}
        >
          FULL NAME
        </p>
        <div
          className={`border-b py-[10px] transition-colors cursor-text ${
            nameFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => nameRef.current?.focus()}
        >
          <input
            ref={nameRef}
            type="text"
            value={fullName}
            placeholder="John Doe"
            onChange={(e) => onFullNameChange(e.target.value)}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            style={fontSwitzer}
            className="w-full text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px]"
          />
        </div>
      </div>

      {/* ── DATE OF BIRTH ── */}
      <div className="flex flex-col gap-[10px]" ref={calRef}>
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
          DATE OF BIRTH
        </p>
        <div
          className={`border-b py-[10px] flex items-center justify-between cursor-pointer transition-colors ${
            calOpen ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => { setCalOpen(o => !o); setShowYearPicker(false); }}
        >
          <span
            style={fontSwitzer}
            className={`text-[16px] tracking-[0.16px] leading-[21px] ${
              dateOfBirth ? "text-black" : "text-[#a09898]"
            }`}
          >
            {dateOfBirth ? formatDisplay(dateOfBirth) : "dd/mm/yyyy"}
          </span>
          <Calendar size={20} className={calOpen ? "text-[#025fc9]" : "text-[#5e5757]"} />
        </div>

        {/* Calendar Popup */}
        {calOpen && (
          <div
            className="bg-white border border-[#d9d9d9] rounded-[16px] shadow-[0px_8px_32px_rgba(0,0,0,0.12)] p-4"
            style={fontSwitzer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f5]">
                <ChevronLeft size={18} className="text-[#5e5757]" />
              </button>
              <button
                type="button"
                onClick={() => setShowYearPicker(y => !y)}
                className="flex items-center gap-1 text-[15px] font-semibold text-black hover:text-[#025fc9]"
              >
                {MONTHS[viewMonth]} {viewYear}
                <ChevronRight size={14} className={`text-[#025fc9] transition-transform ${showYearPicker ? "rotate-90" : ""}`} />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                disabled={!canGoNext}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${canGoNext ? "hover:bg-[#f5f5f5] text-[#5e5757]" : "text-[#d9d9d9] cursor-not-allowed"}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {showYearPicker ? (
              <div className="h-[200px] overflow-y-auto flex flex-col gap-0.5 pr-1">
                {years.map((y) => (
                  <button key={y} type="button"
                    onClick={() => {
                      setViewYear(y);
                      if (y === maxAllowed.getFullYear() && viewMonth > maxAllowed.getMonth()) setViewMonth(maxAllowed.getMonth());
                      setShowYearPicker(false);
                    }}
                    className={`w-full py-1.5 rounded-[8px] text-[15px] transition-colors ${y === viewYear ? "bg-[#025fc9] text-white font-semibold" : "text-[#333] hover:bg-[#f0f6ff] hover:text-[#025fc9]"}`}
                  >{y}</button>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map((d) => (
                    <div key={d} className="text-center text-[12px] font-medium text-[#a09898] py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`e-${i}`} />;
                    const selected = isSelected(day);
                    const disabled = isDisabled(day);
                    return (
                      <button key={day} type="button" disabled={disabled} onClick={() => selectDay(day)}
                        className={`w-8 h-8 mx-auto rounded-full text-[14px] transition-colors ${
                          selected ? "bg-[#025fc9] text-white font-semibold"
                            : disabled ? "text-[#d9d9d9] cursor-not-allowed"
                            : "text-[#333] hover:bg-[#f0f6ff] hover:text-[#025fc9]"
                        }`}
                      >{day}</button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── GENDER ── */}
      <div className="flex flex-col gap-[10px]" ref={genderRef}>
        <p style={fontSwitzer} className="text-[16px] font-medium text-[#5e5757] tracking-[0.16px] leading-[21px]">
          GENDER
        </p>
        <div
          className={`border-b py-[10px] flex items-center justify-between cursor-pointer transition-colors ${
            genderOpen ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => setGenderOpen(o => !o)}
        >
          <span
            style={fontSwitzer}
            className={`text-[16px] tracking-[0.16px] leading-[21px] ${
              selectedGenderLabel ? "text-black" : "text-[#a09898]"
            }`}
          >
            {selectedGenderLabel ?? "Select gender"}
          </span>
          <ChevronDown size={20} className={genderOpen ? "text-[#025fc9]" : "text-[#5e5757]"} />
        </div>

        {/* Gender Dropdown */}
        {genderOpen && (
          <div className="bg-white border border-[#d9d9d9] rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
            {genderOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onGenderChange(opt.value); setGenderOpen(false); }}
                style={fontSwitzer}
                className={`w-full text-left px-4 py-3 text-[16px] tracking-[0.16px] transition-colors hover:bg-[#f0f6ff] ${
                  gender === opt.value ? "text-[#025fc9] font-medium bg-[rgba(2,95,201,0.04)]" : "text-[#333]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}