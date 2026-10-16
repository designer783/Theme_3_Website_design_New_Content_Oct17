import React from 'react';
import { Kicker, Btn, ArrowIcon } from './ui';

interface WindowStickerSectionProps {
  onOpenSticker?: (vin: string) => void;
  onNavigateStickerPage?: () => void;
}

export const WindowStickerSection: React.FC<WindowStickerSectionProps> = ({
  onNavigateStickerPage,
}) => {
  return (
    <section className="py-16 sm:py-24 border-b border-line bg-surface/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Kicker>Original Factory Birth Certificate</Kicker>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-fg leading-tight">
            The Window Sticker Dealers Don't Want You To Have
          </h2>
          <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-mut">
            A history report tells you what happened to the car. The window sticker tells you what the car actually is. Every single factory option, package code, mechanical spec, and original MSRP. Print it, hand it to the buyer, and eliminate every excuse to negotiate down.
          </p>
          <div className="mt-8">
            <Btn variant="lime" onClick={() => onNavigateStickerPage && onNavigateStickerPage()}>
              Get Your Window Sticker <ArrowIcon />
            </Btn>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border border-line-2 bg-bg-2 p-2 hud-corners shadow-panel max-w-lg">
            <img
              src="/Classic%20Vehicle.webp"
              alt="Classic Vehicle Window Sticker"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
