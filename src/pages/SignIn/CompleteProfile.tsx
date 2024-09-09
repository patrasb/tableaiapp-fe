import { auth } from '@/services/firebase';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { updateProfile } from 'firebase/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import CompleteProfileSuccess from '@/images/completeProfileSuccess.svg?react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router';

const validationSchema = yup.object({
  displayName: yup.string().required(),
});

export default function CompleteProfile() {
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { currentUser } = auth;

  const formik = useFormik({
    initialValues: {
      displayName: currentUser?.displayName ?? '',
    },
    validationSchema,
    onSubmit: ({ displayName }) => {
      if (!currentUser) setErrorAlertMessage("You're not logged in!");
      updateProfile(currentUser!, { displayName })
        .then(() => setSuccess(true))
        .catch((err) => {
          setErrorAlertMessage(`An unexpected error occured (${err.code})`);
        });
    },
  });

  return success ? (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} marginTop={4}>
      <CompleteProfileSuccess width={150} height='100%' />
      <Typography variant='h6' textAlign='center'>
        {'Your profile has been updated!'}
      </Typography>
      <Button variant='text' component={Link} to={ROUTES.app}>
        Continue to Dashboard
      </Button>
    </Stack>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction='column' spacing={2} marginTop={2}>
        <FormLabel>Please complete your profile by entering your full name:</FormLabel>
        <TextField
          fullWidth
          id='displayName'
          name='displayName'
          label='Full Name'
          value={formik.values.displayName}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.displayName && Boolean(formik.errors.displayName)) ?? false}
          helperText={formik.touched.displayName && formik.errors.displayName}
        />
        <LoadingButton loading={formik.isSubmitting} color='primary' variant='contained' fullWidth type='submit'>
          Confirm
        </LoadingButton>
        {errorAlertMessage && <Alert severity='error'>{errorAlertMessage}</Alert>}
      </Stack>
    </form>
  );
}
