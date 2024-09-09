import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Button from '@mui/material/Button';
import GoogleSignInButton from './GoogleSignInButton';
import { Link as RouterLink } from 'react-router-dom';
import { type User } from 'firebase/auth';

interface Props {
  currentUser: User | null;
}

export default function SignInModal({ currentUser }: Props) {
  const [errorAlertMessage, setErrorAlertMessage] = useState<string | null>(null);

  return (
    <Stack direction='column' spacing={2} marginTop={2}>
      <FormLabel>How would you like to continue?</FormLabel>
      <Button component={RouterLink} to='email' color='primary' variant='contained' startIcon={<EmailRoundedIcon />} fullWidth>
        Continue with email
      </Button>
      <GoogleSignInButton currentUser={currentUser} setErrorAlertMessage={setErrorAlertMessage} />
      {errorAlertMessage && <Alert severity='error'>{errorAlertMessage}</Alert>}
    </Stack>
  );
}
