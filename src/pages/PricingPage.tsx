import { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { Reveal, Kicker, Barcode, Btn, ArrowIcon, CheckIcon, SectionHead } from "../components/ui";
import { Page } from "../components/Header";
import { CheckoutModal } from "../components/CheckoutModal";
import { FAQS as DEFAULT_FAQS, PRICING_PACKAGES, HISTORY_PACKAGES } from "../data/mockData";
import faqsData from "../config/faqs.json";
import { SITE } from "../config/site";

const FORMATTED_FAQS = faqsData && Array.isArray(faqsData)
  ? faqsData.map((f: { q: string; a: string }) => ({
      question: f.q.replace(/\{SITE_NAME\}/g, SITE.name),
      answer: f.a.replace(/\{SITE_NAME\}/g, SITE.name),
    }))
  : DEFAULT_FAQS;

export function PricingPage({
  setSelectedPackage,
  selectedPackage,
  onNavigate,
}: {
  setSelectedPackage: (p: string | null) => void;
  selectedPackage: string | null;
  onNavigate: (p: Page) => void;
}) {
  const [activeTab, setActiveTab] = useState<"sticker" | "history">("sticker");
  const [checkoutModalPkg, setCheckoutModalPkg] = useState<{
    name: string;
    price: string;
    code?: string;
  } | null>(null);

  const displayPackages = activeTab === "history" ? HISTORY_PACKAGES : PRICING_PACKAGES;

  const handleSelectPkg = (pkg: typeof displayPackages[0]) => {
    setSelectedPackage(pkg.name);
    setCheckoutModalPkg({
      name: pkg.name,
      price: `$${pkg.price}`,
      code: pkg.code,
    });
  };

  return (
    <>
      <section className="border-b border-line grid-bg relative">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <Reveal variant="pulse">
            <Kicker>Pay Once Or Go Unlimited · Zero Hidden Fees</Kicker>
          </Reveal>
          <Reveal variant="feed" delay={120}>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-tight text-fg">
              Transparent Pricing. Zero Hidden Fees.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-[15px] sm:text-base leading-relaxed text-mut">
              Need one sticker for your private sale? Pay once—credits never expire. Running a dealership or flipping cars weekly? Go unlimited and pull window stickers on demand. Cancel anytime with one click.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          {/* Tabs: Window Stickers vs Vehicle History */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex border border-line-2 bg-surface p-1 hud-corners">
              <button
                type="button"
                onClick={() => setActiveTab("sticker")}
                className={cn(
                  "px-6 py-2.5 font-display text-[11.5px] font-bold uppercase tracking-[0.16em] transition-all cursor-pointer",
                  activeTab === "sticker"
                    ? "bg-lime text-bg shadow-glow"
                    : "text-mut hover:text-fg"
                )}
              >
                Window Stickers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={cn(
                  "px-6 py-2.5 font-display text-[11.5px] font-bold uppercase tracking-[0.16em] transition-all cursor-pointer",
                  activeTab === "history"
                    ? "bg-lime text-bg shadow-glow"
                    : "text-mut hover:text-fg"
                )}
              >
                Vehicle History
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 items-stretch">
            {displayPackages.map((t, i) => {
              const isPopular = Boolean(t.popular || (t as any).isPopular);
              return (
                <Reveal key={t.id || t.name} delay={i * 90} className="h-full">
                  <article
                    className={cn(
                      "relative h-full flex flex-col border transition-all duration-300",
                      isPopular ? "border-lime/80 bg-surface shadow-glow lg:-translate-y-2" : "border-line bg-surface/70 hover:border-line-2 hover:-translate-y-1"
                    )}
                  >
                    {isPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime border border-lime px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-bg whitespace-nowrap">
                        Most Popular
                      </span>
                    )}
                    <div className={cn("px-6 pt-7 pb-5 border-b border-line", isPopular && "bg-lime/5")}>
                      {t.badge && <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">{t.badge}</p>}
                      <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight text-fg">{t.name}</h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-mut">{t.description}</p>
                      <div className="mt-5 flex items-baseline gap-2.5">
                        <span className={cn("font-display text-4xl font-semibold tracking-tight", isPopular ? "text-lime" : "text-fg")}>${t.price}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut/80">{t.checkoutType === 'subscription' ? 'subscription' : 'one-time payment'}</span>
                      </div>
                    </div>
                    <ul className="flex-1 px-6 py-5 space-y-2.5">
                      {t.features.map((b) => (
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
                        variant={isPopular ? "lime" : "solid"}
                        className="w-full"
                        onClick={() => handleSelectPkg(t)}
                      >
                        {selectedPackage === t.name ? "Selected ✓" : "Get Started"}
                      </Btn>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-3.5">
            {[
              { t: "Credits Never Expire", c: "Purchase now and use your credits whenever you're ready to sell." },
              { t: "Instant PDF & Web Delivery", c: "Generate your window sticker or vehicle history report in seconds, ready to share with buyers." },
              { t: "NMVTIS & DMV Certified", c: "Direct access to official federal databases, state DMVs, and factory databases." },
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

          {/* Frequently Asked Questions Accordion Section */}
          <div className="mt-20 border-t border-line pt-16">
            <SectionHead
              index="04"
              kicker="Got Questions?"
              title="Frequently Asked Questions"
              lede="Everything you need to know about our vehicle documentation reports, credits, and factory specs."
            />
            <div className="mt-10 space-y-3 max-w-4xl mx-auto">
              {FORMATTED_FAQS.map((faq, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <details className="group border border-line bg-surface p-5 transition-all duration-200 open:border-line-2 open:bg-surface-2/80 hud-corners">
                    <summary className="flex items-center justify-between font-display text-[15px] font-semibold text-fg cursor-pointer select-none list-none">
                      <span>{faq.question}</span>
                      <span className="ml-4 font-mono text-[12px] text-lime transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3.5 pt-3.5 border-t border-line text-[13.5px] leading-relaxed text-mut">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={150} className="mt-14">
            <div className="border border-line-2 bg-surface px-6 py-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hud-corners corners-on">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-lime">Not sure which package?</p>
                <p className="mt-2 font-display text-lg sm:text-xl font-semibold text-fg">Browse a sample report first — it takes seconds.</p>
              </div>
              <Btn variant="lime" onClick={() => onNavigate("sample")}>
                View Sample Reports <ArrowIcon />
              </Btn>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-10 flex justify-center">
            <Barcode className="!text-line-2" label="PRICING SHEET · DSS-03" />
          </Reveal>
        </div>
      </section>

      {checkoutModalPkg && (
        <CheckoutModal
          pkgName={checkoutModalPkg.name}
          pkgPrice={checkoutModalPkg.price}
          pkgCode={checkoutModalPkg.code}
          onClose={() => setCheckoutModalPkg(null)}
        />
      )}
    </>
  );
}

export default PricingPage;
