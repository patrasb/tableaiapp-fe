import Box from '@mui/material/Box';
import { type DropzoneRootProps } from 'react-dropzone';
import UploadSvg from '@/images/upload.svg?react';
import Fab from '@mui/material/Fab';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import CreditBadge from '../CreditBadge';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';

interface Props {
  dropzoneRootProps: DropzoneRootProps;
  progress: number | null;
}

export default function SoloUpload({ dropzoneRootProps, progress }: Props) {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={8} justifyContent='center' alignContent='center'>
        <CreditBadge sx={{ width: '100%' }}>
          <CardActionArea component='a'>
            <Box {...dropzoneRootProps} width='100%'>
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing={2}
                sx={{
                  width: '100%',
                  padding: '48px',
                  border: '2px dashed #9747FF',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 500,
                }}
              >
                {progress === null && (
                  <Typography variant='h5' gutterBottom>
                    UPLOAD YOUR FILE OR DRAG IT HERE <br></br> JPG | PNG | PDF
                  </Typography>
                )}
                <UploadSvg style={{ maxHeight: '200px', width: '70%' }} />
                {progress === null ? (
                  <>
                    <Fab variant='extended' color='primary' size='large'>
                      <FilePresentRoundedIcon sx={{ mr: 1 }} />
                      Select file
                    </Fab>
                  </>
                ) : (
                  <>
                    <Typography variant='h5'>Uploading...</Typography>
                    <LinearProgress variant='determinate' value={progress} sx={{ width: '70%' }} />
                  </>
                )}
              </Stack>
            </Box>
          </CardActionArea>
        </CreditBadge>
      </Grid>
    </Grid>
  );
}
