import { auth } from '@/services/firebase';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { sendSignInLinkToEmail } from 'firebase/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import EmailSentSvg from '@/images/emailSent.svg?react';
import Typography from '@mui/material/Typography';
import { ROUTES } from '@/router';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

interface Props {
  setEmailForSignIn: (value: string | null) => void;
}

export default function Email({ setEmailForSignIn }: Props) {
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: ({ email }) => {
      sendSignInLinkToEmail(auth, email, {
        url: import.meta.env.VITE_HOST + ROUTES.signIn + '/validate',
        handleCodeInApp: true,
      })
        .then(() => {
          setEmailForSignIn(email);
          setSuccess(true);
        })
        .catch((err) => {
          setErrorAlertMessage(`An unexpected error occured (${err.code})`);
        });
    },
  });

  return success ? (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} marginTop={4}>
      <EmailSentSvg width={100} height='100%' />
      <Typography variant='h6' textAlign='center'>
        {"We've sent you a login link to your email!"}
      </Typography>
      <Typography variant='subtitle1'>You can close this window</Typography>
    </Stack>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction='column' spacing={2} marginTop={2}>
        <FormLabel>Please enter your e-mail address to continue:</FormLabel>
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.email && Boolean(formik.errors.email)) ?? false}
          helperText={formik.touched.email && formik.errors.email}
        />
        <LoadingButton loading={formik.isSubmitting} color='primary' variant='contained' fullWidth type='submit'>
          Send me a login link
        </LoadingButton>
        {errorAlertMessage && <Alert severity='error'>{errorAlertMessage}</Alert>}
      </Stack>
    </form>
  );
}
