import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import App from './App';
import ReactGA from 'react-ga4';
import '@fontsource/roboto';
import pageMetadata from './shared/pageMetadata';

ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        {import.meta.env.MODE === 'development' && <meta name='robots' content='noindex' />}
        <meta name='description' content={pageMetadata.seoDescription} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <App />
        <CssBaseline />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
