import LogoSvg from '@/images/logoEmpty.svg?react';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileAvatar from './ProfileAvatar';
import { useContext } from 'react';
import { UserContext } from '@/App';
import { ROUTES } from '@/router';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

interface Props {
  backgroundColor?: string;
}
export default function Navbar({ backgroundColor }: Props) {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  // function scrollToId(id: string) {
  //   document?.getElementById(id)?.scrollIntoView();
  // }
  return (
    <Grid container justifyContent='center' sx={{ backgroundColor }}>
      <Grid container item xs={11} direction='row' justifyContent='space-between' alignItems='center' paddingY={2}>
        <LogoSvg cursor='pointer' onClick={() => navigate(ROUTES.landing)} />
        <Stack direction='row' spacing={2} alignItems='center'>
          {currentUser?.isAnonymous === false ? (
            <>
              {location.pathname !== ROUTES.app && (
                <Button variant='contained' component={Link} to={ROUTES.app}>
                  Open Dashboard
                </Button>
              )}
              <ProfileAvatar />
            </>
          ) : (
            <Button variant='contained' component={Link} to={ROUTES.signIn}>
              Sign In
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
