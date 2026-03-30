"use client";

import { useRef, useState } from "react";
import { Navigation } from "lucide-react";
import { fontSwitzer } from "@/lib/styles";

type Props = {
  state: string;
  city: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
};

export default function LocationSection({ state, city, onStateChange, onCityChange }: Props) {
  const stateRef = useRef<HTMLInputElement>(null);
  const cityRef  = useRef<HTMLInputElement>(null);

  const [stateFocused, setStateFocused] = useState(false);
  const [cityFocused,  setCityFocused]  = useState(false);

  return (
    <div className="flex flex-col gap-[15px]">

      {/* State + City — side by side with underline */}
      <div className="flex gap-[20px] items-end">

        {/* State */}
        <div
          className={`flex-1 border-b py-[10px] cursor-text transition-colors ${
            stateFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => stateRef.current?.focus()}
        >
          <input
            ref={stateRef}
            type="text"
            value={state}
            placeholder="State"
            onChange={(e) => onStateChange(e.target.value)}
            onFocus={() => setStateFocused(true)}
            onBlur={() => setStateFocused(false)}
            style={fontSwitzer}
            className="w-full text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px] leading-[21px] font-medium"
          />
        </div>

        {/* City */}
        <div
          className={`flex-1 border-b py-[10px] cursor-text transition-colors ${
            cityFocused ? "border-[rgba(2,95,201,0.3)]" : "border-[#d9d9d9]"
          }`}
          onClick={() => cityRef.current?.focus()}
        >
          <input
            ref={cityRef}
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => onCityChange(e.target.value)}
            onFocus={() => setCityFocused(true)}
            onBlur={() => setCityFocused(false)}
            style={fontSwitzer}
            className="w-full text-[16px] text-black bg-transparent outline-none border-none placeholder:text-[#a09898] tracking-[0.16px] leading-[21px] font-medium"
          />
        </div>
      </div>

      {/* Use My Current Location */}
      <button type="button" className="flex items-center gap-[8px] px-5">
        <Navigation size={20} className="text-[#0052b4]" />
        <span style={fontSwitzer} className="text-[16px] font-medium text-[#0052b4]">
          Use My Current Location
        </span>
      </button>

    </div>
  );
}