import { auth } from '@/services/firebase';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { isSignInWithEmailLink, EmailAuthProvider, linkWithCredential, signInWithCredential, fetchSignInMethodsForEmail, type User } from 'firebase/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import { postUserSignIn } from '@/utils/authOperations';
import { UserContext } from '@/App';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

interface Props {
  currentUser: User | null;
  emailForSignIn: string | null;
  setEmailForSignIn: (value: string | null) => void;
}

export default function EmailValidate({ currentUser, emailForSignIn, setEmailForSignIn }: Props) {
  const navigate = useNavigate();
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(null);
  const { localAvailableCredits } = useContext(UserContext);

  // validate the link with firebase auth
  if (!isSignInWithEmailLink(auth, window.location.href)) return <Alert severity='error'>Invalid sign-in link</Alert>;

  const formik = useFormik({
    initialValues: {
      email: emailForSignIn ?? '',
    },
    validationSchema,
    onSubmit: async ({ email }, { setFieldError }) => {
      // we don't need the emailForSignIn anymore
      setEmailForSignIn(null);

      const credential = EmailAuthProvider.credentialWithLink(email, window.location.href);
      // we check if the email already has a registered account. If so, we run a signIn operation. If the user is also
      // not signed in anonymously, we also run a sign in operation. Otherwise we convert the anonymous account
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      await (signInMethods.length || !currentUser ? signInWithCredential(auth, credential) : linkWithCredential(currentUser, credential))
        .then(async (userCredential) => {
          await postUserSignIn(userCredential, localAvailableCredits);
          navigate(userCredential.user.displayName ? '/' : '../complete');
        })
        .catch((err) => {
          if (err.code === 'auth/invalid-email') setFieldError('email', "The email doesn't match with the link");
          else if (err.code === 'auth/invalid-action-code') setErrorAlertMessage('The link seems to be invalid');
          else setErrorAlertMessage(`An unexpected error occured (${err.code})`);
        });
    },
  });

  useEffect(() => {
    if (emailForSignIn) formik.submitForm();
  }, []);

  return (
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
          Submit
        </LoadingButton>
        {errorAlertMessage && <Alert severity='error'>{errorAlertMessage}</Alert>}
      </Stack>
    </form>
  );
}
