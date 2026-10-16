import React, { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { Reveal, Kicker, ArrowIcon, CheckIcon } from "./ui";

interface StoryItem {
  id: string;
  label: string;
  shortTag: string;
  categoryTag: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
}

const STORIES: StoryItem[] = [
  {
    id: "auction",
    label: "Auction Archives",
    shortTag: "10 Photos",
    categoryTag: "Auction Records",
    title: "Wholesale & Salvage Auction Photos",
    description: "Did the car ever cross an insurance salvage lane or wholesale auction block? See actual damage photos, hammer prices, and condition grades before you list or buy.",
    highlights: [
      "Real auction lot photos before repairs were made",
      "Exact winning bid price and physical damage grading",
      "Run & drive status and key presence at the yard",
      "Damage classification: collision, water, hail, or theft",
      "Auction facility and consignor details",
    ],
    imageSrc: "/Auction Records.webp",
    imageAlt: "Historical Auction Sales Photos and Listing Preview",
  },
  {
    id: "sales",
    label: "Dealer Listings",
    shortTag: "Sale History",
    categoryTag: "Listing History",
    title: "Previous Online Marketplace Listings",
    description: "See what previous dealers listed the car for, when it sold, and how long it sat on the lot. Know historical pricing so you never underprice your vehicle.",
    highlights: [
      "Every past listing date and dealer location",
      "Previous advertised asking prices over time",
      "Mileage recorded at every single sale event",
      "Seller type: franchise dealer, independent, or private",
    ],
    imageSrc: "/Sales Listing.webp",
    imageAlt: "Sales Listing with Photos Preview",
  },
  {
    id: "usage",
    label: "Operational Use",
    shortTag: "Usage Type",
    categoryTag: "Usage Records",
    title: "Rental, Taxi, or Family Commuter?",
    description: "Hard acceleration. Hundreds of strangers. A car used as a rental, Uber, or police cruiser experiences 10x the wear of a single-family highway commuter.",
    highlights: [
      "Personal and single-family ownership",
      "Commercial rental and fleet deployment flags",
      "Taxi, ride-share, or police cruiser history",
      "Government or corporate vehicle tracking",
    ],
    imageSrc: "/Vehicle Usage.webp",
    imageAlt: "Vehicle Usage Records Preview",
  },
  {
    id: "ownership",
    label: "Ownership Tenure",
    shortTag: "Tenure & State",
    categoryTag: "Ownership Logs",
    title: "Who Owned It & For How Long",
    description: "Track every owner down to the month. See which states it lived in (snow and salt vs. dry sun) and how many miles each driver put on the odometer.",
    highlights: [
      "Total number of registered titleholders",
      "Exact ownership duration for every keeper",
      "Geographic states and rust-belt exposure",
      "Estimated annual miles driven per owner",
    ],
    imageSrc: "/Ownership History.webp",
    imageAlt: "Ownership History Record Preview",
  },
  {
    id: "title",
    label: "Title Integrity",
    shortTag: "60+ Checks",
    categoryTag: "Title Verification",
    title: "Multi-State Title Brand Audit",
    description: "60+ state-level checks. Instantly discover if the title is branded salvage, rebuilt, lemon law, flood, or fire before signing any paperwork.",
    highlights: [
      "Salvage, rebuilt, dismantled, and junk brands",
      "Active police theft and insurance recovery logs",
      "Hurricane, floodwater, and storm surge immersion",
      "Structural frame damage and catastrophic hail loss",
      "Duplicate title alerts and active lienholder flags",
    ],
    imageSrc: "/Title Brand.webp",
    imageAlt: "Title Brand Verification Preview",
  },
  {
    id: "accidents",
    label: "Collision Logs",
    shortTag: "Date & Place",
    categoryTag: "Incident Logs",
    title: "Accidents & Insurance Damage",
    description: "Zero accidents is your #1 selling point. If there was a minor scrape, show the unedited police report upfront to build instant buyer trust.",
    highlights: [
      "Incident dates, police agencies, and damage severity",
      "Point of impact mapping and structural checks",
      "Airbag deployment flags and insurance payout logs",
    ],
    imageSrc: "/Accident History.webp",
    imageAlt: "Accident History Records Preview",
  },
  {
    id: "stolen",
    label: "Theft Verification",
    shortTag: "Theft Check",
    categoryTag: "Theft Verification",
    title: "Active Stolen Vehicle Check",
    description: "Direct check against FBI and NCIC stolen auto registries. Make sure the car isn't flagged as hot or tangled up in an active criminal investigation.",
    highlights: [
      "Real-time query against FBI and state police databases",
      "Verified recovery status and clear title standing",
      "100% legal title transfer protection",
    ],
    imageSrc: "/Stolen Vehicle.webp",
    imageAlt: "Stolen Vehicle Database Cross-Check Preview",
  },
  {
    id: "odometer",
    label: "Mileage Audits",
    shortTag: "Mileage Check",
    categoryTag: "Mileage Verification",
    title: "Odometer Rollback Detection",
    description: "Mileage tampering is surprisingly common. We cross-reference DMV smog checks, dealer service visits, and title transfers to catch rollbacks instantly.",
    highlights: [
      "Chronological mileage graph from day one",
      "Automated rollback and rollover discrepancy flags",
      "Cross-checked across 50-state DMV and inspection networks",
    ],
    imageSrc: "/Odometer Rollback.webp",
    imageAlt: "Odometer Rollback Verification Preview",
  },
  {
    id: "lien",
    label: "Lien & Security",
    shortTag: "Lender Check",
    categoryTag: "Financial Security",
    title: "Bank Liens & Outstanding Loans",
    description: "Never let an unpaid bank loan stall your sale. Verify that previous lender liens are fully satisfied so the title transfers smoothly.",
    highlights: [
      "Active bank, credit union, and lender loan records",
      "Confirmation of clear legal title transferability",
      "Zero surprise repo notices or delayed closings",
    ],
    imageSrc: "/Loan and Lien.webp",
    imageAlt: "Loan and Lien Check Preview",
  },
];

export const VehicleStorytelling: React.FC = () => {
  const [activeStoryId, setActiveStoryId] = useState<string>("auction");

  const currentIndex = STORIES.findIndex((s) => s.id === activeStoryId);
  const currentStory = STORIES[currentIndex] || STORIES[0];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % STORIES.length;
    setActiveStoryId(STORIES[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + STORIES.length) % STORIES.length;
    setActiveStoryId(STORIES[prevIndex].id);
  };

  return (
    <section className="py-14 sm:py-20 border-b border-line bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-line">
          <div>
            <Kicker>Vehicle Intelligence Suite</Kicker>
            <h2 className="mt-3 text-3xl sm:text-5xl font-display font-semibold tracking-tight text-fg">
              Catch What The Seller Is Hiding
            </h2>
            <p className="mt-3 text-sm sm:text-base text-mut leading-relaxed max-w-2xl">
              One search pulls real auction photos, DMV title brands, odometer rollbacks, and previous asking prices. No corporate fluff—just raw, unedited data before money changes hands.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="font-mono text-xs text-mut font-semibold uppercase tracking-[0.14em]">
              <strong className="text-lime">{currentIndex + 1}</strong> / {STORIES.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Category"
                className="w-9 h-9 border border-line-2 bg-bg-2 hover:border-lime/60 text-fg flex items-center justify-center transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Category"
                className="w-9 h-9 border border-line-2 bg-bg-2 hover:border-lime/60 text-fg flex items-center justify-center transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Category Buttons */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-5">
          {STORIES.map((s) => {
            const isActive = activeStoryId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStoryId(s.id)}
                className={cn(
                  "px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] shrink-0 transition-all border cursor-pointer",
                  isActive
                    ? "bg-lime text-bg border-lime shadow-glow"
                    : "bg-surface border-line text-mut hover:text-fg"
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Master-Detail Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Category Navigation Dock (lg:col-span-5) */}
          <div className="hidden lg:flex flex-col space-y-1.5 lg:col-span-5">
            {STORIES.map((s) => {
              const isActive = activeStoryId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStoryId(s.id)}
                  className={cn(
                    "w-full px-4 py-3.5 border text-left transition-all cursor-pointer flex items-center justify-between group hud-corners",
                    isActive
                      ? "bg-surface-2 border-lime/80 shadow-glow text-fg"
                      : "bg-surface border-line text-mut hover:border-line-2 hover:text-fg"
                  )}
                >
                  <div className="min-w-0 pr-3">
                    <p className={cn("font-display text-[14px] font-semibold truncate", isActive ? "text-lime" : "text-fg")}>
                      {s.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut truncate mt-0.5">
                      {s.categoryTag}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "font-mono text-[9.5px] uppercase tracking-[0.18em] px-2 py-1 shrink-0 border",
                      isActive
                        ? "border-lime/50 text-lime bg-lime/10"
                        : "border-line text-mut/70"
                    )}
                  >
                    {s.shortTag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Inspector Card (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-line-2 shadow-panel hud-corners corners-on overflow-hidden">
              {/* Header Bar */}
              <div className="p-5 sm:p-6 border-b border-line">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-lime font-bold block mb-2">
                  {currentStory.categoryTag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-fg tracking-tight">
                  {currentStory.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-mut leading-relaxed">
                  {currentStory.description}
                </p>
              </div>

              {/* Image Preview Container */}
              <div className="relative w-full overflow-hidden bg-bg-2" style={{ minHeight: "360px" }}>
                <img
                  src={currentStory.imageSrc}
                  alt={currentStory.imageAlt}
                  className="w-full h-full object-contain mx-auto"
                  style={{ maxHeight: "480px" }}
                />
              </div>

              {/* Highlights List Strip */}
              <div className="p-4 sm:p-5 bg-bg-2 border-t border-line space-y-2">
                {currentStory.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-surface border border-line text-xs sm:text-[13px] text-fg/90"
                  >
                    <CheckIcon className="text-lime shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
