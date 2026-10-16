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

export const TermsPage: React.FC<{ onNavigate?: (p: Page) => void }> = ({ onNavigate }) => {
  return (
    <LegalShell kicker="Standard Terms & Agreement" title="Terms & Conditions" updated="January 2026" onNavigate={onNavigate}>
      <Article n="01" title="Agreement & Acceptance">
        <p>
          Welcome to {SITE.name}! The representations of our services and products available through this website do not constitute a binding offer. By clicking &ldquo;SEARCH&rdquo;, &ldquo;SHOW ME MY REPORT&rdquo; or &ldquo;YES, CONTINUE TO MY REPORT&rdquo;, You agree to be bound to these Terms of Use (the &ldquo;Agreement&rdquo;), constituting a legally binding agreement by and between {SITE.name} and You concerning Your use of {SITE.name} website and services.
        </p>
      </Article>

      <Article n="02" title="Privacy Policy Incorporation">
        <p>
          {SITE.name} collects identifying and billing information when consumers register for our services. Any personally identifiable information you provide may be used in accordance with our Privacy Policy to deliver requested reports and documentation.
        </p>
      </Article>

      <Article n="03" title="Changes to Agreement">
        <p>
          Internet technology and applicable laws change frequently. Accordingly, {SITE.name} reserves the right to modify this Agreement and its policies at any time upon notice via posting on this website. Continued use indicates acceptance.
        </p>
      </Article>

      <Article n="04" title="Eligibility & Authority">
        <p>
          By using the website or services, you represent and warrant that you are at least 18 years of age and legally qualified to enter into contracts under applicable law.
        </p>
      </Article>

      <Article n="05" title={`Role of ${SITE.name}`}>
        <p>
          Without limitation, you agree that {SITE.name} is a technology service provider retrieving data from official registries, NMVTIS partner networks, manufacturer records, and third-party documentation channels.
        </p>
      </Article>

      <Article n="06" title="Intellectual Property & License">
        <p>
          Unless otherwise stated, {SITE.name} owns the intellectual property rights for all material on the site. Reports and window stickers are licensed for personal and internal business evaluation only.
        </p>
      </Article>

      <Article n="07" title="User Accounts & Security">
        <p>
          You are entirely responsible for maintaining the confidentiality of your login credentials and for any activities that occur under your account.
        </p>
      </Article>

      <Article n="08" title={`Fees, Pricing & Refund Policy`}>
        <p>
          You acknowledge and agree that {SITE.name} reserves the right to charge fees in accordance with the packages clearly disclosed on the Website. If you are unhappy with your search results, please contact our support team at {SITE.phone} or {SITE.email}.
        </p>
      </Article>

      <Article n="09" title="Disclaimers & Limitation of Liability">
        <p>
          This site is provided by {SITE.name} on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis to the maximum extent permitted by applicable law.
        </p>
      </Article>
    </LegalShell>
  );
};
