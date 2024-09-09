import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';
import DotsImageSvg from '@/images/dots.svg?react';

export default function UsageDescription() {
  return (
    <Grid container justifyContent='center' position='relative' alignItems='center' id='use-description'>
      <DotsImageSvg height={150} width={150} style={{ position: 'absolute', top: '50px', right: 0, zIndex: 1 }} />
      <DotsImageSvg height={150} width={150} style={{ position: 'absolute', bottom: '100px', left: 0, zIndex: 1 }} />

      <Grid
        item
        container
        xs={11}
        direction='column'
        justifyContent='center'
        alignItems='center'
        borderRadius={12}
        sx={{
          background: 'linear-gradient(to right bottom, #BB6BD9, #9747FF)',
          paddingTop: 5,
          position: 'relative',
        }}
      >
        <Grid item xs={12}>
          <Typography variant={'h4'} sx={{ fontWeight: 'bold', color: 'white' }}>
            How to use
          </Typography>
          <Divider sx={{ borderColor: 'white', borderWidth: '2px', margin: '16px 20%' }} />
        </Grid>
        <Grid item xs={12} container justifyContent='center' alignItems='center' gap={10} paddingBottom='5%' paddingTop={3}>
          <UsageStep number='1' title='Add file' description='Add file of the following type: JPG, PNG, PDF' />
          <UsageStep
            number='2'
            title='Extract'
            description='
              Choose an option to download and export your data'
          />
          <UsageStep
            number='3'
            title='Edit'
            description='
              Choose an option to download and export your data'
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

interface UsageStepProp {
  number: string;
  title: string;
  description: string;
}
function UsageStep({ number, title, description }: UsageStepProp) {
  return (
    <Grid
      container
      direction={'column'}
      justifyContent='center'
      alignItems='flex-start'
      zIndex={3}
      sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', height: '300px', maxWidth: '300px' }}
    >
      <Typography variant={'h2'} color={'#9747FF'} fontWeight={'bold'}>
        {number}
      </Typography>
      <Typography variant={'subtitle1'} sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant={'subtitle2'} sx={{ maxWidth: '200px', color: '#7D7987' }}>
        {description}
      </Typography>
    </Grid>
  );
}
