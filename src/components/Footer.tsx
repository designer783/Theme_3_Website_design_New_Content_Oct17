import { Page } from "./Header";
import { Logo, Barcode, HBadge } from "./ui";
import { SITE } from "../config/site";

export default function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const product: { label: string; page: Page }[] = [
    { label: "Vehicle History", page: "vehicle-history" },
    { label: "Sample Reports", page: "sample" },
    { label: "Pricing", page: "pricing" },
    { label: "Contact Us", page: "contact" },
  ];
  const account: { label: string; page: Page }[] = [
    { label: "Log In", page: "login" },
    { label: "Terms of Service", page: "terms" },
    { label: "Privacy Policy", page: "privacy" },
  ];

  return (
    <footer className="bg-bg-2 text-fg border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo invert />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mut">
              Unedited vehicle history and original Monroney window stickers. Direct feeds from NMVTIS, 50-state DMVs, and factory databases. Stop selling in the dark.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Barcode className="!text-line-2" label="MONRONEY-COMPLIANT" />
              <HBadge>Verified</HBadge>
            </div>
          </div>

          <nav aria-label="Footer — product">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">Product</p>
            <ul className="mt-5 space-y-3">
              {product.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => onNavigate(l.page)}
                    className="underline-slide font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-mut hover:text-fg cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — account">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">Account</p>
            <ul className="mt-5 space-y-3">
              {account.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => onNavigate(l.page)}
                    className="underline-slide font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-mut hover:text-fg cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={SITE.liveChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-slide font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-cyan hover:text-lime cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  Live Chat Support
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">The Guarantee</p>
            <ul className="mt-5 space-y-3 text-[13px] text-mut">
              <li className="flex items-start gap-2.5">
                <span className="mt-[7px] inline-block h-1 w-3 bg-lime" aria-hidden="true" />
                Raw, unedited data from NMVTIS, 50-state DMVs, and factory databases.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[7px] inline-block h-1 w-3 bg-lime" aria-hidden="true" />
                Instant PDF download on screen &amp; sent straight to your email.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-[7px] inline-block h-1 w-3 bg-lime" aria-hidden="true" />
                Credits never expire. Buy once, pull whenever you need.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mut/70">
            &copy; 2026 {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mut/70">
            <a href={`${SITE.url}/`} className="text-lime hover:text-fg transition-colors">
              {SITE.url}/
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
