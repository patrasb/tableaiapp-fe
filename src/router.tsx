import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import FullPageLoader from './components/FullPageLoader';

const LandingPage = lazy(() => import('@/pages/Landing'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const AppPage = lazy(() => import('@/pages/App'));
const PaymentPage = lazy(() => import('@/pages/Payment'));

const withSuspense = (component: JSX.Element) => <Suspense fallback={<FullPageLoader />}>{component}</Suspense>;

export const ROUTES = {
  landing: '/',
  signIn: '/sign-in',
  app: '/app',
  paymentSuccess: '/payment-success',
};

export default createBrowserRouter([
  {
    path: ROUTES.landing,
    element: withSuspense(<LandingPage />),
  },
  {
    path: ROUTES.signIn + '/*',
    element: withSuspense(<SignIn />),
  },
  {
    path: ROUTES.app,
    element: withSuspense(<AppPage />),
  },
  {
    path: ROUTES.paymentSuccess,
    element: withSuspense(<PaymentPage />),
  },
]);
