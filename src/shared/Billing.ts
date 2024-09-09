export enum StripeRole {
  Free = 'free',
  Starter = 'starter',
  Pro = 'pro',
}

export const StripeRoleNumeric: Record<StripeRole, number> = {
  [StripeRole.Free]: 1,
  [StripeRole.Starter]: 2,
  [StripeRole.Pro]: 3,
};

export const StripePriceId: Partial<Record<StripeRole, string>> = {
  [StripeRole.Starter]: import.meta.env.VITE_STRIPE_STARTER_PRICE_ID,
  [StripeRole.Pro]: import.meta.env.VITE_STRIPE_STARTER_PRICE_ID,
};

export interface BillingPlan {
  stripeRole: StripeRole;
  displayPrice: string;
  title: string;
  info: string;
  featureList: Array<{ active: boolean; description: string }>;
}

export const freeCredits = 3;

export const billingPlans: BillingPlan[] = [
  {
    stripeRole: StripeRole.Free,
    displayPrice: 'free',
    title: 'Free',
    info: 'With our free version you get the following:',
    featureList: [
      {
        active: true,
        description: '3 pages every 24 hours',
      },
      {
        active: false,
        description: 'PDF support',
      },
      {
        active: false,
        description: 'All exports',
      },
      {
        active: false,
        description: 'Email parser',
      },
      {
        active: false,
        description: 'Table editing',
      },
    ],
  },
  {
    stripeRole: StripeRole.Starter,
    displayPrice: '€ 2.99',
    title: 'Starter',
    info: 'The starter version is great for single users:',
    featureList: [
      {
        active: true,
        description: '100 pages per month',
      },
      {
        active: true,
        description: 'PDF support',
      },
      {
        active: true,
        description: 'All exports',
      },
      {
        active: false,
        description: 'Email parser',
      },
      {
        active: false,
        description: 'Table editing',
      },
    ],
  },
  {
    stripeRole: StripeRole.Pro,
    displayPrice: '€ 11.99',
    title: 'Pro',
    info: 'The pro version is suited for users that need automation and processing of a large amount of files:',
    featureList: [
      {
        active: true,
        description: '500 pages per month',
      },
      {
        active: true,
        description: 'PDF support',
      },
      {
        active: true,
        description: 'All exports',
      },
      {
        active: true,
        description: 'Email parser',
      },
      {
        active: true,
        description: 'Table editing',
      },
    ],
  },
];
