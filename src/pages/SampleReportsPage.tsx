import { useState } from "react";
import { Reveal, Kicker, ArrowIcon, HBadge } from "../components/ui";
import { REPORTS, STICKER_LINKS, REPORT_LINKS, Report, usd, BuildSheet } from "../data";
import { SITE } from "../config/site";

export function SampleReportsPage({
  onOpenReport,
  onOpenSticker,
  onOpenBuildSheet,
}: {
  onOpenReport: (vin: string) => void;
  onOpenSticker: (vin: string) => void;
  onOpenBuildSheet: (sheet: BuildSheet) => void;
}) {
  const REMOVED_SAMPLE_VINS = new Set(["2T1BURHE0FC320645", "1HGFA15547L116880"]);
  const vehicleList = Object.values(REPORTS).filter((v) => !REMOVED_SAMPLE_VINS.has(v.vin));

  return (
    <>
      <section className="border-b border-line grid-bg relative">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <Reveal variant="pulse">
            <Kicker>Unedited Proof · Zero Guesswork</Kicker>
          </Reveal>
          <Reveal variant="feed" delay={120}>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-tight text-fg">
              Real Reports. Real Cars.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-[15px] sm:text-base leading-relaxed text-mut">
              See what an unedited dossier looks like before you run yours. Direct from NMVTIS, 50-state DMVs, auction salvage yards, and OEM assembly records.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-5">
            {vehicleList.map((v, i) => (
              <div id={`sample-vehicle-${v.vin}`} key={v.vin}>
                <Reveal delay={i * 80}>
                  <SampleRow
                    v={v}
                    index={i}
                    onOpenReport={() => onOpenReport(v.vin)}
                    onOpenSticker={() => onOpenSticker(v.vin)}
                    onOpenBuildSheet={() => onOpenBuildSheet(buildSheet(v))}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function buildSheet(v: Report): BuildSheet {
  return {
    vin: v.vin,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    bodyStyle: v.bodyStyle,
    engine: v.engine,
    transmission: v.transmission,
    drivetrain: v.drivetrain,
    fuelType: v.fuelType,
    assemblyCountry: v.assemblyCountry,
    exteriorColor: v.exteriorColor,
    interiorColor: v.interiorColor,
    originalMsrp: v.originalMsrp,
    optionalEquipment: v.windowStickerData.optionalEquipment,
  };
}

function SampleRow({
  v,
  index,
  onOpenReport,
  onOpenSticker,
  onOpenBuildSheet,
}: {
  v: Report;
  index: number;
  onOpenReport: () => void;
  onOpenSticker: () => void;
  onOpenBuildSheet: () => void;
}) {
  const stickerLink = STICKER_LINKS[v.vin];
  const reportLink = REPORT_LINKS[v.vin] || `${SITE.url}/report/vin/${v.vin}`;
  return (
    <article className="group grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] border border-line bg-surface transition-all duration-300 hover:border-line-2 hover:shadow-panel hud-corners">
      <figure className="relative border-b lg:border-b-0 lg:border-r border-line overflow-hidden">
        <img
          src={v.imageUrl}
          alt={`${v.year} ${v.make} ${v.model}`}
          loading="lazy"
          className="w-full h-56 lg:h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg/70 to-transparent" aria-hidden="true" />
        <span className="absolute top-3 left-3 bg-bg-2/90 backdrop-blur font-mono text-[9px] uppercase tracking-[0.18em] text-lime border border-lime/40 px-2.5 py-1">
          File_{String(index + 1).padStart(2, "0")}
        </span>
      </figure>
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-fg">
              {v.year} {v.make} {v.model}
            </h2>
            <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.16em] text-mut">
              VIN {v.vin} · {v.bodyStyle}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 border border-lime/50 text-lime bg-lime/10">
                {v.titleStatus} Title
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 border border-line-2 text-cyan bg-cyan/10">
                {v.accidentsCount === 0 ? "0 Accidents Reported" : `${v.accidentsCount} Incident(s)`}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">Original MSRP</p>
            <p className="font-display text-3xl font-semibold tracking-tight text-lime">{usd(v.originalMsrp)}</p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line">
          {[
            ["Exterior", v.exteriorColor],
            ["Interior", v.interiorColor],
            ["Engine", v.engine],
            ["Mileage", v.mileage.toLocaleString() + " mi"],
          ].map(([k, val]) => (
            <div key={k} className="bg-surface-2/60 px-3.5 py-2.5">
              <dt className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-mut/80">{k}</dt>
              <dd className="mt-1 font-body text-[12px] font-semibold leading-snug text-fg/90">{val}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {reportLink ? (
            <a
              href={reportLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-hud inline-flex items-center gap-2 border border-lime/70 bg-lime/10 text-lime px-5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:bg-lime hover:text-bg cursor-pointer"
            >
              View Full Report <ArrowIcon />
            </a>
          ) : (
            <button
              onClick={onOpenReport}
              className="btn-hud inline-flex items-center gap-2 border border-lime/70 bg-lime/10 text-lime px-5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:bg-lime hover:text-bg cursor-pointer"
            >
              View Full Report <ArrowIcon />
            </button>
          )}
          {stickerLink ? (
            <a
              href={stickerLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-hud inline-flex items-center gap-2 border border-line-2 bg-surface-2 text-fg px-5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:border-lime/60 cursor-pointer"
            >
              View Window Sticker <ArrowIcon />
            </a>
          ) : (
            <button
              onClick={onOpenSticker}
              className="btn-hud inline-flex items-center gap-2 border border-line-2 bg-surface-2 text-fg px-5 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:border-lime/60 cursor-pointer"
            >
              View Window Sticker <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default SampleReportsPage;
