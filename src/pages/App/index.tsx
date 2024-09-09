import { UserContext } from '@/App';
import Navbar from '@/components/Navbar';
import { ROUTES } from '@/router';
import pageMetadata from '@/shared/pageMetadata';
import CircularProgress from '@mui/material/CircularProgress';
import { lazy, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

const Parser = lazy(() => import('@/components/Parser'));

export default function AppPage() {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) navigate(ROUTES.signIn);
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>{pageMetadata.title} - Dashboard</title>
        <meta name='title' content={pageMetadata.seoTitle + ' - Dashboard'} />
      </Helmet>
      {currentUser ? (
        <>
          <Navbar backgroundColor='#EAE0F5' />
          <Parser variant='full' />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
