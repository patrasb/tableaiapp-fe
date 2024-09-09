import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ProductImage1 from '@/images/productImage1.svg?react';
import ProductImage2 from '@/images/productImage2.svg?react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function ProductDescription() {
  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid container xs={11} justifyContent='center' alignItems='center' rowGap={10}>
        <Grid container direction='row' justifyContent='center' alignItems='center' columnGap={10}>
          <Grid xs={12} sm={4} lg={4}>
            <ProductImage1 style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <Stack direction='column' spacing={3}>
              <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
                Extract data with our cutting edge AI solution
              </Typography>
              <Divider sx={{ borderWidth: 2, maxWidth: 100, borderColor: 'black' }} />
              <Typography variant={'subtitle1'} color={'#7D7987'}>
                We are using the latest - and always looking for the newest - AI software solutions to provide you the best OCR(Optical character recognition)
                solution we can!
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container direction='row-reverse' justifyContent='center' alignItems='center' columnGap={10}>
          <Grid xs={12} sm={4} lg={4}>
            <ProductImage2 style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <Stack direction='column' spacing={3}>
              <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
                The best place to keep and edit your files
              </Typography>
              <Divider sx={{ borderWidth: 2, maxWidth: 100, borderColor: 'black' }} />
              <Typography variant={'subtitle1'} color={'#7D7987'}>
                Our dedicated team works to create the best place yo keep and edit your scanned files. We offer solution so you can extract the cleanest data
                possible.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
