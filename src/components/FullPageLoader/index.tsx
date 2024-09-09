import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function FullPageLoader() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <CircularProgress />
    </Box>
  );
}
