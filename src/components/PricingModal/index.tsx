import { DialogContent, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import PricingDescription from '@/pages/Landing/PricingDescription';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function PricingModal({ open, setOpen }: Props) {
  return (
    <Dialog open={open} maxWidth={'lg'}>
      <Box width={'100%'}>
        <DialogTitle>
          <Stack direction='row' justifyContent='space-between' alignItems='flex-end'>
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <PricingDescription noFreeOption={true} />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
