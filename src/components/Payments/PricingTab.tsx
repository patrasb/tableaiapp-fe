import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import HighlightOff from '@mui/icons-material/HighlightOff';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/App';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import { checkoutSession } from '@/models/user';
import { addDoc, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firelordjs';
import { StripePriceId, type BillingPlan, StripeRole } from '@/shared/Billing';

interface Props {
  billingPlan: BillingPlan;
}
export default function PricingTab({ billingPlan }: Props) {
  const { displayPrice, title, info, featureList, stripeRole } = billingPlan;
  const navigate = useNavigate();
  const { currentUser, userDoc } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [listenForCheckoutSessionUrl, setListenForCheckoutSessionUrl] = useState<boolean>(false);

  const userStripeRole = userDoc?.data()?.stripeRole;

  useEffect(() => {
    if (listenForCheckoutSessionUrl && currentUser)
      return onSnapshot(
        query(checkoutSession.collection(currentUser.uid), orderBy('created', 'desc'), limit(1)),
        (querySnapshot) =>
          querySnapshot.docChanges().forEach(({ type, doc }) => {
            if (type === 'modified' && doc.data().url) window.location.href = doc.data().url as string;
          }),
        (error) => {
          console.error(error);
          setLoading(false);
          // handle error
        },
      );
  }, [listenForCheckoutSessionUrl, currentUser]);

  function redirectToCheckout() {
    if (!currentUser) {
      navigate(ROUTES.signIn);
      return;
    }
    setLoading(true);

    addDoc(checkoutSession.collection(currentUser.uid), {
      price: StripePriceId[stripeRole]!,
      success_url: import.meta.env.VITE_HOST + `/paymentSuccess?role=${stripeRole}`,
      cancel_url: import.meta.env.VITE_HOST,
      created: serverTimestamp(),
      url: '',
    }).then(() => setListenForCheckoutSessionUrl(true));
  }

  return (
    <Grid
      container
      gap={1}
      direction={'column'}
      justifyContent='center'
      alignItems='flex-start'
      sx={{
        backgroundColor: '#E0C8FF',
        borderRadius: '20px',
        padding: '32px',
        width: '340px',
        height: '500px',
        position: 'relative',
        top: '0',
        transition: 'all ease 0.5s',
        cursor: 'pointer',
        ':hover': { background: '#231D4F', color: 'white', transform: 'translate(8px,-8px)' },
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
      }}
    >
      <Typography variant={'h5'} marginBottom={2}>
        <span style={{ fontWeight: 'bold' }}>{displayPrice}</span> / month
      </Typography>
      <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant={'subtitle1'}>{info}</Typography>
      <List sx={{ flexGrow: 2 }}>
        {featureList.map((feature, index) => (
          <ListItem disablePadding key={index}>
            <ListItemIcon>{feature.active ? <CheckCircleOutline color='success' /> : <HighlightOff color='error' />}</ListItemIcon>
            <ListItemText primary={feature.description} />
          </ListItem>
        ))}
      </List>
      {(!userStripeRole && billingPlan.stripeRole === StripeRole.Free) || billingPlan.stripeRole === userStripeRole ? (
        <Button variant={'text'} sx={{ fontWeight: 'bold' }} fullWidth>
          Already active
        </Button>
      ) : (
        <LoadingButton disabled={loading} loading={loading} variant={'contained'} onClick={redirectToCheckout} fullWidth>
          Choose plan
        </LoadingButton>
      )}
    </Grid>
  );
}
