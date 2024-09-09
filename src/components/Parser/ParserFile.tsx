import { type Form } from '@/models/form';
import { type QuerySnapshot } from 'firelordjs';
import { useLocation } from 'react-router';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { lazy } from 'react';

const ParserFileDetails = lazy(() => import('./ParserFileDetails'));
const FormNotFoundSvg = lazy(() => import('@/images/formNotFound.svg?react'));

interface Props {
  formQuerySnapshot: QuerySnapshot<Form> | null;
}

export default function ParserFile({ formQuerySnapshot }: Props) {
  const location = useLocation();
  const state = location.state as LocationState;

  const formDoc = formQuerySnapshot?.docs.find(({ id }) => id === state?.parser?.formId);

  if (formDoc && state?.parser?.previewImgSrc)
    return <ParserFileDetails formDoc={formDoc} imgSrc={state?.parser?.imgSrc} previewImgSrc={state?.parser?.previewImgSrc} />;
  else
    return (
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
        {formQuerySnapshot ? (
          <>
            <FormNotFoundSvg width={300} height={300} />
            <Typography variant='h4'>Nothing to show here...</Typography>
            <Typography variant='h6'>Please select or upload a form</Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </Stack>
    );
}
