import { type Form } from '@/models/form';
import { type QuerySnapshot } from 'firelordjs';
import Stack from '@mui/material/Stack';
import FormCard from './FormCard';
import RetentionCard from './RetentionCard';
import SkeletonCard from './SkeletonCard';

interface Props {
  formQuerySnapshot: QuerySnapshot<Form> | null;
}

export default function Explorer({ formQuerySnapshot }: Props) {
  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        width='100%'
        height='100%'
        paddingX={3}
        paddingBottom={1}
        sx={{
          overflowX: 'auto',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 1) 20px, rgba(0, 0, 0, 1) calc(100% - 40px), transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 1) 20px, rgba(0, 0, 0, 1) calc(100% - 40px), transparent 100%)',
        }}
      >
        {formQuerySnapshot?.docs.map((doc, i) => <FormCard key={i} formDoc={doc} />) ??
          Array(2)
            .fill(null)
            .map((e, i) => <SkeletonCard key={i} />)}
        <RetentionCard />
      </Stack>
    </>
  );
}
