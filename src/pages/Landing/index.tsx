import Navbar from '@/components/Navbar';
import IntroSection from './IntroSection';
import Stack from '@mui/material/Stack';
import { Helmet } from 'react-helmet-async';
import pageMetadata from '@/shared/pageMetadata';
import { Suspense, lazy } from 'react';

const Parser = lazy(() => import('@/components/Parser'));
const ProductDescription = lazy(() => import('./ProductDescription'));
const PricingDescription = lazy(() => import('./PricingDescription'));
const UseDescription = lazy(() => import('./UsageDescription'));
const Footer = lazy(() => import('@/components/Footer'));

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>{pageMetadata.title} - Extract Table from Image</title>
        <meta name='title' content={pageMetadata.seoTitle} />
      </Helmet>
      <Navbar backgroundColor='#EAE0F5' />

      <Stack direction='column' spacing={10}>
        <IntroSection />
        <Suspense fallback={null}>
          <Parser variant='uploadOnly' />
          <UseDescription />
          <ProductDescription />
          <PricingDescription noFreeOption={false} />
          <Footer />
        </Suspense>
      </Stack>
    </>
  );
}
