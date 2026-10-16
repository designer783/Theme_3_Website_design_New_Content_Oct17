import React from 'react';
import { VinLookupBox } from './VinLookupBox';
import { Reveal, HBadge } from './ui';

interface HeroProps {
  onSearchVin?: (vin: string) => void;
  onOpenSample?: (vin: string) => void;
  onViewStickers?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchVin }) => {
  return (
    <section className="border-b border-line grid-bg relative overflow-hidden">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal variant="pulse">
            <HBadge>Factory Build Sheet &amp; Real-Time History · No Fluff</HBadge>
          </Reveal>
          <Reveal variant="feed" delay={120}>
            <h1 className="mt-7 font-display text-4xl sm:text-6xl leading-[1.04] font-semibold tracking-tight text-fg max-w-[20ch]">
              Stop Selling Your Car <span className="text-lime">In The Dark</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-mut">
              Buyers negotiate hard when you lack proof. Decode your 17-digit VIN in seconds: pull unedited title records, auction damage photos, odometer logs, and the original factory Monroney window sticker. Know every option before they lowball you.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 w-full">
              <VinLookupBox vinRedirectPath="/members/vin-check/preview" onSearchVin={onSearchVin} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={250} className="relative">
          <div className="relative max-w-md mx-auto lg:ml-auto">
            <div className="border border-line-2 bg-surface shadow-panel hud-corners corners-on overflow-hidden">
              <img
                src="/hero-image.webp"
                alt="Vehicle History Documentation Preview"
                className="w-full object-contain"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
