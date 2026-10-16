import { Reveal, Kicker, Barcode, ArrowIcon, CheckIcon } from "../components/ui";
import { Page } from "../components/Header";
import { cn } from "../utils/vehicleLookup";
import { RevisitBanner } from "../components/RevisitBanner";

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[11px] font-semibold bg-surface-2 border border-line-2 px-1.5 py-0.5 text-cyan">{children}</code>;
}

function SectionFrame({
  n,
  title,
  lede,
  verified,
  children,
}: {
  n: string;
  title: string;
  lede: React.ReactNode;
  verified?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border border-line bg-surface/70">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2/70 px-5 sm:px-7 py-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[13px] font-bold text-lime">
              {n}
              <span className="text-line-2">/</span>
            </span>
            <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.1em] text-fg">{title}</h3>
          </div>
          {verified && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-lime border border-lime/50 bg-lime/5 px-2.5 py-1">
              <CheckIcon /> {verified}
            </span>
          )}
        </div>
        <div className="px-5 sm:px-7 py-6 space-y-6">
          <p className="text-[13px] leading-relaxed text-mut max-w-3xl">{lede}</p>
          {children}
        </div>
      </section>
    </Reveal>
  );
}

const demoCard = "border border-line bg-surface p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:border-line-2";
const demoBtn =
  "btn-hud w-full inline-flex items-center justify-center gap-2 border px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[4px] cursor-pointer";

export function StyleGuidePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section className="grid-bg relative">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <Reveal variant="pulse">
          <Kicker>Design System Reference</Kicker>
        </Reveal>
        <Reveal variant="feed" delay={120}>
          <h1 className="mt-5 font-display text-4xl sm:text-6xl tracking-tight leading-[1.02] font-semibold text-fg">Style Guide</h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mut">
            Reference documentation for layout symmetry, component ratios, and the token hierarchy used across the application.
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {/* 1 — cards */}
          <SectionFrame
            n="1"
            title="Equal-Height Card Symmetry"
            verified="Symmetrical Alignment Verified"
            lede={
              <>
                Grid cards must enforce <Code>items-stretch</Code> with <Code>h-full flex flex-col justify-between</Code>. Bottom
                action anchors align on the exact same baseline regardless of body copy length.
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              <div className={demoCard}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-lime/10 border border-lime/40 text-lime">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                        <path d="M6 2.8h8L19 8v13.2H6z" />
                      </svg>
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] border border-line-2 text-mut px-2 py-0.5">Tier 1</span>
                  </div>
                  <h4 className="font-display text-[15px] font-semibold text-fg">Single Vehicle Report</h4>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-mut">
                    Complete NMVTIS accident history, title brand verification, and odometer check for one VIN.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-dashed border-line-2/60">
                  <button className={cn(demoBtn, "border-line-2 bg-surface-2 text-fg hover:border-lime/60")}>
                    Select Report <ArrowIcon />
                  </button>
                </div>
              </div>

              <div className={cn(demoCard, "relative border-lime/70 shadow-glow")}>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-bg font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 whitespace-nowrap">
                  Symmetrical Anchor
                </span>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-lime/10 border border-lime/40 text-lime">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                        <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
                        <path d="M3.5 7.5 12 12l8.5-4.5" />
                      </svg>
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] border border-lime bg-lime/10 text-lime px-2 py-0.5">
                      Recommended
                    </span>
                  </div>
                  <h4 className="font-display text-[15px] font-semibold text-fg">Report + Monroney Sticker</h4>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-mut">
                    All historical title and recall data paired with the original factory window sticker, itemizing OEM options,
                    package codes, MSRP invoice breakdown, and fuel economy.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-dashed border-line-2/60">
                  <button className={cn(demoBtn, "border-lime bg-lime text-bg hover:shadow-glow")}>
                    Select Bundle <ArrowIcon />
                  </button>
                </div>
              </div>

              <div className={demoCard}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-lime/10 border border-lime/40 text-lime">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                        <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
                      </svg>
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] border border-line-2 text-mut px-2 py-0.5">Volume Pack</span>
                  </div>
                  <h4 className="font-display text-[15px] font-semibold text-fg">Dealer 5-Pack Credits</h4>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-mut">
                    Five non-expiring search credits for automotive buyers, dealers, and collectors. Instant PDF export,
                    printable window labels, and live vehicle valuation insights on demand.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-dashed border-line-2/60">
                  <button className={cn(demoBtn, "border-line-2 bg-surface-2 text-fg hover:border-lime/60")}>
                    Select 5-Pack <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>
          </SectionFrame>

          {/* 2 — buttons */}
          <SectionFrame
            n="2"
            title="Symmetrical 2:1 Button Ratio & Centered Centering"
            lede={
              <>
                Horizontal padding is exactly 2x vertical padding (<Code>px-6 py-3</Code> = 24px/12px, <Code>px-5 py-2.5</Code> =
                20px/10px). Symmetrical left and right icon clearances ensure balance.
              </>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {[
                { note: "px-6 py-3 • 24px/12px", label: "Dark Industrial", cls: "border-line-2 bg-surface-2 text-fg hover:border-lime/60" },
                { note: "px-6 py-3 • 24px/12px", label: "Precision Blue", cls: "border-cyan/60 bg-cyan/10 text-cyan hover:bg-cyan/20" },
                { note: "px-6 py-3 • 24px/12px", label: "Secondary White", cls: "border-line-2 bg-transparent text-mut hover:text-fg" },
              ].map((b) => (
                <div key={b.label} className="border border-line bg-surface p-4 flex flex-col items-center justify-between gap-3 h-full">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-mut/70">{b.note}</span>
                  <button className={cn(demoBtn, "px-6 py-3", b.cls)}>
                    {b.label} <ArrowIcon />
                  </button>
                </div>
              ))}
              <div className="border border-line bg-surface p-4 flex flex-col items-center justify-between gap-3 h-full">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-mut/70">px-4 py-2 • 16px/8px</span>
                <button className={cn(demoBtn, "px-4 py-2 border-lime/60 bg-lime/10 text-lime hover:bg-lime hover:text-bg")}>
                  <CheckIcon /> Verified Pill CTA
                </button>
              </div>
            </div>
          </SectionFrame>

          {/* 3 — inputs */}
          <SectionFrame
            n="3"
            title="Input Field Symmetrical Balance"
            lede="Left icon padding mirrors right badge padding. Vertical padding perfectly centers the text baseline within standard height containers."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-mut pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                    <rect x="3" y="9" width="18" height="11" rx="1" />
                    <path d="M7 9V6.5A1.5 1.5 0 0 1 8.5 5h7A1.5 1.5 0 0 1 17 6.5V9" />
                  </svg>
                </span>
                <input
                  type="text"
                  readOnly
                  value="2T1BURHE0FC320645"
                  className="w-full pl-10 pr-24 py-3 bg-surface border border-line-2 text-fg font-mono text-[13px] uppercase tracking-[0.14em] font-medium"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center font-mono text-[10.5px] font-bold text-lime pointer-events-none">
                  17/17 PASS
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-mut pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M7 10h2M7 14h2M15 10h2" />
                  </svg>
                </span>
                <input
                  type="text"
                  readOnly
                  value="CALIFORNIA • 7XYZ890"
                  className="w-full pl-10 pr-24 py-3 bg-surface border border-line-2 text-fg font-mono text-[13px] uppercase tracking-[0.14em] font-medium"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center font-mono text-[10.5px] font-bold text-cyan pointer-events-none">
                  PLATE OK
                </span>
              </div>
            </div>
          </SectionFrame>

          {/* 4 — badges */}
          <SectionFrame
            n="4"
            title="Single-Line Symmetrical Verification Badges"
            lede={
              <>
                Labels inside pills never wrap or truncate. Padding is mathematically matched at <Code>px-2.5 py-0.5</Code> or{" "}
                <Code>px-3 py-1</Code> with <Code>rounded-xs</Code>.
              </>
            }
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 border border-lime/50 bg-lime/10 text-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                <CheckIcon /> Clean Title Verified
              </span>
              <span className="inline-flex items-center gap-1.5 border border-line-2 bg-surface-2 text-fg px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                <CheckIcon /> 0 Accidents Reported
              </span>
              <span className="inline-flex items-center gap-1.5 border border-cyan/50 bg-cyan/10 text-cyan px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                <CheckIcon /> Monroney Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 border border-warn/50 bg-warn/10 text-warn px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M12 3 2.5 20h19zM12 10v4M12 17h.01" />
                </svg>
                Recall Campaign Open
              </span>
              <span className="inline-flex items-center gap-1.5 border border-line-2 bg-bg-2 text-mut px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="m4 16 5-5 4 4 7-8" />
                </svg>
                Best Value Package
              </span>
            </div>
          </SectionFrame>

          {/* 5 — Revisit Banner Showcase */}
          <SectionFrame
            n="5"
            title="Revisit Banner (Variable VIN & Visual Fidelity)"
            lede={
              <>
                Engineered to match the specified screenshot with pixel fidelity while fully complementing our approved design system. The vehicle title and VIN are dynamically driven by variable props.
              </>
            }
            verified="Dynamic VIN Driven"
          >
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mut">
                  Embedded Variant Showcase
                </span>
                <span className="font-mono text-[10px] text-lime border border-lime/40 bg-lime/10 px-2 py-0.5">
                  VIN: 3FA6P0RU9HR306143
                </span>
              </div>
              <div className="max-w-md">
                <RevisitBanner
                  variant="embedded"
                  vin="3FA6P0RU9HR306143"
                  vehicleTitle="2017 Ford Fusion"
                  price="$20"
                />
              </div>
            </div>
          </SectionFrame>

          {/* hierarchy */}
          <Reveal>
            <div className="border border-line-2 bg-bg-2 p-5 sm:p-6">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-lime mb-5">Architectural Radius &amp; Padding Hierarchy</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-[13px]">
                {[
                  ["Card Radius", "rounded-sm (4px)"],
                  ["Control Radius", "rounded-xs (2px)"],
                  ["Container Padding", "24px sm / 32px lg"],
                  ["Button Padding", "2:1 Optical Ratio"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mut/70 block">{k}</span>
                    <span className="font-display font-semibold text-fg">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* explore */}
          <Reveal>
            <div className="border border-line-2 bg-surface p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h4 className="font-display text-[15px] font-semibold text-fg">Explore Production Pages</h4>
                <p className="mt-1 text-[12.5px] text-mut">Jump directly to any verified page in the Detailed Sticker Sheet application.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(
                  [
                    ["Home Page", "home"],
                    ["Sample Reports", "sample"],
                    ["Pricing", "pricing"],
                    ["Contact Us", "contact"],
                  ] as [string, Page][]
                ).map(([l, p]) => (
                  <button
                    key={p}
                    onClick={() => onNavigate(p)}
                    className="btn-hud border border-line-2 bg-surface-2 px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[4px] cursor-pointer text-fg hover:border-lime/70 hover:text-lime"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex justify-center">
              <Barcode className="!text-line-2" label="STYLE GUIDE · REV 2026.1" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default StyleGuidePage;
