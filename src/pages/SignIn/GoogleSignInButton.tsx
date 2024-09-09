import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, type User, linkWithPopup, signInWithCredential, signInWithPopup, type UserCredential } from 'firebase/auth';

import { useContext, useState } from 'react';
import { auth } from '@/services/firebase';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import { postUserSignIn } from '@/utils/authOperations';
import { UserContext } from '@/App';
const provider = new GoogleAuthProvider();

interface Props {
  setErrorAlertMessage: (msg: string) => void;
  currentUser: User | null;
}
export default function GoogleSignInButton({ setErrorAlertMessage, currentUser }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { localAvailableCredits } = useContext(UserContext);
  const navigate = useNavigate();

  function handleOnSubmit() {
    setLoading(true);

    (currentUser ? linkWithPopup(currentUser, provider) : signInWithPopup(auth, provider)).then(handleSuccess).catch(async (err) => {
      if (err.code === 'auth/credential-already-in-use') {
        const credential = GoogleAuthProvider.credentialFromError(err);
        if (!credential) setErrorAlertMessage('An unexpected error occured!');
        else await signInWithCredential(auth, credential).then(handleSuccess);
      } else if (err.code === 'auth/popup-closed-by-user') setLoading(false);
      else setErrorAlertMessage(`An unexpected error occured (${err.code})`);
    });
  }

  const handleSuccess = async (userCredential: UserCredential) => {
    await postUserSignIn(userCredential, localAvailableCredits);
    navigate(ROUTES.app);
  };

  return (
    <LoadingButton loading={loading} onClick={handleOnSubmit} color='primary' variant='outlined' startIcon={<GoogleIcon />} fullWidth>
      Continue with Google
    </LoadingButton>
  );
}
