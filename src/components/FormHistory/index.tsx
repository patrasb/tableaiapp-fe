import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Explorer from './Explorer';
import { type Form } from '@/models/form';
import { type QuerySnapshot } from 'firelordjs';
import UploadCard from './UploadCard';
import Typography from '@mui/material/Typography';
import UpgradeCard from './UpgradeCard';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { UserContext } from '@/App';
import { StripeRole } from '@/shared/Billing';

interface Props {
  formQuerySnapshot: QuerySnapshot<Form> | null;
}

export default function FormHistory({ formQuerySnapshot }: Props) {
  const { userDoc } = useContext(UserContext);

  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item xs={10}>
          <Typography variant='h6' fontWeight='bold' marginY={2}>
            Recents:
          </Typography>
          <Stack direction='row'>
            <Stack direction='row' spacing={2}>
              <UploadCard />
              {userDoc?.data()?.stripeRole === StripeRole.Free && <UpgradeCard />}
              <Box paddingLeft={1}>
                <Divider orientation='vertical' />
              </Box>
            </Stack>
            <Explorer formQuerySnapshot={formQuerySnapshot} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
