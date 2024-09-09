import Skeleton from '@mui/material/Skeleton';

export default function SkeletonCard() {
  return <Skeleton variant='rectangular' width={230} height={180} sx={{ minWidth: 230, borderRadius: 4 }} />;
}
