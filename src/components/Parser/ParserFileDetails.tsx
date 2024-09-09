import { lazy, useContext, useState } from 'react';
import { StripeRole, StripeRoleNumeric } from '@/shared/Billing';
import { type Form } from '@/models/form';
import { type QueryDocumentSnapshot } from 'firelordjs';
import { UserContext } from '@/App';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const NoTablesSvg = lazy(() => import('@/images/noTables.svg?react'));
const PagePreview = lazy(() => import('./PagePreview'));
const ParserFileEditableTable = lazy(() => import('./ParserFileEditableTable'));
const ParserFileName = lazy(() => import('./ParserFileName'));
const ParserFileTable = lazy(() => import('./ParserFileTable'));
const TableSkeleton = lazy(() => import('./TableSkeleton'));

interface Props {
  formDoc: QueryDocumentSnapshot<Form>;
  imgSrc: string | undefined;
  previewImgSrc: string;
}

export default function ParserFileDetails({ formDoc, imgSrc, previewImgSrc }: Props) {
  const tables = formDoc.data().extracted?.tables;
  const name = formDoc.data().name;
  const { userDoc } = useContext(UserContext);
  const userData = userDoc?.data();
  const stripeRole = userData?.stripeRole ?? StripeRole.Free;
  const [editMode, setEditMode] = useState<boolean>(false);
  const tablesView = tables ? (
    tables.length ? (
      <Stack spacing={2}>
        {tables.map((table, i) => (
          <Box key={i}>
            {StripeRoleNumeric[stripeRole] >= StripeRoleNumeric[StripeRole.Pro] && (
              <FormControl>
                <FormControlLabel control={<Switch checked={editMode} onChange={() => setEditMode((cur) => !cur)} />} label={`Edit mode`} />
              </FormControl>
            )}
            {editMode ? (
              <ParserFileEditableTable key={i} tableIndex={i} extractedTable={table} />
            ) : (
              <ParserFileTable key={i} tableIndex={i} extractedTable={table} />
            )}
            {i < tables.length - 1 && <Divider />}
          </Box>
        ))}
      </Stack>
    ) : (
      <Stack height='100%' direction='column' justifyContent='center' alignItems='center' spacing={8}>
        <NoTablesSvg width={250} height={250} />
        <Typography variant='h4'>{"We couldn't find any tables :("}</Typography>
      </Stack>
    )
  ) : (
    <TableSkeleton />
  );

  return (
    <Grid container justifyContent='center' marginTop={4} spacing={3}>
      <Grid item xs={10}>
        <ParserFileName name={name} processing={!tables} />
      </Grid>
      <Grid item xs={3}>
        <PagePreview imgSrc={imgSrc} previewImgSrc={previewImgSrc} formId={formDoc.id} />
      </Grid>
      <Grid item xs={7}>
        {tablesView}
      </Grid>
    </Grid>
  );
}
