import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { SITE } from '../config/site';
import { Kicker } from './ui';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="border-b border-line py-16 sm:py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Kicker>Real Proof · Real Buyers &amp; Sellers</Kicker>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-fg">
              They Saved Thousands. You Can Too.
            </h2>
            <p className="mt-3 text-base text-mut max-w-2xl leading-relaxed">
              Real owners who pulled their window sticker or vehicle dossier before negotiating. No corporate testimonials—just genuine feedback.
            </p>
          </div>
          <div className="border border-line bg-surface px-5 py-3 hud-corners shrink-0">
            <span className="font-display text-2xl font-bold text-lime">4.9</span>
            <span className="font-mono text-xs text-mut ml-2">/ 5.0 (2,400+ lookups)</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="border border-line bg-surface p-5 flex flex-col justify-between hud-corners">
              <div>
                <div className="flex text-lime text-xs mb-3 tracking-widest">★★★★★</div>
                <p className="text-xs sm:text-[13px] text-mut leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line">
                <h4 className="font-display text-sm font-semibold text-fg">{t.author}</h4>
                {t.vehicleChecked && (
                  <p className="font-mono text-[10px] text-mut mt-0.5">{t.vehicleChecked}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
