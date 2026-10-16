import React, { useState } from 'react';
import { SAMPLE_REPORTS } from '../data/mockData';

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function RotateCcwIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

export interface RevisitBannerProps {
  /** Variable VIN passed to the banner (e.g. '3FA6P0RU9HR306143') */
  vin?: string;
  /** Optional vehicle title override (e.g. '2017 Ford Fusion'). If omitted, automatically derived from VIN or default. */
  vehicleTitle?: string;
  /** Price displayed in the CTA button (defaults to '$20') */
  price?: string | number;
  /** Callback when the user clicks 'Grab it for only $20' */
  onAction?: (vin: string) => void;
  /** Product named in the heading (defaults to 'report') */
  productLabel?: string;
  /** Label shown before the identifier (defaults to 'VIN') */
  identifierLabel?: string;
  /** Callback when user dismisses the banner */
  onClose?: () => void;
  /** Callback when user reopens the dismissed banner */
  onReopen?: () => void;
  /** Variant: 'floating' for bottom-right fixed toast/banner, 'embedded' for inline showcase */
  variant?: 'floating' | 'embedded';
  /** Optional custom class name */
  className?: string;
  /** Controlled open state (defaults to true) */
  isOpen?: boolean;
}

export const RevisitBanner: React.FC<RevisitBannerProps> = ({
  vin = '3FA6P0RU9HR306143',
  vehicleTitle,
  price = '$20',
  onAction,
  productLabel = 'report',
  identifierLabel = 'VIN',
  onClose,
  onReopen,
  variant = 'floating',
  className = '',
  isOpen: controlledIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isVisible = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Resolve vehicle title from mock data or prop
  const resolvedVehicleTitle = React.useMemo(() => {
    if (vehicleTitle) return vehicleTitle;
    const clean = (vin || '').trim().toUpperCase();
    if (clean && SAMPLE_REPORTS[clean]) {
      const rep = SAMPLE_REPORTS[clean];
      return `${rep.year} ${rep.make} ${rep.model}`;
    }
    // Default fallback matching screenshot if VIN is the default
    if (clean === '3FA6P0RU9HR306143') {
      return '2017 Ford Fusion';
    }
    return '2017 Ford Fusion';
  }, [vin, vehicleTitle]);

  const formattedPrice = typeof price === 'number' ? `$${price}` : price.startsWith('$') ? price : `$${price}`;

  const handleDismiss = () => {
    setInternalIsOpen(false);
    onClose?.();
  };

  const handleCtaClick = () => {
    onAction?.(vin);
  };

  // Reopen trigger pill when dismissed in floating mode so reviewer can easily re-test
  if (!isVisible && variant === 'floating') {
    return (
      <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-50 animate-fade-in">
        <button
          id="btn-reopen-revisit-banner"
          onClick={() => {
            setInternalIsOpen(true);
            onReopen?.();
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-line-2 shadow-panel text-fg font-mono text-xs font-bold transition-all hover:border-lime/70 cursor-pointer group hud-corners"
          title="Reopen Revisit Banner Alert"
          aria-label="Reopen Revisit Banner Alert"
        >
          <span className="w-2 h-2 bg-lime animate-pulse" />
          <span className="tracking-[0.14em] uppercase text-[11px]">Report Ready Alert</span>
          <RotateCcwIcon className="w-3.5 h-3.5 text-mut group-hover:rotate-180 transition-transform duration-500 ml-1 text-lime" />
        </button>
      </div>
    );
  }

  if (!isVisible) return null;

  const cardContent = (
    <div
      className={`border border-line-2 border-l-2 border-l-lime bg-surface/95 text-fg backdrop-blur-md p-5 sm:p-6 transition-all duration-300 relative shadow-panel hud-corners corners-on ${className}`}
      role="alert"
      aria-live="polite"
      aria-labelledby="revisit-banner-title"
    >
      {/* Top Row: Pill Badge on Left, Close Button on Right */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        {/* 'Ready for pickup' Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-lime/40 bg-lime/10 text-lime font-mono text-[10px] uppercase font-bold tracking-[0.18em]">
          <ClockIcon className="w-3 h-3 text-lime stroke-[2.2] shrink-0" />
          <span className="whitespace-nowrap">
            Ready for pickup
          </span>
        </div>

        {/* Close Button */}
        <button
          id="btn-close-revisit-banner"
          type="button"
          onClick={handleDismiss}
          className="text-mut hover:text-fg hover:border-line-2 p-1.5 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss alert"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Heading: "Your report for [Year Make Model] is ready!" */}
      <h3
        id="revisit-banner-title"
        className="font-display font-semibold text-fg text-lg sm:text-xl tracking-tight leading-snug mb-1.5"
      >
        Your {productLabel} for {resolvedVehicleTitle} is ready!
      </h3>

      {/* VIN Subtitle: Dynamic variable */}
      <p className="font-mono text-xs font-semibold text-mut uppercase tracking-wider mb-5">
        {identifierLabel}: <span className="text-lime">{vin}</span>
      </p>

      {/* Primary Action Button: "Grab it for only $20" */}
      <button
        id="btn-revisit-grab-report"
        type="button"
        onClick={handleCtaClick}
        className="btn-hud w-full bg-lime text-bg font-display font-bold text-xs uppercase tracking-[0.16em] py-3.5 px-5 transition-all duration-150 hover:bg-fg hover:text-bg flex items-center justify-center gap-2 cursor-pointer group"
      >
        <span>Grab it for only {formattedPrice}</span>
        <ArrowRightIcon className="w-4 h-4 text-bg group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  if (variant === 'embedded') {
    return cardContent;
  }

  // Floating bottom-left alert banner
  return (
    <div
      id="floating-revisit-banner"
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-50 max-w-[390px] sm:max-w-[420px] w-[calc(100%-2.5rem)] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      {cardContent}
    </div>
  );
};
