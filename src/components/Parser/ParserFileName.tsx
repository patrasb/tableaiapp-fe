import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  name: string | null | undefined;
  processing: boolean;
}
export default function ParserFileName({ name, processing }: Props) {
  return (
    <Stack direction='row' spacing={2}>
      {processing && <CircularProgress />}
      <Typography
        variant='h4'
        sx={{
          fontWeight: 'bold',
          width: '100%',
        }}
      >
        {name ?? <Skeleton sx={{ width: 400 }} />}
      </Typography>
    </Stack>
  );
}
