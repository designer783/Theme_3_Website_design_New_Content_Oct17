import { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { SAMPLE_VEHICLES, STICKER_LINKS, Report, usd } from "../data";
import { Reveal, Kicker, SectionHead, Ticker, HBadge, Barcode, Btn, ArrowIcon, CheckIcon, LogoMark, Decode } from "../components/ui";
import { CheckoutModal } from "../components/CheckoutModal";
import { VinLookupBox } from "../components/VinLookupBox";
import { Page } from "../components/Header";
import { SITE } from "../config/site";

const ic = "w-5 h-5";
const Icons = {
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9M7.5 5.2l9 4.8" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M3 11.5V4h7.5L21 14.5 14.5 21z" />
      <circle cx="7.6" cy="8.6" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <rect x="2.8" y="9" width="18.4" height="6" />
      <path d="M7 9v3M11 9v2.2M15 9v3M19 9v2.2" />
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h6A1.5 1.5 0 0 1 14 4.5V21M3.5 21h12" />
      <path d="M6.8 6.5h4.4v4H6.8zM14 10l3.2 1.5V19a1.2 1.2 0 0 0 2.4 0v-7.6L18 9.4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M12 2.8 20 6v6.2c0 4.6-3.4 7.6-8 9-4.6-1.4-8-4.4-8-9V6z" />
      <path d="m8.6 12 2.3 2.3 4.5-4.6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M12 3v18M16.5 6.8c-1-1-2.6-1.5-4.5-1.5-2.4 0-4.2 1.2-4.2 3.2 0 4.3 9 2.4 9 6.7 0 2-1.9 3.3-4.8 3.3-2 0-3.7-.6-4.7-1.7" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2.6" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M6 2.8h8L19 8v13.2H6z" />
      <path d="M14 2.8V8h5M9 13h6M9 17h6" />
    </svg>
  ),
  story: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <path d="M12 5.5C10 3.9 7.3 3.5 4.5 3.5v14c2.8 0 5.5.4 7.5 2 2-1.6 4.7-2 7.5-2v-14c-2.8 0-5.5.4-7.5 2z" />
      <path d="M12 5.5v14" />
    </svg>
  ),
  unique: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ic} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
};

const FIND_CARDS = [
  {
    icon: Icons.gear,
    title: "Factory Powertrain & Gearing",
    copy: "Exact engine code, transmission, differential ratio, and drive wheels. Write your ad with 100% manufacturer precision so real buyers take you seriously.",
  },
  {
    icon: Icons.package,
    title: "Every Installed Package & Add-On",
    copy: "Sport packages, premium sound, adaptive suspension, cold weather gear. Uncover every high-dollar option that came bolted on from day one.",
  },
  {
    icon: Icons.tag,
    title: "Original Window Sticker MSRP",
    copy: "See the exact price breakdown when your car sat on the showroom floor. No buyer can argue about original build cost when you hold the factory label.",
  },
  {
    icon: Icons.ruler,
    title: "True Factory Paint & Interior Codes",
    copy: "Get genuine manufacturer paint codes, trim upholstery specs, and dimensions. Crucial for collectors and enthusiasts searching for specific specs.",
  },
  {
    icon: Icons.fuel,
    title: "Official EPA MPG Benchmarks",
    copy: "City, highway, and combined fuel ratings straight from the government rating label. Proof of efficiency builds instant trust.",
  },
  {
    icon: Icons.shield,
    title: "Factory Safety Ratings & Warranty",
    copy: "Original NHTSA/IIHS 5-star crash test grades and factory warranty terms. Essential points if any factory coverage carries over to the next owner.",
  },
];

const SELLER_CARDS = [
  {
    icon: Icons.search,
    title: "Catch Hidden Options",
    copy: "Most sellers leave $1,500+ on the table simply because they forgot—or never knew—what factory packages were installed.",
  },
  {
    icon: Icons.dollar,
    title: "Price With Total Confidence",
    copy: "Knowing original sticker price plus every add-on means you won't get bullied into accepting lowball trade-in numbers.",
  },
  {
    icon: Icons.list,
    title: "Kill the Back-and-Forth",
    copy: "No more 'Does it have heated steering?' questions. Hand them the full spec sheet upfront and close the deal faster.",
  },
  {
    icon: Icons.file,
    title: "Unquestionable Proof",
    copy: "Don't just claim it's a premium trim. Hand buyers the official Monroney label and watch negotiation friction vanish.",
  },
  {
    icon: Icons.story,
    title: "Original Birth Certificate",
    copy: "A clean window sticker proves where and how the car was born. Serious buyers pay more for cars with documented provenance.",
  },
  {
    icon: Icons.unique,
    title: "Stand Out in Search Results",
    copy: "Two cars look identical in search until you show yours has the $4,200 tech package. That's how you win the sale.",
  },
];

export const TIERS = [
  {
    name: "1 Sticker",
    blurb: "One vehicle. Original factory Monroney window sticker with line-item packages and MSRP.",
    price: "$35",
    priceNote: "one-time payment",
    popular: false,
    cta: "Get Your Sticker",
    bullets: [
      "Official Factory Monroney Window Sticker Document",
      "Itemized Packages & Options with Original MSRP",
      "Factory Powertrain & Gearing Specifications",
      "Official EPA Fuel Economy & Crash Safety Grades",
      "Saved in Your Vault Forever (Never Expires)",
      "High-Resolution Print-Ready PDF Download",
      "Instant Cloud Generation & Email Delivery",
      "24/7 Live Chat Support Desk",
    ],
  },
  {
    name: "5 Stickers",
    per: "$10/sticker",
    blurb: "Shopping around or comparing multiple cars? Pull 5 stickers whenever you want.",
    price: "$50",
    priceNote: "one-time payment",
    popular: true,
    cta: "Get 5 Stickers",
    bullets: [
      "5 Official Monroney Window Stickers (Any Make)",
      "Compare Factory Packages & Original MSRP Side-by-Side",
      "Itemized Options, Paint Codes & Gear Ratios",
      "Direct OEM Assembly Line Specifications",
      "EPA Mileage Estimates & Federal Safety Ratings",
      "Credits Never Expire (Use today or months from now)",
      "Printable High-Definition PDF Downloads",
      "Priority Live Chat Support",
    ],
  },
  {
    name: "Unlimited Stickers",
    blurb: "For active sellers, wholesalers, dealers, and collectors who need instant stickers on demand.",
    price: "$29.99",
    priceNote: "subscription",
    popular: false,
    cta: "Subscribe Now",
    bullets: [
      "Unlimited Access to OEM Monroney Window Stickers",
      "Full Options Breakdown with Itemized Factory Pricing",
      "Complete Mechanical & Factory Assembly Specs",
      "EPA Consumption Scores & Crash Test Ratings",
      "Permanent Cloud Storage inside Member Portal",
      "Commercial High-Resolution Printable PDFs",
      "Instant Cloud Access & Email Dispatch",
      "Round-the-Clock Priority Technician Support",
    ],
  },
];

export function HomePage({
  onSearchVin,
  onOpenSticker,
  setSelectedPackage,
  selectedPackage,
  onNavigate,
}: {
  onSearchVin: (vin: string) => void;
  onOpenSticker: (vin: string) => void;
  setSelectedPackage: (p: string | null) => void;
  selectedPackage: string | null;
  onNavigate?: (p: Page) => void;
}) {
  const [lookupMode, setLookupMode] = useState<"vin" | "plate">("vin");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [plateState, setPlateState] = useState("CA");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSearchingPlate, setIsSearchingPlate] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [checkoutPkg, setCheckoutPkg] = useState<{
    name: string;
    price: string;
    code?: string;
  } | null>(null);

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");

    if (lookupMode === "vin") {
      const v = vin.trim().toUpperCase();
      if (!v) {
        setLookupError("Please enter a vehicle identification number.");
        return;
      }
      if (v.length < 3) {
        setLookupError("A standard VIN is between 11 and 17 characters.");
        return;
      }
      onSearchVin(v);
    } else {
      const cleanPlate = plate.trim().toUpperCase();
      if (!cleanPlate) {
        setLookupError("Please enter your license plate number.");
        return;
      }
      setIsSearchingPlate(true);
      try {
        const res = await fetch(`${SITE.appUrl}/landing/no_get_license`, {
          method: "POST",
          body: new URLSearchParams({
            email: email.trim(),
            mobile: phone.trim(),
            plate: cleanPlate,
            state: plateState,
          }),
        });
        const data = await res.json();
        if (data?.status === "success" && data.encrypted_vin) {
          const params = new URLSearchParams({
            vin: data.encrypted_vin,
            email: email.trim(),
            mobile: phone.trim(),
          });
          window.location.href = `${SITE.url}/members/vin-check/license-preview?${params.toString()}`;
          return;
        }
        setLookupError("License plate not found in database. Try looking up by VIN directly.");
      } catch {
        setLookupError("Could not connect to plate registration database. Please enter your VIN directly.");
      } finally {
        setIsSearchingPlate(false);
      }
    }
  };

  const scrollToLookup = () => document.getElementById("vin-lookup-container")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-line grid-bg overflow-hidden">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal variant="pulse">
              <HBadge>Instant OEM Monroney Sticker &amp; History</HBadge>
            </Reveal>
            <h1 className="mt-7 font-display text-4xl sm:text-6xl leading-[1.04] font-semibold tracking-tight text-fg max-w-[20ch]">
              Before You <span className="text-lime">List It</span>, Know What It's Actually Worth
            </h1>
            <Reveal delay={350}>
              <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-mut">
                Your car has factory packages you probably don't even know about. Enter your 17-digit VIN to grab the original window sticker and full build sheet—exact line-item options, factory paint, engine specs, and original MSRP. One lookup. Zero guessing. Keep thousands in your pocket.
              </p>
            </Reveal>

            {/* Centered Embedded VIN Lookup Box */}
            <div className="mt-8 w-full">
              <VinLookupBox onSearchVin={onSearchVin} />
            </div>

            <Reveal delay={480}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {["Direct OEM Build Specs", "Instant PDF Download", "100% Unedited Records", "Credits Never Expire"].map((b) => (
                  <span
                    key={b}
                    className="border border-line bg-surface/80 px-3 py-3 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-fg/90 flex items-center gap-2"
                  >
                    <CheckIcon className="text-lime shrink-0" />
                    <span className="leading-tight">{b}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} className="relative">
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="relative border border-line-2 bg-surface shadow-panel hud-corners corners-on">
                <div className="flex items-center justify-between border-b border-line bg-bg-2 px-4 py-3">
                  <span className="flex items-center gap-2.5 text-fg">
                    <LogoMark size={22} invert />
                    <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-mut">Window Sticker · Build Sheet</span>
                  </span>
                  <span className="font-mono text-[9px] text-lime">NO. 001</span>
                </div>
                <div className="scanline">
                  <img
                    src="https://digitalbuildsheetsep282026.vercel.app/window-sticker-hero.webp"
                    alt="Original Window Sticker and Build Sheet Preview"
                    className="w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5 border-t border-line">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mut">Monroney Act Label · EPA Rated</span>
                  <Barcode className="!text-line-2" label="SHEET-001" />
                </div>
              </div>
              <div className="absolute -left-4 sm:-left-10 top-16 border border-lime/40 bg-bg-2/95 backdrop-blur px-3.5 py-2.5 shadow-glow">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mut">MSRP Documented</p>
                <p className="font-display text-lg font-semibold text-lime">$103,190</p>
              </div>
              <div className="absolute -right-3 sm:-right-8 bottom-20 border border-line-2 bg-bg-2/95 backdrop-blur px-3.5 py-2.5">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mut">VIN Decoded</p>
                <p className="font-mono text-[11px] font-semibold text-cyan tracking-[0.08em]">WAUFFAFC·5HN·7408</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Ticker items={["OEM-Certified Engineering", "Instant Cloud PDF", "High-Resolution Assets", "Universal VIN Support", "Documented Original MSRP"]} />
      </section>

      {/* WHAT YOU'LL FIND */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
          <div className="self-start">
            <SectionHead
              index="01"
              kicker="Factory DNA Breakdown"
              title="What Came Bolted On From Day One"
              lede="Every car leaves the factory with unique packages, rare paints, and specific mechanical options. The official Monroney label is the only document that proves what your car actually is."
            />
            <Reveal delay={200} className="mt-9 hidden lg:flex items-center gap-6">
              <Barcode className="!text-line-2" label="REF: MON-1984" />
              <HBadge tone="cyan">Monroney Compliant</HBadge>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5">
            {FIND_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="h-full">
                <article className="group h-full border border-line bg-surface p-5 flex flex-col gap-4 hud-corners transition-all duration-300 hover:-translate-y-1 hover:border-line-2">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-line-2 text-mut transition-colors group-hover:text-lime group-hover:border-lime/60">
                      {c.icon}
                    </span>
                    <span className="font-mono text-[9.5px] text-mut/70">SEC_{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display text-[15.5px] font-semibold leading-tight tracking-tight text-fg">{c.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-mut">{c.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE BUILD DOCUMENTATION */}
      <section id="sample-docs" className="border-b border-line bg-bg-2/50 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <SectionHead
            index="02"
            kicker="Live Database Records"
            title="Real Monroney Stickers. Zero Guesswork."
            lede="Take a look at how clean, detailed, and unedited our factory build records are before you pull yours."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-4 items-stretch">
            {SAMPLE_VEHICLES.map((v, i) => (
              <Reveal key={v.vin} delay={i * 90} className="h-full">
                <SampleCard v={v} onOpenSticker={onOpenSticker} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSIC & OLDER + SELLERS (lime band) */}
      <section className="border-b border-line bg-lime text-doc-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <Kicker tone="ink">Enthusiast &amp; Vintage Vehicle Archives</Kicker>
              <Reveal variant="feed" delay={100}>
                <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.03] font-semibold tracking-tight text-doc-ink">Stop Leaving Thousands On The Table</h2>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-doc-ink/75">
                  Selling an older enthusiast car or classic trim? Original window stickers are almost impossible to find anywhere else. Most private sellers don't realize their vehicle was ordered with rare performance differentials, premium audio, or limited packages—and end up giving it away for free. An authentic sticker proves your spec.
                </p>
              </Reveal>
              <Reveal delay={340}>
                <blockquote className="mt-9 border-l-4 border-doc-ink pl-6 relative">
                  <svg viewBox="0 0 24 24" className="absolute -left-3 -top-3 h-7 w-7 bg-lime p-1.5 text-doc-ink" fill="currentColor" aria-hidden="true">
                    <path d="M4 6h7v7H7c0 2.2 1.3 3.5 4 4v3c-4.6-.6-7-3.4-7-8.4zM13 6h7v7h-4c0 2.2 1.3 3.5 4 4v3c-4.6-.6-7-3.4-7-8.4z" />
                  </svg>
                  <p className="font-display text-xl sm:text-[23px] font-semibold leading-snug text-doc-ink">
                    &ldquo;You can't price a car correctly without knowing its exact factory build. Authentic paperwork is your strongest negotiating weapon.&rdquo;
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 border-2 border-doc-ink px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                    <span className="h-1.5 w-1.5 bg-doc-ink" aria-hidden="true" /> Official Factory Heritage
                  </span>
                </blockquote>
              </Reveal>
            </div>

            <div>
              <Kicker tone="ink">Built For Smart Sellers</Kicker>
              <Reveal variant="feed" delay={100}>
                <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.04] font-semibold tracking-tight text-doc-ink">Why You Need Official Documentation</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 max-w-lg text-[15px] font-medium leading-relaxed text-doc-ink/85">
                  When you present hard, unedited manufacturer facts, buyers stop haggling and pay asking price.
                </p>
              </Reveal>
              <div className="mt-7 grid sm:grid-cols-2 gap-3.5">
                {SELLER_CARDS.map((c, i) => (
                  <Reveal key={c.title} delay={i * 60} className="h-full">
                    <article className="group h-full border-2 border-doc-ink/70 bg-lime p-5 flex flex-col gap-3.5 transition-all duration-300 hover:bg-doc hover:border-doc-ink">
                      <span className="flex h-10 w-10 items-center justify-center border-2 border-doc-ink/50 text-doc-ink group-hover:border-doc-ink transition-colors">
                        {c.icon}
                      </span>
                      <div className="mt-auto">
                        <h3 className="font-display text-[15px] font-semibold tracking-tight text-doc-ink">{c.title}</h3>
                        <p className="mt-2 text-[12.5px] leading-relaxed text-doc-ink/70">{c.copy}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              index="03"
              kicker="Pay Once. Use Whenever."
              title="Cheaper Than Getting Lowballed"
              lede="Dealers and private buyers will try to shave $1,000s off your price. A $35 window sticker stops them dead in their tracks. Credits never expire."
            />
            <Reveal delay={150} className="hidden md:block">
              <Barcode className="!text-line-2" label="CREDITS NEVER EXPIRE" />
            </Reveal>
          </div>

          <div className="mt-12 grid lg:grid-cols-3 gap-4 items-stretch">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} className="h-full">
                <article
                  className={cn(
                    "relative h-full flex flex-col border transition-all duration-300",
                    t.popular ? "border-lime/80 bg-surface shadow-glow lg:-translate-y-2" : "border-line bg-surface/70 hover:border-line-2 hover:-translate-y-1"
                  )}
                >
                  {t.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime border border-lime px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-bg whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <div className={cn("px-6 pt-7 pb-5 border-b border-line", t.popular && "bg-lime/5")}>
                    {t.per && <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">{t.per}</p>}
                    <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight text-fg">{t.name}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-mut">{t.blurb}</p>
                    <div className="mt-5 flex items-baseline gap-2.5">
                      <span className={cn("font-display text-4xl font-semibold tracking-tight", t.popular ? "text-lime" : "text-fg")}>{t.price}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut/80">{t.priceNote}</span>
                    </div>
                  </div>
                  <ul className="flex-1 px-6 py-5 space-y-2.5">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[13px] leading-snug text-fg/80">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-line-2 bg-bg-2">
                          <CheckIcon className="text-lime w-2.5 h-2.5" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pb-6">
                    <Btn
                      variant={t.popular ? "lime" : "solid"}
                      className="w-full"
                      onClick={() => {
                        setSelectedPackage(t.name);
                        setCheckoutPkg({
                          name: t.name,
                          price: t.price,
                          code: t.name.toLowerCase().includes("unlimited")
                            ? "BUILDSHEETSTICKERSTUN"
                            : t.name.includes("5")
                            ? "BUILDSHEETSTICKERST2"
                            : "BUILDSHEETSTICKERST1",
                        });
                      }}
                    >
                      {t.cta}
                    </Btn>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-3.5">
            {[
              { t: "Credits Never Expire", c: "Buy a pack today, use them today or 6 months from now. Zero pressure." },
              { t: "Instant PDF Download", c: "Generate high-resolution window stickers in seconds. Print it or email it." },
              { t: "100% Unedited OEM Data", c: "Direct feeds from NMVTIS, state DMVs, and factory databases. No fluff." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="h-full border border-line bg-surface/70 px-5 py-4 flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-lime/10 border border-lime/40 text-lime">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="font-display text-[14px] font-semibold text-fg">{f.t}</h4>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-mut">{f.c}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / VIN LOOKUP */}
      <section id="vin-lookup-container" className="relative bg-bg-2 grid-bg overflow-hidden scroll-mt-24">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <Reveal variant="pulse" className="flex justify-center">
            <HBadge>Instant Verification Console</HBadge>
          </Reveal>
          <h2 className="mt-7 font-display text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-tight text-fg">
            <Decode text="What Factory Options Are On Your Car?" delay={150} />
          </h2>
          <Reveal delay={300}>
            <p className="mt-5 text-base sm:text-lg text-mut">Enter any 17-digit VIN below. Get the original Monroney sticker in seconds.</p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-10 mx-auto max-w-2xl text-left">
              <VinLookupBox onSearchVin={onSearchVin} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Checkout Modal when triggered */}
      {checkoutPkg && (
        <CheckoutModal
          pkgName={checkoutPkg.name}
          pkgPrice={checkoutPkg.price}
          pkgCode={checkoutPkg.code}
          onClose={() => setCheckoutPkg(null)}
          onSuccess={(vinCode) => {
            setCheckoutPkg(null);
            if (vinCode) onSearchVin(vinCode);
          }}
        />
      )}
    </>
  );
}

function SampleCard({ v, onOpenSticker }: { v: Report; onOpenSticker: (vin: string) => void }) {
  const link = STICKER_LINKS[v.vin];
  return (
    <article
      className="group h-full border border-line bg-surface flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-line-2 hover:shadow-panel cursor-pointer hud-corners"
      onClick={() => {
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        } else {
          onOpenSticker(v.vin);
        }
      }}
    >
      <figure className="relative border-b border-line overflow-hidden">
        <img
          src={v.imageUrl}
          alt={`${v.year} ${v.make} ${v.model}`}
          loading="lazy"
          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg/70 to-transparent" aria-hidden="true" />
        <span className="absolute top-2.5 left-2.5 bg-bg-2/90 backdrop-blur text-lime border border-lime/40 font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1">
          {v.year} · {v.make}
        </span>
      </figure>
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-display text-[17px] font-semibold tracking-tight leading-tight text-fg">
          {v.year} {v.make} {v.model}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-mut">VIN: {v.vin}</p>
        <div className="mt-4 flex items-end justify-between border-y border-dashed border-line-2/60 py-3">
          <div>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">MSRP</p>
            <p className="font-display text-xl font-semibold text-lime">{usd(v.originalMsrp)}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">Exterior</p>
            <p className="font-body text-[11.5px] font-semibold leading-tight text-fg/90">{v.exteriorColor}</p>
            <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-mut/80">Interior</p>
            <p className="font-body text-[11.5px] font-semibold leading-tight text-fg/90 max-w-[190px]">{v.interiorColor}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2.5">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-hud flex-1 inline-flex items-center justify-center gap-2 border border-lime/70 bg-lime/10 text-lime px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[4px] hover:bg-lime hover:text-bg"
            >
              View Window Sticker <ArrowIcon />
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSticker(v.vin);
              }}
              className="btn-hud flex-1 inline-flex items-center justify-center gap-2 border border-lime/70 bg-lime/10 text-lime px-4 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] rounded-[4px] hover:bg-lime hover:text-bg cursor-pointer"
            >
              View Window Sticker <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default HomePage;
