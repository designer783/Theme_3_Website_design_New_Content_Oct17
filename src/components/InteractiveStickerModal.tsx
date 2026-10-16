import { ReactNode, useEffect } from "react";
import { cn } from "../utils/vehicleLookup";
import { StickerData, usd } from "../data";
import { Barcode, CloseIcon, LogoMark } from "./ui";

function Overlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[90] bg-black/85 backdrop-blur-[3px] overflow-y-auto p-3 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="min-h-full flex items-start justify-center py-4 sm:py-10"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          className="modal-panel relative w-full max-h-[calc(100vh-64px)] overflow-y-auto border bg-doc text-doc-ink border-line-2"
          style={{ maxWidth: 980 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center border cursor-pointer transition-colors border-doc-ink/30 bg-doc text-doc-ink hover:bg-doc-ink hover:text-doc"
    >
      <CloseIcon />
    </button>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={cn("w-4 h-4", i <= n ? "text-doc-ink" : "text-doc-ink/20")} fill="currentColor" aria-hidden="true">
          <path d="M12 2.5 15 9l7 .7-5.3 4.6 1.6 6.9L12 17.5 5.7 21.2l1.6-6.9L2 9.7 9 9z" />
        </svg>
      ))}
    </span>
  );
}

export function InteractiveStickerModal({ sticker, onClose }: { sticker: StickerData; onClose: () => void }) {
  const maxMpg = 40;
  return (
    <Overlay onClose={onClose}>
      <ModalClose onClose={onClose} />
      <div className="bg-doc text-doc-ink grid-bg-doc">
        <div className="border-b-2 border-doc-ink bg-doc-ink text-doc px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LogoMark size={36} invert />
            <div>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-lime">Original Factory Window Sticker</p>
              <p className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-doc/90">Monroney Act Compliant Label</p>
            </div>
          </div>
          <span className="hidden sm:block">
            <Barcode className="!text-line-2" label="SHEET NO. 01/01" />
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <section className="border-2 border-doc-ink">
            <h3 className="bg-doc-ink text-doc px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-center">
              Vehicle Description
            </h3>
            <div className="px-5 sm:px-8 py-6 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
              <div>
                <p className="font-display text-3xl sm:text-5xl font-semibold tracking-tight uppercase">{sticker.make}</p>
                <p className="mt-2 font-body text-lg sm:text-xl font-semibold">
                  {sticker.year} {sticker.model} <span className="text-doc-ink/50">/ {sticker.trim}</span>
                </p>
                <p className="mt-2 font-mono text-[11px] sm:text-[12px] tracking-[0.14em]">{sticker.vin}</p>
              </div>
              <div className="flex sm:block gap-5 sm:gap-8 sm:text-right">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-doc-ink/50">Exterior</p>
                  <p className="font-body text-[13px] font-semibold max-w-[180px]">{sticker.exteriorColor}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-doc-ink/50">Interior</p>
                  <p className="font-body text-[13px] font-semibold max-w-[180px]">{sticker.interiorColor}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 border-2 border-doc-ink">
            <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
              Standard Equipment Included At No Extra Charge
            </h3>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-doc-ink">
              {sticker.standardFeatures.map((f) => (
                <div key={f.category} className="px-5 py-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-warn">{f.category}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {f.items.map((it, i) => (
                      <li key={i} className="flex gap-2 text-[11.5px] leading-snug text-doc-ink/85">
                        <span className="mt-[7px] h-1 w-1 shrink-0 bg-doc-ink" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 border-2 border-doc-ink">
            <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
              Warranty
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 px-5 py-4">
              {sticker.warranty.map((w, i) => (
                <li key={i} className="flex gap-2 py-1 text-[12px] text-doc-ink/85">
                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-doc-ink" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 border-2 border-doc-ink">
            <h3 className="bg-doc-ink text-doc px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-center">
              Manufacturer&rsquo;s Suggested Retail Price
            </h3>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-doc-ink text-[12px]">
              <div className="px-5 py-4 space-y-1.5 max-h-56 overflow-y-auto">
                {sticker.optionalEquipment.map((o, i) => (
                  <p key={i} className="flex items-baseline justify-between gap-3">
                    <span className="text-doc-ink/85">
                      {o.name} <span className="font-mono text-[9px] text-doc-ink/40">[{o.code}]</span>
                    </span>
                    <span className={cn("font-mono whitespace-nowrap", o.standard ? "text-doc-ink/40" : "font-bold")}>
                      {o.standard ? "Standard" : usd(o.price)}
                    </span>
                  </p>
                ))}
              </div>
              <div className="px-5 py-4 flex flex-col justify-between gap-4 bg-doc-2/60">
                <div className="space-y-2 font-mono text-[12px]">
                  <p className="flex justify-between gap-3">
                    <span>Base Vehicle</span>
                    <span>{usd(sticker.basePrice)}</span>
                  </p>
                  <p className="flex justify-between gap-3">
                    <span>Options &amp; Packages</span>
                    <span>{usd(sticker.totalOptionsPrice)}</span>
                  </p>
                  <p className="flex justify-between gap-3 border-b-2 border-doc-ink pb-2">
                    <span>Original Shipping Charge</span>
                    <span>{usd(sticker.destinationCharge)} .00</span>
                  </p>
                </div>
                <div className="bg-doc-ink px-4 py-3">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-doc/70">
                    Total Vehicle Price <span className="font-mono text-[9px] normal-case tracking-normal">(Includes Pre-Delivery Service)</span>
                  </p>
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-lime">
                    {usd(sticker.totalMSRP)}
                    <span className="text-xl align-top">.00</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="border-t-2 border-doc-ink px-5 py-3 font-mono text-[9.5px] leading-relaxed text-doc-ink/50">
              License and title fees, state and local taxes and dealer option and accessories are not included in the manufacturer&rsquo;s
              suggested retail price.
            </p>
          </section>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <section className="border-2 border-doc-ink">
              <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
                Fuel Economy and Environment
              </h3>
              <div className="px-5 py-4 bars-in">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-display text-4xl sm:text-5xl font-semibold leading-none">{sticker.fuelEconomy.combinedMpg}</span>
                    <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-doc-ink/60">MPG Combined</span>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <p>{sticker.fuelEconomy.cityMpg} City</p>
                    <p>{sticker.fuelEconomy.highwayMpg} Highway</p>
                  </div>
                </div>
                <div className="mt-4 border-2 border-doc-ink p-1">
                  <div
                    className="h-3 bg-doc-ink transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.round((sticker.fuelEconomy.combinedMpg / maxMpg) * 100))}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] text-doc-ink/70">
                  Annual Fuel Cost: <span className="font-bold text-doc-ink">{usd(sticker.fuelEconomy.annualFuelCost)}</span>
                </p>
              </div>
            </section>

            <section className="border-2 border-doc-ink">
              <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
                Government 5-Star Safety Ratings
              </h3>
              <div className="px-5 py-4 space-y-3 font-mono text-[12px]">
                <div className="flex items-center justify-between border-b border-doc-ink/30 pb-2">
                  <span className="font-bold">Overall Vehicle Score</span>
                  <Stars n={sticker.safetyRatings.overall} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Frontal Crash</span>
                  <Stars n={sticker.safetyRatings.frontalCrash} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Side Crash</span>
                  <Stars n={sticker.safetyRatings.sideCrash} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Rollover</span>
                  <Stars n={sticker.safetyRatings.rollover} />
                </div>
                <p className="border-t border-doc-ink/30 pt-2 text-[9.5px] leading-relaxed text-doc-ink/60">
                  Star ratings range from 1 to 5 stars (★★★★★) with 5 being the highest. Source: National Highway Traffic Safety Administration (NHTSA).
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

export { InteractiveStickerModal as StickerModal };
