import UpgradeSvg from '@/images/upgrade.svg?react';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import PricingModal from '../PricingModal';

export default function UpgradeCard() {
  const [pricingModalOpen, setPricingModalOpen] = useState<boolean>(false);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: 250,
          borderRadius: 4,
          minWidth: 230,
          height: 180,
          overflow: 'hidden',
        }}
      >
        <CardActionArea onClick={() => setPricingModalOpen(true)}>
          <UpgradeSvg width='100%' height='100%' />
        </CardActionArea>
      </Paper>
      <PricingModal open={pricingModalOpen} setOpen={setPricingModalOpen} />
    </>
  );
}
