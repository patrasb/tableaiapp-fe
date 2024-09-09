import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import Box from '@mui/material/Box';
import { type DropzoneRootProps } from 'react-dropzone';
import { LinearProgress } from '@mui/material';

interface Props {
  dropzoneRootProps: DropzoneRootProps;
  progress: number | null;
}
export default function CardUpload({ dropzoneRootProps, progress }: Props) {
  return (
    <Box {...dropzoneRootProps}>
      <Card sx={{ width: 250, height: 180, border: '3px dashed darkgrey', borderRadius: 4, backgroundColor: 'grey.50' }}>
        <CardActionArea sx={{ height: '100%' }}>
          <Stack direction='column' justifyContent='center' textAlign='center' alignItems='center' height='100%' spacing={1}>
            {progress === null ? (
              <>
                <Typography width={180}>Add new document</Typography>
                <UploadRoundedIcon style={{ fontSize: 75, color: 'darkgrey', textAlign: 'center' }} />
                <Typography width={180}>Click or drop a file here</Typography>
              </>
            ) : (
              <>
                <Typography width={180}>Uploading...</Typography>
                <LinearProgress variant='determinate' value={progress} sx={{ width: 100 }} />
              </>
            )}
          </Stack>
        </CardActionArea>
      </Card>
    </Box>
  );
}
