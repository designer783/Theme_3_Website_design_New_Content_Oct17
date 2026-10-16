import { ReactNode, useEffect } from "react";
import { cn } from "../utils/vehicleLookup";
import { Report, StickerData, BuildSheet, buildSheetFrom as buildSheetFromLocal, usd, STICKER_LINKS } from "../data";
import { Barcode, CheckIcon, CloseIcon, ArrowIcon, LogoMark } from "./ui";

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
          className="modal-panel relative w-full max-h-[calc(100vh-64px)] overflow-y-auto border bg-surface text-fg border-line-2 shadow-panel"
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
      className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center border cursor-pointer transition-colors border-line-2 bg-surface-2 text-fg hover:border-lime/60 hover:text-lime"
    >
      <CloseIcon />
    </button>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-surface-2/60 px-3.5 py-2.5">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-mut">{label}</p>
      <p className="mt-1 font-body text-[13px] font-semibold text-fg leading-snug">{value}</p>
    </div>
  );
}

export function InteractiveReportModal({
  report,
  onClose,
  onOpenSticker,
  onOpenBuildSheet,
}: {
  report: Report;
  onClose: () => void;
  onOpenSticker: (s: StickerData) => void;
  onOpenBuildSheet: (b: BuildSheet) => void;
}) {
  const mv = report.currentMarketValue;
  const stickerLink = STICKER_LINKS[report.vin];
  return (
    <Overlay onClose={onClose}>
      <ModalClose onClose={onClose} />
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg-2 px-5 sm:px-8 py-4">
        <div className="flex items-center gap-4 min-w-0">
          <LogoMark size={36} invert />
          <div className="min-w-0">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-lime truncate">Vehicle History Report</p>
            <h2 className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-fg truncate">
              {report.year} {report.make} {report.model} {report.trim}
            </h2>
          </div>
        </div>
        <div className="hidden md:block">
          <Barcode className="!text-line-2" label={report.vin} />
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <figure className="relative border border-line-2 overflow-hidden hud-corners corners-on bg-surface-2">
            <img src={report.imageUrl} alt={`${report.year} ${report.make} ${report.model}`} className="w-full h-56 sm:h-64 object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg/80 to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-0 left-0 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-fg/90 bg-bg/80 px-3 py-1.5">
              VIN {report.vin}
            </figcaption>
            <span className="absolute top-0 right-0 bg-lime text-bg font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
              {report.titleStatus} Title
            </span>
          </figure>

          <div>
            <div className="grid grid-cols-2 gap-2">
              <SpecCell label="Engine" value={report.engine} />
              <SpecCell label="Transmission" value={report.transmission} />
              <SpecCell label="Drivetrain" value={report.drivetrain} />
              <SpecCell label="Fuel Type" value={report.fuelType} />
              <SpecCell label="Body Style" value={report.bodyStyle} />
              <SpecCell label="Assembly" value={report.assemblyCountry} />
              <SpecCell label="Exterior" value={report.exteriorColor} />
              <SpecCell label="Interior" value={report.interiorColor} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <SpecCell label="Mileage" value={report.mileage.toLocaleString() + " mi"} />
              <SpecCell label="Odometer Status" value={report.odometerStatus} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 border border-lime/50 bg-lime/10 text-lime px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                <CheckIcon /> {report.titleStatus} Title Verified
              </span>
              <span className="inline-flex items-center gap-1.5 border border-line-2 bg-surface-2 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fg">
                {report.accidentsCount} Accidents Reported
              </span>
              <span className="inline-flex items-center gap-1.5 border border-line-2 bg-surface-2 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fg">
                {report.ownersCount} Owner{report.ownersCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </section>

        <section className="border border-line bg-bg-2/60">
          <div className="flex items-center justify-between border-b border-line px-4 sm:px-6 py-3">
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-fg">Current Market Value</h3>
            <span className="font-mono text-[10px] text-mut">AVG {mv.averageDaysOnMarket} DAYS ON MARKET</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-line border-line">
            {[
              { k: "Trade-In", v: mv.tradeIn },
              { k: "Private Party", v: mv.privateParty },
              { k: "Dealer Retail", v: mv.dealerRetail },
              { k: "Original MSRP", v: report.originalMsrp, hl: true },
            ].map((m) => (
              <div key={m.k} className={cn("px-4 sm:px-5 py-4", m.hl ? "bg-lime" : "bg-surface")}>
                <p className={cn("font-mono text-[9px] uppercase tracking-[0.22em]", m.hl ? "text-bg/60" : "text-mut")}>{m.k}</p>
                <p className={cn("mt-1.5 font-display text-xl sm:text-2xl font-semibold", m.hl ? "text-bg" : "text-fg")}>{usd(m.v)}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h3 className="flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Title Brand Check
            </h3>
            <ul className="mt-4 divide-y divide-line border border-line bg-bg-2/50">
              {report.titleBrands.map((t) => (
                <li key={t.name} className="flex items-start gap-3 px-4 py-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-lime/50 bg-lime/10 text-lime">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-body text-[13px] font-semibold text-fg">{t.name}</p>
                    <p className="text-[12px] text-mut leading-snug">{t.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border border-line bg-bg-2/50 px-4 py-3 flex items-center justify-between gap-3">
              <p className="font-body text-[13px] font-semibold text-fg">Safety Recalls</p>
              {report.safetyRecalls.length === 0 ? (
                <span className="inline-flex items-center gap-1.5 border border-lime/50 bg-lime/10 text-lime px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <CheckIcon /> None on File
                </span>
              ) : (
                <ul className="space-y-1.5 text-right">
                  {report.safetyRecalls.map((r) => (
                    <li key={r.id} className="font-mono text-[10px] text-mut">
                      {r.id} — {r.component} ·{" "}
                      <span className={r.status === "Closed" ? "text-lime font-semibold" : "text-warn font-semibold"}>
                        {r.status.toUpperCase()}
                        {r.closedDate ? ` ${r.closedDate}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Ownership Timeline
            </h3>
            <ul className="mt-4 space-y-2.5">
              {report.ownershipTimeline.map((o) => (
                <li key={o.ownerNumber} className="border border-line bg-bg-2/50 px-4 py-3 flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-lime/50 bg-lime/10 text-lime font-display text-sm font-semibold">
                    {o.ownerNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="font-body text-[13px] font-semibold text-fg">
                      {o.yearPurchased} — {o.yearEnded} <span className="text-mut font-medium">({o.duration})</span>
                    </p>
                    <p className="font-mono text-[10.5px] text-mut truncate">
                      {o.location} · {o.usageType} · ~{o.estimatedMilesPerYear.toLocaleString()} mi/yr
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Sales History
            </h3>
            <ul className="mt-4 divide-y divide-line border border-line bg-bg-2/50">
              {report.salesHistory.map((s, i) => (
                <li key={i} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] text-mut">{s.date}</p>
                    <p className="font-body text-[13px] font-semibold text-fg">{s.sellerType}</p>
                    <p className="font-mono text-[10px] text-mut/80">
                      {s.mileage.toLocaleString()} mi · {s.condition}
                    </p>
                  </div>
                  <p className="font-display text-lg font-semibold text-cyan whitespace-nowrap">{usd(s.price)}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Service Records
            </h3>
            <ul className="mt-4 space-y-2.5">
              {report.serviceRecords.map((s, i) => (
                <li key={i} className="border border-line border-l-2 border-l-cyan/70 bg-bg-2/50 px-4 py-3">
                  <p className="font-mono text-[10px] text-mut">
                    {s.date} · {s.odometer.toLocaleString()} mi · {s.source}
                  </p>
                  <p className="mt-1 text-[12.5px] text-fg/80 leading-snug">{s.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-line pt-6">
          <button
            onClick={() => onOpenSticker(report.windowStickerData)}
            className="btn-hud flex-1 inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:shadow-glow cursor-pointer"
          >
            View Window Sticker <ArrowIcon />
          </button>
          <button
            onClick={() => onOpenBuildSheet(buildSheetFromLocal(report))}
            className="btn-hud flex-1 inline-flex items-center justify-center gap-2.5 border border-line-2 bg-surface-2 text-fg px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:border-lime/60 cursor-pointer"
          >
            View Build Sheet <ArrowIcon />
          </button>
          {stickerLink && (
            <a
              href={stickerLink}
              target="_blank"
              rel="noreferrer"
              className="btn-hud inline-flex items-center justify-center gap-2.5 border border-line-2 bg-transparent text-mut px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:border-lime/70 hover:text-lime cursor-pointer"
            >
              Open Official Sticker <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </Overlay>
  );
}

export { InteractiveReportModal as ReportModal };
