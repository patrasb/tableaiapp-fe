import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import PricingTab from '@/components/Payments/PricingTab';
import { StripeRole, billingPlans } from '@/shared/Billing';

interface Props {
  noFreeOption?: boolean;
}

export default function PricingDescription({ noFreeOption }: Props) {
  const filteredBillingPlans = noFreeOption ? billingPlans.filter(({ stripeRole }) => stripeRole !== StripeRole.Free) : billingPlans;

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      marginTop={10}
      padding={'100px 16px'}
      sx={{ backgroundColor: '#F7F1FF' }}
      id='pricing-description'
    >
      <Grid item container direction='column' justifyContent='center' alignItems='center'>
        <Typography variant={'h4'} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Plans and Pricing
        </Typography>
        <Divider sx={{ borderColor: 'black', borderWidth: '2px', width: '100px', margin: '16px 40%' }} />
        <Typography variant={'subtitle1'} sx={{ textAlign: 'center', color: '#7D7987' }}>
          With the paid version of the tool, you will save hundreds of hours in manually copying data. Wheter your time-saving automation needs are large or
          small, we`re here to help you control your time better.
        </Typography>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center' gap={10} marginTop={20}>
        {filteredBillingPlans.map((billingPlan, index) => (
          <PricingTab key={index} billingPlan={billingPlan} />
        ))}
      </Grid>
    </Grid>
  );
}
