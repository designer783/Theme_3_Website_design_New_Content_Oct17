import React, { useState } from "react";
import { Reveal, Kicker, ArrowIcon, CheckIcon } from "../components/ui";
import { Page } from "../components/Header";
import { SITE } from "../config/site";

const field =
  "w-full bg-surface border border-line-2 px-4 py-3.5 text-[14px] font-body text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors";
const label = "block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-2";

export const LoginPage: React.FC<{ onNavigate?: (p: Page) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = SITE.loginUrl;
  };

  return (
    <section className="grid-bg relative">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <Reveal variant="pulse">
            <Kicker>Member Vault</Kicker>
          </Reveal>
          <Reveal variant="feed" delay={120}>
            <h1 className="mt-5 font-display text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-tight text-fg">Welcome Back</h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mut">
              Your window stickers and history reports stay in your account forever. Log in to view, download PDFs, or use remaining credits.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <ul className="mt-8 space-y-3 max-w-md">
              {["Your reports never expire or lock up", "Download crisp high-res vector PDFs anytime", "Zero subscriptions unless you want one"].map((t) => (
                <li key={t} className="flex gap-3 text-[13.5px] text-mut">
                  <CheckIcon className="text-lime mt-1 shrink-0" />
                  <span className="text-fg/80">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="border border-line-2 bg-surface shadow-panel p-6 sm:p-8 hud-corners corners-on">
            {signedIn ? (
              <div className="py-8 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center border border-lime/50 bg-lime/10 text-lime">
                  <CheckIcon className="w-7 h-7" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg">Welcome Back</h2>
                <p className="mt-3 text-[14px] text-mut max-w-sm mx-auto">
                  Signed in as <span className="font-mono text-[12.5px] font-semibold text-lime">{email || "demo@owner.com"}</span>. Your
                  credits and saved reports are ready.
                </p>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate("home")}
                    className="btn-hud mt-7 inline-flex items-center gap-2 border border-lime bg-lime text-bg px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] cursor-pointer hover:shadow-glow"
                  >
                    Back to Home <ArrowIcon />
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label htmlFor="l-email" className={label}>
                    Email Address
                  </label>
                  <input
                    id="l-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="l-pw" className={label}>
                    Password
                  </label>
                  <input
                    id="l-pw"
                    required
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••••"
                    className={field}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" className="h-4 w-4 accent-[#c6f135]" defaultChecked />
                    <span className="font-body text-[12px] font-semibold text-fg/80">Remember me</span>
                  </label>
                  <a
                    href={`${SITE.url}/members/forgot-password`}
                    className="font-body text-[12px] font-semibold underline-slide cursor-pointer text-mut hover:text-fg"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="btn-hud w-full inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-4 font-display text-[12.5px] font-semibold uppercase tracking-[0.16em] rounded-[4px] cursor-pointer hover:shadow-glow"
                >
                  Log In to Member Portal <ArrowIcon />
                </button>
                <p className="text-center font-mono text-[9.5px] uppercase tracking-[0.18em] text-mut/70">
                  New here? Purchase a report to create your account automatically.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
