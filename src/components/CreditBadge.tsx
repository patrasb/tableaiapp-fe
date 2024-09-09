import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { type SxProps } from '@mui/material';
import { useContext, type PropsWithChildren } from 'react';
import { UserContext } from '@/App';
import { StripeRole } from '@/shared/Billing';

interface CreditBadgeProps extends PropsWithChildren {
  sx?: SxProps;
}

export default function CreditBadge({ children, sx }: CreditBadgeProps) {
  const { localAvailableCredits, userDoc } = useContext(UserContext);
  const limitReached = localAvailableCredits === 0;

  const isFreeUser = (userDoc?.data()?.stripeRole ?? StripeRole.Free) === StripeRole.Free;

  const [contentText, tooltipText] = isFreeUser
    ? limitReached
      ? ['Free limit reached', 'To continue uploading subscribe to a plan or wait 24 hours']
      : [(localAvailableCredits ?? '..') + ' free credits remaining', 'Subscribe to a plan to increase your limit']
    : limitReached
    ? ['No credits left', 'To continue uploading this billing period subscribe to a higher plan']
    : [(localAvailableCredits ?? '..') + ' credits remaining', 'Resets after billing period'];

  return (
    <Badge
      color={limitReached ? 'error' : 'primary'}
      badgeContent={
        <Tooltip title={tooltipText}>
          <Typography>{contentText}</Typography>
        </Tooltip>
      }
      sx={{ '& .MuiBadge-badge': { fontSize: 20, height: 22, transform: 'translate(0px, -9px)', cursor: 'default' }, ...sx }}
    >
      {children}
    </Badge>
  );
}
