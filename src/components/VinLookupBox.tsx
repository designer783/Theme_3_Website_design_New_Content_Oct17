import React, { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { ArrowIcon } from "./ui";
import { SITE } from "../config/site";
import type { PlanKind } from "../config/plans";
import { buildPreviewUrl, rememberLookup, PreviewLookup } from "../utils/vehicleLookup";

const PLATE_LOOKUP_URL = `${SITE.appUrl}/landing/no_get_license`;

export interface VinLookupBoxProps {
  className?: string;
  initialMode?: "vin" | "plate";
  vinRedirectPath?: string;
  product?: PlanKind;
  onSearchVin?: (vin: string) => void;
}

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

import { ALL_COUNTRY_CODES } from "../data/countries";

export const VinLookupBox: React.FC<VinLookupBoxProps> = ({
  className = "",
  initialMode = "vin",
  vinRedirectPath = "/members/vin-check/ws-preview",
  product = "sticker",
  onSearchVin,
}) => {
  const [mode, setMode] = useState<"vin" | "plate">(initialMode);
  const [vinInput, setVinInput] = useState("");
  const [plateInput, setPlateInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedState, setSelectedState] = useState("CA");
  const [showVinHelp, setShowVinHelp] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);
    setVinInput(val);
    setErrorMessage("");
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    setPlateInput(val);
    setErrorMessage("");
  };

  const getContact = () => {
    const digits = phoneInput.replace(/\D/g, "");
    return {
      email: emailInput.trim(),
      mobile: digits ? `${phoneCountryCode}${digits}` : "",
    };
  };

  const redirectTo = (previewPath: string, vin: string, plate?: string) => {
    const lookup: PreviewLookup = { kind: product as PlanKind, previewPath, vin, ...getContact(), plate };
    rememberLookup(lookup);
    window.location.href = buildPreviewUrl(lookup);
  };

  const lookupPlate = async (plate: string) => {
    setIsAnalyzing(true);
    setErrorMessage("");
    setAnalyzingStep("Looking up license plate registration...");

    const { email, mobile } = getContact();
    try {
      const res = await fetch(PLATE_LOOKUP_URL, {
        method: "POST",
        body: new URLSearchParams({ email, mobile, plate, state: selectedState }),
      });
      const data = await res.json();
      if (data?.status === "success" && data.encrypted_vin) {
        setAnalyzingStep("Vehicle found. Loading preview...");
        redirectTo("/members/vin-check/license-preview", data.encrypted_vin, `${plate} (${selectedState})`);
        return;
      }
      setErrorMessage("License plate not found. Please check the plate number and state and try again.");
    } catch {
      setErrorMessage("There was an error looking up this license plate. Please try again.");
    }
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(emailInput.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (mode === "vin") {
      const clean = vinInput.trim();
      if (!clean) {
        setErrorMessage("Please enter a vehicle identification number.");
        return;
      }
      if (clean.length < 11) {
        setErrorMessage("A standard VIN is between 11 and 17 characters.");
        return;
      }

      if (onSearchVin) {
        onSearchVin(clean);
      } else {
        setIsAnalyzing(true);
        setAnalyzingStep("Loading vehicle preview...");
        redirectTo(vinRedirectPath, clean);
      }
    } else {
      const clean = plateInput.trim();
      if (!clean) {
        setErrorMessage("Please enter your license plate number.");
        return;
      }
      lookupPlate(clean);
    }
  };

  return (
    <div className={cn("w-full bg-surface border border-line-2 shadow-panel hud-corners corners-on overflow-hidden", className)}>
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-line bg-bg-2 px-3 pt-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            id="tab-lookup-vin"
            onClick={() => {
              setMode("vin");
              setErrorMessage("");
            }}
            className={cn(
              "cursor-pointer px-4 sm:px-5 py-2.5 font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition-colors border-b-2",
              mode === "vin"
                ? "border-lime text-lime bg-surface/60"
                : "border-transparent text-mut hover:text-fg"
            )}
          >
            By VIN
          </button>
          <button
            type="button"
            id="tab-lookup-plate"
            onClick={() => {
              setMode("plate");
              setErrorMessage("");
            }}
            className={cn(
              "cursor-pointer px-4 sm:px-5 py-2.5 font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition-colors border-b-2",
              mode === "plate"
                ? "border-lime text-lime bg-surface/60"
                : "border-transparent text-mut hover:text-fg"
            )}
          >
            By US License Plate
          </button>
        </div>

        {/* VIN Helper Link */}
        <button
          type="button"
          id="btn-vin-help"
          onClick={() => setShowVinHelp(!showVinHelp)}
          className="hidden sm:flex cursor-pointer font-mono text-[10.5px] uppercase tracking-[0.12em] text-mut hover:text-lime items-center gap-1.5 transition-colors pr-2"
        >
          <span className="h-3.5 w-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-bold">?</span>
          <span>Where is the VIN?</span>
        </button>
      </div>

      {/* Lookup Form */}
      <div className="p-5 sm:p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Contact Info Fields: Email & Phone with Country Code */}
          <div className="grid grid-cols-1 gap-3">
            <div className="relative border border-line-2 bg-bg-2 focus-within:border-lime/70 transition-all flex items-center">
              <span className="pl-3.5 pr-2 text-mut/80 flex items-center pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-lime">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="lookup-email-field"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Enter Your Email Address *"
                className="w-full py-3.5 pr-3.5 bg-transparent text-fg font-body text-xs sm:text-sm placeholder:text-mut/50 outline-none"
              />
            </div>

            <div className="flex items-stretch border border-line-2 bg-bg-2 focus-within:border-lime/70 transition-all">
              <div className="relative shrink-0 flex items-center">
                <select
                  id="phone-country-code"
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className="pl-3 pr-6 py-3.5 bg-surface-2 text-fg font-mono text-xs font-bold border-r border-line outline-none cursor-pointer appearance-none"
                >
                  {ALL_COUNTRY_CODES.map((item, idx) => (
                    <option key={`${item.code}-${item.country}-${idx}`} value={item.code} className="bg-bg text-fg">
                      {item.code} ({item.country})
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 text-mut text-[9px]">▼</span>
              </div>
              <input
                id="lookup-phone-field"
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="Enter Your Phone Number"
                className="w-full px-3.5 py-3.5 bg-transparent text-fg font-body text-xs sm:text-sm placeholder:text-mut/50 outline-none"
              />
            </div>
          </div>

          {/* Primary Identifier Field (VIN or Plate) */}
          {mode === "vin" ? (
            <div className="relative border border-line-2 bg-bg-2 focus-within:border-lime/70 focus-within:shadow-glow transition-all flex items-center">
              <span className="pl-3.5 pr-2 text-mut/80 flex items-center pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-cyan">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </span>
              <input
                id="vin-input-field"
                type="text"
                value={vinInput}
                onChange={handleVinChange}
                placeholder="ENTER 17-CHARACTER VIN NUMBER"
                className="vin-input w-full py-3.5 pr-4 bg-transparent font-mono text-sm sm:text-[15px] font-semibold uppercase tracking-[0.18em] text-fg placeholder:font-sans placeholder:tracking-normal placeholder:text-mut/50 outline-none"
                maxLength={17}
                disabled={isAnalyzing}
              />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="flex-1 border border-line-2 bg-bg-2 focus-within:border-lime/70 transition-all flex items-center">
                <span className="pl-3.5 pr-2 text-mut/80 flex items-center pointer-events-none" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-lime">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  id="plate-input-field"
                  type="text"
                  value={plateInput}
                  onChange={handlePlateChange}
                  placeholder="ENTER LICENSE PLATE"
                  className="w-full py-3.5 pr-4 bg-transparent font-mono text-sm uppercase tracking-[0.16em] text-fg placeholder:font-sans placeholder:tracking-normal placeholder:text-mut/50 outline-none"
                  maxLength={8}
                  disabled={isAnalyzing}
                />
              </div>

              <div className="relative sm:w-52 shrink-0 border border-line-2 bg-bg-2 flex items-center">
                <select
                  id="state-select-field"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-transparent font-mono text-xs text-fg uppercase tracking-[0.12em] outline-none cursor-pointer py-3.5 pl-3.5 pr-7 appearance-none"
                  disabled={isAnalyzing}
                >
                  {US_STATES.map((st) => (
                    <option key={st.code} value={st.code} className="bg-bg text-fg">
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 text-mut text-[9px]">▼</span>
              </div>
            </div>
          )}

          <button
            id="btn-submit-vin"
            type="submit"
            disabled={isAnalyzing}
            className="btn-hud w-full py-4 bg-lime text-bg font-display text-[12.5px] font-semibold uppercase tracking-[0.16em] cursor-pointer flex items-center justify-center gap-2 hover:shadow-glow disabled:opacity-60"
          >
            {isAnalyzing ? (
              <span>Pulling Live Records...</span>
            ) : (
              <>
                <span>Get Vehicle Records</span>
                <ArrowIcon />
              </>
            )}
          </button>

          {/* Error message */}
          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800 text-xs font-mono text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Analyzing notice */}
          {isAnalyzing && (
            <div className="p-3 bg-cyan-950/40 border border-cyan-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-cyan animate-ping" />
              <span>{analyzingStep}</span>
            </div>
          )}
        </form>

        {/* Mobile VIN Helper Link */}
        <div className="sm:hidden pt-2 border-t border-line text-xs">
          <button
            type="button"
            onClick={() => setShowVinHelp(!showVinHelp)}
            className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-mut hover:text-lime flex items-center gap-1.5 cursor-pointer"
          >
            <span className="h-3.5 w-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-bold">?</span>
            <span>Where is the VIN?</span>
          </button>
        </div>
      </div>

      {/* Where can I find the VIN Helper Drawer */}
      {showVinHelp && (
        <div className="p-4 bg-bg-2 text-fg border-t border-line space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime font-bold">
              Where to Locate Your 17-Digit VIN
            </span>
            <button
              onClick={() => setShowVinHelp(false)}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut hover:text-fg px-2 py-0.5 border border-line cursor-pointer"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-mut">
            <div className="bg-surface p-3 border border-line">
              <span className="font-display text-[12px] font-bold text-fg block mb-1">1. Driver's Windshield</span>
              Look through the lower corner of the front windshield on the driver's side.
            </div>
            <div className="bg-surface p-3 border border-line">
              <span className="font-display text-[12px] font-bold text-fg block mb-1">2. Door Jamb Pillar</span>
              Open the driver's side door and locate the official manufacturer certification sticker.
            </div>
            <div className="bg-surface p-3 border border-line">
              <span className="font-display text-[12px] font-bold text-fg block mb-1">3. Title &amp; Registration</span>
              Listed on your official vehicle title, registration slip, or insurance card.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
