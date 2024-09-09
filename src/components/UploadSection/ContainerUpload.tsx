import { Box, Fade, Stack, Typography } from '@mui/material';
import { type PropsWithChildren } from 'react';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import { type DropzoneRootProps } from 'react-dropzone';

interface Props extends PropsWithChildren {
  dropzoneRootProps: DropzoneRootProps;
  isDragActive: boolean;
}

export default function ContainerUpload({ dropzoneRootProps, isDragActive, children }: Props) {
  dropzoneRootProps.onClick = (e) => e.stopPropagation();
  return (
    <Box position='relative' {...dropzoneRootProps}>
      <Fade in={isDragActive} unmountOnExit>
        <Box width='100%' height='100%' zIndex={1} position='absolute' paddingY={10} paddingX={15}>
          <Stack
            width='100%'
            height='100%'
            border='5px dashed'
            color='grey.700'
            borderColor='grey.700'
            direction='column'
            justifyContent='center'
            borderRadius={4}
            alignItems='center'
            spacing={6}
          >
            <FileOpenRoundedIcon sx={{ fontSize: 80 }} />
            <Typography fontWeight='bold' variant='h3'>
              Drop your file here
            </Typography>
          </Stack>
        </Box>
      </Fade>
      <Box
        sx={{
          opacity: isDragActive ? 0.15 : 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
