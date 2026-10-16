import { useEffect, useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { Logo, Btn, ArrowIcon } from "./ui";
import { SITE } from "../config/site";

export type Page =
  | "home"
  | "vehicle-history"
  | "sample"
  | "pricing"
  | "contact"
  | "login"
  | "terms"
  | "privacy"
  | "style-guide";

export const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "vehicle-history", label: "Vehicle History" },
  { page: "sample", label: "Sample Reports" },
  { page: "pricing", label: "Pricing" },
  { page: "contact", label: "Contact" },
];

export default function Header({
  currentPage,
  onNavigate,
  onOpenLookup,
}: {
  currentPage: Page;
  onNavigate: (p: Page) => void;
  onOpenLookup: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p: Page) => {
    setOpen(false);
    onNavigate(p);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* main bar */}
      <div className={cn("border-b border-line bg-bg/85 backdrop-blur-md transition-shadow", scrolled && "shadow-panel")}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-3">
          <button onClick={() => go("home")} className="cursor-pointer" aria-label="Detailed Sticker Sheet — home">
            <Logo invert />
          </button>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className={cn(
                  "relative px-3.5 py-2 font-display text-[12.5px] font-semibold uppercase tracking-[0.1em] cursor-pointer transition-colors",
                  currentPage === item.page ? "text-lime" : "text-mut hover:text-fg"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-[1px] h-0.5 bg-lime transition-transform origin-left",
                    currentPage === item.page ? "scale-x-100" : "scale-x-0"
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Btn variant="ghost" className="px-4 py-2.5" onClick={() => go("login")}>
              Log In
            </Btn>
            <Btn variant="lime" onClick={onOpenLookup}>
              VIN Lookup
              <ArrowIcon />
            </Btn>
          </div>

          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center border border-line-2 bg-surface-2 text-fg cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="flex flex-col gap-1.5">
              <span className={cn("block h-0.5 w-5 bg-current transition-transform", open && "translate-y-2 rotate-45")} />
              <span className={cn("block h-0.5 w-5 bg-current transition-opacity", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-5 bg-current transition-transform", open && "-translate-y-2 -rotate-45")} />
            </div>
          </button>
        </div>

        {/* mobile panel */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height] duration-300",
            open ? "max-h-[440px] border-t border-line" : "max-h-0"
          )}
        >
          <nav className="px-4 py-4 bg-surface flex flex-col" aria-label="Mobile">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className={cn(
                  "flex items-center justify-between px-2 py-3.5 text-left font-display text-[13px] font-semibold uppercase tracking-[0.12em] cursor-pointer border-b border-line/70",
                  currentPage === item.page ? "text-lime" : "text-fg"
                )}
              >
                <span>
                  <span className="font-mono text-[10px] text-mut mr-3">0{i + 1}</span>
                  {item.label}
                </span>
                <ArrowIcon className={currentPage === item.page ? "text-lime" : "text-line-2"} />
              </button>
            ))}
            <div className="flex gap-3 pt-4">
              <Btn variant="ghost" className="flex-1" onClick={() => go("login")}>
                Log In
              </Btn>
              <Btn
                variant="lime"
                className="flex-1"
                onClick={() => {
                  setOpen(false);
                  onOpenLookup();
                }}
              >
                VIN Lookup
              </Btn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
