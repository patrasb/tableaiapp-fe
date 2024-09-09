import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import UploadSection from './UploadSection';

export default function ParserSelector() {
  return (
    <Stack direction='row' spacing={4} marginTop={3}>
      <Button variant='outlined' startIcon={<ReceiptRoundedIcon />}>
        Parse Invoice - coming soon
      </Button>
      <UploadSection variant='button' />
    </Stack>
  );
}
