import React from "react";
import { Reveal, Kicker, Barcode } from "../components/ui";
import { Page } from "../components/Header";
import { SITE } from "../config/site";

function LegalShell({
  kicker,
  title,
  updated,
  children,
  onNavigate,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
  onNavigate?: (p: Page) => void;
}) {
  return (
    <section className="grid-bg relative">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
        <Reveal variant="pulse">
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <Reveal variant="feed" delay={120}>
          <h1 className="mt-5 font-display text-4xl sm:text-6xl tracking-tight leading-[1.02] font-semibold text-fg">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mut">Last updated: {updated}</p>
        </Reveal>
        <div className="mt-10 space-y-5">{children}</div>
        <Reveal delay={100}>
          <div className="mt-16 border-t border-line pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Barcode className="!text-line-2" label={`LEGAL SHEET · ${SITE.name.toUpperCase()}`} />
            {onNavigate && (
              <button
                onClick={() => onNavigate("home")}
                className="underline-slide font-display text-[11px] font-semibold uppercase tracking-[0.14em] cursor-pointer text-mut hover:text-lime"
              >
                &larr; Back to Home
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Article({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <article className="border border-line bg-surface/70 hud-corners">
        <h2 className="flex items-baseline gap-4 border-b border-line bg-surface-2/70 px-5 sm:px-7 py-3.5">
          <span className="font-mono text-[11px] font-bold text-lime">{n}</span>
          <span className="font-display text-[14px] font-semibold uppercase tracking-[0.1em] text-fg">{title}</span>
        </h2>
        <div className="px-5 sm:px-7 py-5 space-y-3.5 text-[13.5px] leading-relaxed text-mut">{children}</div>
      </article>
    </Reveal>
  );
}

export const PrivacyPage: React.FC<{ onNavigate?: (p: Page) => void }> = ({ onNavigate }) => {
  return (
    <LegalShell kicker="Privacy & Data Protection" title="Privacy Policy" updated="January 2026" onNavigate={onNavigate}>
      <Article n="01" title="Introduction & Policy Overview">
        <p>
          Thank you for visiting the {SITE.name} website located at{" "}
          <a href={`${SITE.url}/`} className="text-lime underline">
            {SITE.url}/
          </a>
          . This Privacy Policy outlines our practices regarding information collection, usage, and protection when you visit our website, submit VIN queries, or purchase window stickers and vehicle intelligence reports. We believe in permission-based transparency and do not sell personal information to unauthorized third parties.
        </p>
      </Article>

      <Article n="02" title="Your IP Address & Technical Diagnostics">
        <p>
          Each time you visit the Site, our web server automatically recognizes your IP address and referring web page. Your IP address is used to assist diagnostics, maintain server availability, administer the Site, and verify high-performance delivery of window sticker and build sheet assets.
        </p>
      </Article>

      <Article n="03" title="Cookies & Action Tags">
        <p>
          We use session cookies and local storage tokens to recognize returning users, preserve selected report and sticker configurations, pre-populate active inquiries upon request, and optimize interface responsiveness.
        </p>
      </Article>

      <Article n="04" title="Personal Information We Collect">
        <p>
          When you register an account, lookup a vehicle, or purchase report packages, we may collect personal details such as:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-fg/80">
          <li>Your full name and primary email address for report dispatch,</li>
          <li>Optional telephone number for support inquiries,</li>
          <li>Vehicle Identification Numbers (VIN) and vehicle registration parameters queried,</li>
          <li>Billing and transaction history associated with purchased credit bundles.</li>
        </ul>
      </Article>

      <Article n="05" title="Use of Information & Order Fulfillment">
        <p>
          Information collected is applied directly to generate and deliver official Monroney window stickers, decode RPO and option packages, manage account credit balances, send receipt notices, and deliver requested customer care support.
        </p>
      </Article>

      <Article n="06" title="Data Security & SSL Encryption">
        <p>
          We employ industry-standard SSL encryption and strict access controls across all user data and transaction interfaces. Sensitive billing data is processed via compliant secure payment gateways; full credit card numbers are never stored in plain text on our web servers.
        </p>
      </Article>

      <Article n="07" title="Opting Out & Account Removal">
        <p>
          At your request, we will remove your personal identifying information from active marketing distributions. You can manage your preferences or request account deletion anytime by contacting our support desk at{" "}
          <a href={SITE.emailHref} className="text-lime underline">
            {SITE.email}
          </a>{" "}
          or calling toll-free at{" "}
          <a href={SITE.phoneHref} className="text-lime underline">
            {SITE.phone}
          </a>
          .
        </p>
      </Article>
    </LegalShell>
  );
};
