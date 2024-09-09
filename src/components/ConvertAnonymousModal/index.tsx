import { DialogContent, Fab, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import SignUpSvg from '@/images/signUp.svg?react';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function ConvertAnonymousModal({ open, setOpen }: Props) {
  return (
    <Dialog open={open}>
      <Box width={450}>
        <DialogTitle>
          <Stack direction='row' justifyContent='space-between' alignItems='flex-end'>
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ marginBottom: 3 }}>
          <Stack direction='column' alignItems='center' textAlign='center' spacing={5}>
            <SignUpSvg width={350} height={200} />
            <Typography variant='h5'>Please sign up to continue uploading for free!</Typography>
            <Fab variant='extended' color='primary' component={Link} to={ROUTES.signIn}>
              <LoginRoundedIcon sx={{ mr: 1 }} />
              Create an account
            </Fab>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
