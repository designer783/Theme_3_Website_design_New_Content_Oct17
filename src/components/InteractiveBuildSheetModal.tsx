import { ReactNode, useEffect } from "react";
import { cn } from "../utils/vehicleLookup";
import { StickerData, BuildSheet, usd, STICKER_LINKS } from "../data";
import { Barcode, CloseIcon, ArrowIcon, LogoMark } from "./ui";

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

function sheetStickerAction(
  stickerData: StickerData | undefined,
  onOpenSticker: ((s: StickerData) => void) | undefined,
  sheet: BuildSheet
) {
  if (stickerData && onOpenSticker) {
    return (
      <button
        onClick={() => onOpenSticker(stickerData)}
        className="btn-hud border border-lime bg-lime text-bg px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:shadow-glow cursor-pointer flex items-center gap-2"
      >
        View Window Sticker <ArrowIcon />
      </button>
    );
  }
  const ext = STICKER_LINKS[sheet.vin];
  return (
    <a
      href={ext}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "btn-hud border px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] flex items-center gap-2",
        ext ? "border-cyan/60 text-cyan hover:shadow-glow" : "border-line-2 text-mut/50 pointer-events-none"
      )}
    >
      Open Sticker <ArrowIcon />
    </a>
  );
}

export function InteractiveBuildSheetModal({
  sheet,
  onClose,
  stickerData,
  onOpenSticker,
}: {
  sheet: BuildSheet;
  onClose: () => void;
  stickerData?: StickerData;
  onOpenSticker?: (s: StickerData) => void;
}) {
  const rows: [string, string][] = [
    ["Model Year", String(sheet.year)],
    ["Make", sheet.make],
    ["Model", sheet.model],
    ["Trim", sheet.trim],
    ["Body Style", sheet.bodyStyle],
    ["Engine", sheet.engine],
    ["Transmission", sheet.transmission],
    ["Drivetrain", sheet.drivetrain],
    ["Fuel Type", sheet.fuelType],
    ["Assembly Country", sheet.assemblyCountry],
    ["Exterior Color", sheet.exteriorColor],
    ["Interior Color", sheet.interiorColor],
  ];
  return (
    <Overlay onClose={onClose}>
      <ModalClose onClose={onClose} />
      <div>
        <div className="border-b border-line bg-bg-2 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LogoMark size={36} invert />
            <div>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-cyan">Factory Build Sheet</p>
              <h2 className="font-display text-lg sm:text-2xl font-semibold tracking-tight">
                {sheet.year} {sheet.make} {sheet.model}
              </h2>
            </div>
          </div>
          <span className="hidden sm:block">
            <Barcode className="!text-line-2" label={sheet.vin} />
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-x-10">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line-2/60 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">{k}</span>
                <span className="font-body text-[13px] font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-8 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-lime/60 pb-2 text-fg">
            Build Options &amp; Package Codes
          </h3>
          <ul className="mt-3 divide-y divide-line">
            {sheet.optionalEquipment.map((o, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-2.5">
                <span className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[10px] border border-line-2 px-1.5 py-0.5 text-cyan shrink-0">{o.code}</span>
                  <span className="font-body text-[13px] font-semibold truncate text-fg/90">{o.name}</span>
                </span>
                <span className={cn("font-mono text-[11.5px] whitespace-nowrap", o.standard ? "text-mut" : "font-bold text-fg")}>
                  {o.standard ? "Standard" : usd(o.price)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border border-line-2 bg-bg-2 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-cyan">Documented Original MSRP</p>
              <p className="font-display text-3xl font-semibold text-fg">{usd(sheet.originalMsrp)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onClose}
                className="btn-hud border border-line-2 bg-transparent text-mut px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:text-fg cursor-pointer"
              >
                Close
              </button>
              {sheetStickerAction(stickerData, onOpenSticker, sheet)}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

export { InteractiveBuildSheetModal as BuildSheetModal };
