"use client";

import { useRef, useState } from "react";
import { MapPin, Building2, Navigation } from "lucide-react";
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

  const stateFloated = stateFocused || state.length > 0;
  const cityFloated  = cityFocused  || city.length > 0;

  return (
    <div className="flex flex-col gap-[15px]">

      {/* State & City */}
      <div className="border border-[#d9d9d9] rounded-[12px] overflow-hidden">
        <div className="flex items-stretch h-[64px]">

          {/* State */}
          <div
            className={`flex-1 flex items-center gap-2 px-4 border-r transition-colors duration-200 cursor-text ${
              stateFocused ? "border-[#025fc9]" : "border-[#d9d9d9]"
            }`}
            onClick={() => stateRef.current?.focus()}
          >
            <MapPin
              size={20}
              className={`shrink-0 transition-colors ${stateFocused || state ? "text-[#025fc9]" : "text-[#5e5757]"}`}
            />
            <div className="relative flex-1 h-full">
              <label
                style={fontSwitzer}
                className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                  stateFloated
                    ? "top-[10px] text-[11px] text-[#025fc9]"
                    : "top-1/2 -translate-y-1/2 text-[16px] text-[#5e5757]"
                }`}
              >
                State
              </label>
              <input
                ref={stateRef}
                type="text"
                value={state}
                onChange={(e) => onStateChange(e.target.value)}
                onFocus={() => setStateFocused(true)}
                onBlur={() => setStateFocused(false)}
                style={fontSwitzer}
                className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
              />
            </div>
          </div>

          {/* City */}
          <div
            className={`flex-1 flex items-center gap-2 px-4 transition-colors duration-200 cursor-text ${
              cityFocused ? "border border-[#025fc9] rounded-r-[12px]" : ""
            }`}
            onClick={() => cityRef.current?.focus()}
          >
            <Building2
              size={20}
              className={`shrink-0 transition-colors ${cityFocused || city ? "text-[#025fc9]" : "text-[#5e5757]"}`}
            />
            <div className="relative flex-1 h-full">
              <label
                style={fontSwitzer}
                className={`absolute left-0 pointer-events-none transition-all duration-200 font-medium tracking-[0.16px] ${
                  cityFloated
                    ? "top-[10px] text-[11px] text-[#025fc9]"
                    : "top-1/2 -translate-y-1/2 text-[16px] text-[#5e5757]"
                }`}
              >
                City
              </label>
              <input
                ref={cityRef}
                type="text"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                onFocus={() => setCityFocused(true)}
                onBlur={() => setCityFocused(false)}
                style={fontSwitzer}
                className="absolute inset-0 w-full h-full text-[16px] text-black bg-transparent outline-none border-none pt-[28px] pb-[8px]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Use My Current Location */}
      <button type="button" className="flex items-center gap-2 px-5">
        <Navigation size={20} className="text-[#0052b4]" />
        <span style={fontSwitzer} className="text-[16px] font-medium text-[#0052b4]">
          Use My Current Location
        </span>
      </button>

    </div>
  );
}