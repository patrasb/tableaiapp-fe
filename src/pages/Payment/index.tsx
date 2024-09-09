import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WelcomeSvg from '@/images/welcome.svg?react';
import Navbar from '@/components/Navbar';
import { ROUTES } from '@/router';

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <Grid container direction={'column'} justifyContent='center' alignItems='center' zIndex={1} height='100%' paddingTop={20} gap={2}>
        <Typography variant={'h1'} textAlign={'center'}>
          Payment successful!
        </Typography>
        <Typography variant={'h4'} textAlign={'center'}>
          Enjoy your new tool and let us know how much time you saved!
        </Typography>
        <Typography variant={'h6'} textAlign={'center'}>
          Please note that the credits might take a few minutes until they reach your account!
        </Typography>
        <WelcomeSvg style={{ width: '100%' }} />

        <Button variant='contained' component={Link} to={ROUTES.app}>
          Open Dashboard
        </Button>
      </Grid>
    </>
  );
}
