import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Suspense, lazy } from 'react';
import Skeleton from '@mui/material/Skeleton';

const IntroSvg = lazy(() => import('@/images/illustrationIntro.svg?react'));
const BgElementSvg = lazy(() => import('@/images/bg_element.svg?react'));
const ParserSelector = lazy(() => import('@/components/ParserSelector'));

export default function IntroSection() {
  return (
    <Grid container justifyContent='center' alignItems='center' overflow='hidden' paddingTop={10} sx={{ backgroundColor: '#EAE0F5' }}>
      <Grid item lg={6} xs={11} position='relative'>
        <Suspense fallback={null}>
          <BgElementSvg style={{ position: 'absolute', top: '-200px', width: '1000px', height: '800px', left: '-300px', zIndex: 1 }} />
        </Suspense>

        <Box position='relative' zIndex={2} marginBottom={5} maxWidth={550}>
          <Typography variant='body1' marginBottom={2}>
            We automate your document handling
          </Typography>
          <Typography variant='h2' fontWeight='bold' lineHeight={{ xs: '1em', md: '.8em' }}>
            FAST AND SIMPLE
          </Typography>
          <Typography variant='h2' fontWeight='bold' color='primary.main'>
            IMAGE TO EXCEL
          </Typography>
          <Typography variant='h6' marginTop={5}>
            With the help of AI we identify the data inside your image or PDF and turn it into a usable spreadsheet.
          </Typography>
          <Suspense fallback={<Skeleton width={500} height={60} />}>
            <ParserSelector />
          </Suspense>
        </Box>
      </Grid>
      <Grid item xs={5} textAlign='center' display={{ xs: 'none', lg: 'block' }}>
        <Suspense fallback={null}>
          <IntroSvg style={{ maxWidth: '700px', height: 'inherit' }} />
        </Suspense>
      </Grid>
    </Grid>
  );
}
