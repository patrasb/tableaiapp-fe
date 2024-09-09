import DialogTitle from '@mui/material/DialogTitle';
import AuthSelector from './AuthSelector';
import Email from './Email';
import EmailValidate from './EmailValidate';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import CompleteProfile from './CompleteProfile';
import SignInBackgroundSvg from '@/images/signInBackground.svg?react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Navbar from '@/components/Navbar';
import { useContext } from 'react';
import { UserContext } from '@/App';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { Helmet } from 'react-helmet-async';
import pageMetadata from '@/shared/pageMetadata';

export default function SignInModal() {
  const { currentUser } = useContext(UserContext);
  const [emailForSignIn, setEmailForSignIn] = useLocalStorage<string | null>('emailForSignIn', null);

  return (
    <>
      <Helmet>
        <title>{pageMetadata.title} - Sign In</title>
        <meta name='title' content={pageMetadata.seoTitle} />
      </Helmet>
      <Box position='absolute' width='100%' zIndex={2}>
        <Navbar />
      </Box>
      <SignInBackgroundSvg
        width='100%'
        height='60%'
        style={{
          position: 'absolute',
          bottom: 0,
        }}
      />
      <Grid container justifyContent='center' alignItems='center' zIndex={1} position='absolute' height='100%'>
        <Grid item>
          <Paper sx={{ width: 350 }} elevation={10}>
            <DialogTitle>Sign in to InvoEQ</DialogTitle>
            <DialogContent sx={{ height: 300 }}>
              {currentUser === undefined ? (
                <Stack direction='row' height='100%' width='100%' alignItems='center' justifyContent='center'>
                  <CircularProgress />
                </Stack>
              ) : (
                <Routes>
                  <Route index element={<AuthSelector currentUser={currentUser} />} />
                  <Route path='email' element={<Email setEmailForSignIn={setEmailForSignIn} />} />
                  <Route
                    path='validate'
                    element={<EmailValidate currentUser={currentUser} emailForSignIn={emailForSignIn} setEmailForSignIn={setEmailForSignIn} />}
                  />
                  <Route path='complete' element={<CompleteProfile />} />
                </Routes>
              )}
            </DialogContent>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
