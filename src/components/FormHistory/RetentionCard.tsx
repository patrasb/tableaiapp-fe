import Stack from '@mui/material/Stack';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import Typography from '@mui/material/Typography';

export default function RetentionCard() {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      height={180}
      minWidth={230}
      width={250}
      border='1px solid'
      borderColor='grey.400'
      color='grey.400'
      borderRadius={4}
      paddingX={4}
      textAlign='center'
    >
      <AutoDeleteRoundedIcon sx={{ fontSize: 50 }} />
      <Typography>Recents are deleted after 24 hours</Typography>
    </Stack>
  );
}
