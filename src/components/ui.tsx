import { ReactNode, useEffect, useRef, useState, CSSProperties } from "react";
import { cn } from "../utils/vehicleLookup";

/* ------------------------------------------------------------------ */
/* Logo — Detailed Sticker Sheet                                       */
/* ------------------------------------------------------------------ */

export function LogoMark({ size = 36, invert = false, className }: { size?: number; invert?: boolean; className?: string }) {
  const tile = invert ? "#E9EEF5" : "#16181D";
  const bracket = invert ? "#16181D" : "#E9EEF5";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill={tile} />
      <path d="M20 34 V20 H34" fill="none" stroke={bracket} strokeWidth="7" />
      <path d="M38 42 L22 26" fill="none" stroke="#FF7847" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  invert = false,
  className,
  sub = "VEHICLE DOCUMENTATION SYSTEM",
}: {
  invert?: boolean;
  className?: string;
  sub?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <LogoMark size={36} invert={invert} className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tight text-[16px] sm:text-[17px] whitespace-nowrap",
            invert ? "text-fg" : "text-doc-ink"
          )}
        >
          Detailed Sticker Sheet
        </span>
        <span className={cn("font-mono text-[8px] tracking-[0.3em] mt-1.5", invert ? "text-mut" : "text-doc-ink/50")}>{sub}</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>(threshold = 0.05, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      if (once) return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: "50px 0px 50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rv",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rv" | "feed" | "pulse";
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const base = variant === "feed" ? "feed" : variant === "pulse" ? "pulse" : "rv";
  return (
    <div
      ref={ref}
      className={cn(base, inView && "is-in", className)}
      style={{ ...style, ["--rv-delay" as string]: `${delay}ms`, ["--feed-delay" as string]: `${delay}ms`, animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Decode / scramble text                                              */
/* ------------------------------------------------------------------ */

const GLYPHS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789#$%&/";

export function Decode({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3);
  const [out, setOut] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }
    let raf = 0;
    let frame = 0;
    const totalFrames = Math.max(22, Math.min(46, Math.floor(text.length * 1.4)));
    let started = false;
    const timer = window.setTimeout(() => {
      started = true;
      const step = () => {
        frame++;
        const revealed = Math.floor((frame / totalFrames) * text.length);
        setOut(
          text
            .split("")
            .map((c, i) => {
              if (c === " " || c === "\n") return c;
              if (i < revealed) return c;
              if (i < revealed + 7) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              return c;
            })
            .join("")
        );
        if (revealed < text.length) {
          raf = requestAnimationFrame(step);
        } else {
          setOut(text);
          setDone(true);
        }
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      if (started) cancelAnimationFrame(raf);
    };
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
      <span aria-hidden="true" className={cn("text-lime caret", done && "opacity-30")}>
        _
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Decorative primitives                                               */
/* ------------------------------------------------------------------ */

export function HBadge({
  children,
  className,
  tone = "lime",
}: {
  children: ReactNode;
  className?: string;
  tone?: "lime" | "cyan" | "dark" | "ink";
}) {
  const tones = {
    lime: "border-lime/50 text-lime bg-lime/[0.06]",
    cyan: "border-cyan/50 text-cyan bg-cyan/[0.06]",
    dark: "border-line-2 text-mut bg-surface-2",
    ink: "border-doc-ink/40 text-doc-ink bg-doc-ink/[0.04]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]",
        tones[tone],
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping bg-current opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 bg-current" />
      </span>
      {children}
    </span>
  );
}

export function Barcode({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-end gap-1.5", className)}>
      <span
        className="block h-7 w-24"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 4px, currentColor 4px 6px, transparent 6px 9px, currentColor 9px 10px, transparent 10px 15px, currentColor 15px 18px, transparent 18px 20px)",
        }}
        aria-hidden="true"
      />
      {label && <span className="font-mono text-[9px] tracking-[0.24em] text-mut">{label}</span>}
    </span>
  );
}

export function Ticker({ items, className }: { items: string[]; className?: string }) {
  const row = (key: string, hidden: boolean) => (
    <div className="flex items-center" key={key} aria-hidden={hidden}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-mono text-[10.5px] font-medium uppercase tracking-[0.32em] text-mut whitespace-nowrap">{t}</span>
          <svg width="7" height="7" viewBox="0 0 8 8" className="text-lime" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" fill="currentColor" transform="rotate(45 4 4)" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee overflow-hidden border-y border-line bg-bg-2 py-3", className)}>
      <div className="marquee-track">
        {row("a", false)}
        {row("b", true)}
      </div>
    </div>
  );
}

export function Kicker({ children, className, tone = "lime" }: { children: ReactNode; className?: string; tone?: "lime" | "ink" }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em]",
        tone === "ink" ? "text-doc-ink/60" : "text-mut",
        className
      )}
    >
      <span className="inline-block h-3 w-1 bg-lime" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  lede,
  dark = false,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("block w-full", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[13px] font-bold text-lime">
          {index}
          <span className="text-line-2">/</span>
        </span>
        <Kicker tone={dark ? "ink" : "lime"}>{kicker}</Kicker>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <h2 className={cn("mt-5 font-display text-3xl sm:text-5xl leading-[1.06] font-semibold tracking-tight max-w-3xl", dark ? "text-doc-ink" : "text-fg")}>
        {title}
      </h2>
      {lede && <p className={cn("mt-5 max-w-2xl text-[15px] sm:text-base leading-relaxed", dark ? "text-doc-ink/75" : "text-mut")}>{lede}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function Btn({
  children,
  onClick,
  href,
  variant = "lime",
  className,
  type,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "lime" | "solid" | "ghost" | "ink";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const styles: Record<string, string> = {
    lime: "bg-lime text-bg border-lime hover:shadow-glow",
    solid: "bg-surface-2 text-fg border-line-2 hover:border-lime/60",
    ghost: "bg-transparent text-fg border-line-2 hover:border-lime/70 hover:text-lime",
    ink: "bg-doc-ink text-doc border-doc-ink hover:opacity-90",
  };
  const cls = cn(
    "btn-hud inline-flex items-center justify-center gap-2.5 border px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] cursor-pointer",
    styles[variant],
    className
  );
  if (href) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={cn("w-4 h-4", className)} aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" className={cn("w-3.5 h-3.5", className)} aria-hidden="true">
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={cn("w-4 h-4", className)} aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}
