import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import { type DropzoneRootProps } from 'react-dropzone';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';

interface Props {
  dropzoneRootProps: DropzoneRootProps;
  progress: number | null;
}
export default function ButtonUpload({ dropzoneRootProps, progress }: Props) {
  return (
    <LoadingButton loading={progress !== null} variant='contained' startIcon={<BackupTableRoundedIcon />}>
      <Box {...dropzoneRootProps}>Extract Table</Box>
    </LoadingButton>
  );
}
