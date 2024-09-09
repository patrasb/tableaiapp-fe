import { lazy, useContext, useEffect, useState } from 'react';
import { onSnapshot, query, where, type QuerySnapshot } from 'firelordjs';
import { form, type Form } from '@/models/form';
import { user } from '@/models/user';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { orderBy } from 'firelordjs';
import { UserContext } from '@/App';

const FormHistory = lazy(() => import('@/components/FormHistory'));
const UploadSection = lazy(() => import('@/components/UploadSection'));
const ParserFile = lazy(() => import('./ParserFile'));

interface Props {
  variant: 'uploadOnly' | 'full';
}

export default function Parser({ variant }: Props) {
  const { currentUser } = useContext(UserContext);
  const [formQuerySnapshot, setFormQuerySnapshot] = useState<QuerySnapshot<Form> | null>(null);

  useEffect(() => {
    if (currentUser) {
      // Listen to the forms collection for changes. Only listen when the user is authenticated, therefore the hook dependency
      return onSnapshot(
        query(form.collection(), where('userDocRef', '==', user.doc(currentUser.uid)), where('deleted', '==', false), orderBy('createdAt', 'desc')),
        setFormQuerySnapshot,
      );
    } else setFormQuerySnapshot(null);
  }, [currentUser]);

  return (
    <UploadSection variant='container'>
      {variant === 'uploadOnly' && <UploadSection variant='solo' />}
      {variant === 'full' && (
        <Stack direction='column' spacing={4}>
          <FormHistory formQuerySnapshot={formQuerySnapshot} />
          <Divider />
          <ParserFile formQuerySnapshot={formQuerySnapshot} />
        </Stack>
      )}
    </UploadSection>
  );
}
