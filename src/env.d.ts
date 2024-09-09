/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST: string;
  readonly VITE_GCP_PROJECT: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_FIREBASE_DEFAULT_BUCKET_NAME: string;
  readonly VITE_STRIPE_STARTER_PRICE_ID: string;
  readonly VITE_STRIPE_PRO_PRICE_ID: string;
  readonly VITE_STRIPE_CREATE_PORTAL_LINK_FUNCTION: string;
  readonly VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
