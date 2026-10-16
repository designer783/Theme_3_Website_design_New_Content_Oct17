import plansJson from './plans.json';
import type { PricingPackage } from '../types';

// Prices, counts and plan codes come from plans.json. Marketing copy (description,
// features) is supplied per card by the caller, so editing the JSON updates every price.

export type PlanKind = 'sticker' | 'report';

interface RawPlan {
  name: string;
  code: string;
  price: string;
  nos: string;
  recurring?: string;
}

interface PlanGroup {
  credit_plans: RawPlan[];
  subscription: RawPlan[];
}

const getGroup = (kind: PlanKind): PlanGroup => {
  const entry = (plansJson as Record<string, any>[]).find((e) => e[kind])?.[kind] ?? {};
  // Sticker uses "subscription_plan", report uses "uvc_subscription_plan"
  const subscriptionKey = Object.keys(entry).find((k) => k.endsWith('subscription_plan'));
  return {
    credit_plans: [...(entry.credit_plans ?? [])].sort((a: RawPlan, b: RawPlan) => Number(a.nos) - Number(b.nos)),
    subscription: subscriptionKey ? entry[subscriptionKey] : [],
  };
};

// Price of a single sticker / single report (the 1-credit plan), or null if plans.json has none
export const getSinglePrice = (kind: PlanKind): number | null => {
  const plan = getGroup(kind).credit_plans.find((p) => Number(p.nos) === 1);
  const price = plan ? Number(plan.price) : NaN;
  return Number.isFinite(price) ? price : null;
};

export interface CardCopy {
  description: string;
  features: (count: number) => string[];
  popular?: boolean;
  badge?: string;
}

export const buildPackages = (
  kind: PlanKind,
  copy: { credit: CardCopy[]; subscription: CardCopy }
): PricingPackage[] => {
  const { credit_plans, subscription } = getGroup(kind);
  const unit = kind === 'sticker' ? 'Sticker' : 'Report';
  const checkoutType = kind === 'sticker' ? 'sticker' : 'vhr';
  const singlePrice = credit_plans.length ? Number(credit_plans[0].price) / Number(credit_plans[0].nos) : 0;

  const credit = credit_plans.map((plan, i): PricingPackage => {
    const count = Number(plan.nos);
    const price = Number(plan.price);
    const text = copy.credit[Math.min(i, copy.credit.length - 1)];
    const fullPrice = Math.round(singlePrice * count * 100) / 100;
    const saving = fullPrice > price ? Math.round((1 - price / fullPrice) * 100) : 0;
    return {
      id: plan.code,
      code: plan.code,
      checkoutType,
      name: `${count} ${unit}${count > 1 ? 's' : ''}`,
      reportsCount: count,
      price,
      originalPrice: saving ? fullPrice : undefined,
      badge: text.badge ?? (saving ? `Save ${saving}%` : undefined),
      popular: text.popular,
      billingCycle: 'one-time payment',
      description: text.description,
      ctaText: `Get ${count} ${unit}${count > 1 ? 's' : ''}`,
      features: text.features(count),
    };
  });

  const subs = subscription.map((plan): PricingPackage => {
    // The sticker subscription is always sold as unlimited, whatever its nos value
    const unlimited = kind === 'sticker' || Number(plan.nos) < 0;
    const count = unlimited ? -1 : Number(plan.nos);
    return {
      id: plan.code,
      code: plan.code,
      checkoutType,
      name: unlimited ? plan.name : `${count} ${unit}s / Month`,
      reportsCount: 1,
      price: Number(plan.price),
      badge: copy.subscription.badge,
      popular: copy.subscription.popular,
      billingCycle: plan.recurring === 'monthly' ? '/month' : '/subscription',
      description: copy.subscription.description,
      ctaText: unlimited ? 'Get Unlimited Access' : 'Subscribe Now',
      features: copy.subscription.features(count),
    };
  });

  return [...credit, ...subs];
};
