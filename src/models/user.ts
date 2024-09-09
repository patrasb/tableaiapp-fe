import { type StripeRole } from '@/shared/Billing';
import { db } from '../services/firebase';

import { type MetaTypeCreator, getFirelord, type PossiblyReadAsUndefined, type ServerTimestamp } from 'firelordjs';

// partially matches https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.userrecord
export type User = MetaTypeCreator<
  {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean | null;
    photoURL: string | null;
    isAnonymous: boolean;
    createdAt: ServerTimestamp;
    availableCredits: number;
    stripeRole: StripeRole;
  },
  'users',
  string,
  null
>;

export type CheckoutSession = MetaTypeCreator<
  {
    price: string; // stripe price_id
    success_url: string;
    cancel_url: string;
    url: string | PossiblyReadAsUndefined;
    created: ServerTimestamp | PossiblyReadAsUndefined;
  },
  'checkout_sessions',
  string,
  User
>;

export const checkoutSession = getFirelord<CheckoutSession>(db, 'users', 'checkout_sessions');
export const user = getFirelord<User>(db, 'users');
