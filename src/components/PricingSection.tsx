import React, { useState } from 'react';
import { PRICING_PACKAGES, HISTORY_PACKAGES } from '../data/mockData';
import { PricingPackage } from '../types';
import { Kicker, Btn, ArrowIcon, CheckIcon } from './ui';
import { CheckoutModal } from './CheckoutModal';
import { cn } from '../utils/vehicleLookup';

interface PricingSectionProps {
  onSelectPackage?: (pkg: PricingPackage) => void;
  packages?: PricingPackage[];
  showTabs?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  packages,
  showTabs = false,
}) => {
  const [activeTab, setActiveTab] = useState<'sticker' | 'history'>('sticker');
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);

  const displayPackages = packages || (showTabs && activeTab === 'history' ? HISTORY_PACKAGES : PRICING_PACKAGES);

  const handleChoose = (pkg: PricingPackage) => {
    setSelectedPkg(pkg);
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
  };

  return (
    <section id="pricing-section" className="py-16 sm:py-24 border-b border-line bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Kicker>Zero Hidden Fees · Pay Once</Kicker>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-semibold tracking-tight text-fg">
            Cheaper Than One Bad Deal
          </h2>
          <p className="mt-4 text-base text-mut leading-relaxed max-w-2xl mx-auto">
            Missing one factory package can cost you $2,000+ at resale. Grab your credits once—they never expire. Use them today or months from now.
          </p>
        </div>

        {showTabs && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-surface-2 p-1 border border-line">
              <button
                onClick={() => setActiveTab('sticker')}
                className={cn(
                  'px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer',
                  activeTab === 'sticker'
                    ? 'bg-lime text-bg font-bold'
                    : 'text-mut hover:text-fg'
                )}
              >
                Window Stickers
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={cn(
                  'px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer',
                  activeTab === 'history'
                    ? 'bg-lime text-bg font-bold'
                    : 'text-mut hover:text-fg'
                )}
              >
                Vehicle History
              </button>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 ${displayPackages.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 items-stretch max-w-7xl mx-auto`}>
          {displayPackages.map((pkg) => {
            const isPopular = Boolean(pkg.popular || pkg.isPopular);
            return (
              <div
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={cn(
                  'relative border bg-surface p-6 sm:p-7 flex flex-col justify-between hud-corners',
                  isPopular ? 'border-lime/80 shadow-glow' : 'border-line'
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-lime text-bg font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-display text-xl font-semibold text-fg">{pkg.name}</h3>
                    {pkg.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">{pkg.badge}</span>
                    )}
                  </div>

                  <p className="text-xs text-mut mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-line">
                    <span className={cn("font-display text-4xl sm:text-5xl font-semibold tracking-tight", isPopular ? "text-lime" : "text-fg")}>
                      ${pkg.price}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-mut">
                      {pkg.billingCycle || 'one-time payment'}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs sm:text-[13px] text-fg/80">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-line bg-bg-2">
                          <CheckIcon className="text-lime w-2.5 h-2.5" />
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Btn
                  variant={isPopular ? 'lime' : 'solid'}
                  onClick={() => handleChoose(pkg)}
                  className="w-full"
                >
                  {pkg.ctaText} <ArrowIcon />
                </Btn>
              </div>
            );
          })}
        </div>

        <div className="mt-14 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <h4 className="font-display text-sm font-semibold text-fg">Credits Never Expire</h4>
            <p className="text-xs text-mut mt-1 max-w-xs leading-relaxed">
              Purchase now and use your credits whenever you're ready to sell.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-display text-sm font-semibold text-fg">Instant PDF &amp; Web Delivery</h4>
            <p className="text-xs text-mut mt-1 max-w-xs leading-relaxed">
              Generate your window sticker or vehicle history report in seconds, ready to share with buyers.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-display text-sm font-semibold text-fg">NMVTIS &amp; DMV Certified</h4>
            <p className="text-xs text-mut mt-1 max-w-xs leading-relaxed">
              Direct access to official federal databases, state DMVs, and factory databases.
            </p>
          </div>
        </div>
      </div>

      {selectedPkg && (
        <CheckoutModal
          pkgName={selectedPkg.name}
          pkgPrice={selectedPkg.price}
          pkgCode={selectedPkg.code}
          checkoutType={selectedPkg.checkoutType}
          onClose={() => setSelectedPkg(null)}
        />
      )}
    </section>
  );
};
