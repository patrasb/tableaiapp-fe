import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useState, type MouseEvent, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth, functions } from '@/services/firebase';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router';
import { UserContext } from '@/App';
import { httpsCallable } from 'firebase/functions';
import { StripeRole } from '@/shared/Billing';
import { ROUTES } from '@/router';

export default function ProfileAvatar() {
  const { currentUser, userDoc } = useContext(UserContext);
  const userData = userDoc?.data();
  const stripeRole = userData?.stripeRole ?? StripeRole.Free;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    window.localStorage.setItem('creditsVoided', 'true');
    signOut(auth).then(handleClose);
  };

  const handleBilling = async () => {
    const functionRef = httpsCallable(functions, import.meta.env.VITE_STRIPE_CREATE_PORTAL_LINK_FUNCTION);

    const { data }: any = await functionRef({
      returnUrl: window.location.origin,
    });

    if (data?.url) {
      window.location.assign(data?.url);
    }
  };

  const photoURL = currentUser?.photoURL;
  const displayName = currentUser?.displayName;

  const initials = displayName
    ?.match(/(\b\S)?/g)
    ?.join('')
    ?.match(/(^\S|\S$)?/g)
    ?.join('')
    .toUpperCase();

  return (
    <>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar alt={'Profile Avatar'} src={photoURL ?? ''} sx={{ margin: 0 }}>
            {initials ?? '??'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} id='account-menu' open={open} onClose={handleClose} onClick={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(ROUTES.signIn + '/complete');
          }}
        >
          <ListItemIcon>
            <PersonRoundedIcon fontSize='small' />
          </ListItemIcon>
          Update profile
        </MenuItem>
        {stripeRole !== StripeRole.Free && (
          <MenuItem onClick={handleBilling}>
            <ListItemIcon>
              <CreditCardRoundedIcon fontSize='small' />
            </ListItemIcon>
            Billing settings
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
