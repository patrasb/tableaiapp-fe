/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type ExtractedTable from '@/shared/ExtractedTable';
import { Button, ButtonGroup, Collapse, Grid, Link, Stack, Tooltip, Typography } from '@mui/material';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import GoogleIcon from '@mui/icons-material/Google';

import { useContext, useState } from 'react';
import { utils, writeFile } from 'xlsx';
import generateArrayOfData from './helpers/generateArrayOfData';
import generateGoogleSheetsURL from './helpers/generateGoogleSheetsURL';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import { UserContext } from '@/App';
import { StripeRole } from '@/shared/Billing';

interface Props {
  extractedTable: ExtractedTable;
  tableIndex: number;
}

export default function ParserFileTable({ extractedTable, tableIndex }: Props) {
  const { rows } = extractedTable;
  const { currentUser, userDoc } = useContext(UserContext);
  const userData = userDoc?.data();
  const stripeRole = userData?.stripeRole ?? StripeRole.Free;
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState<boolean>(rows.length > 10);
  const [googleSheetsLoading, setGoogleSheetsLoading] = useState<boolean>(false);
  const [googleSheetLink, setGoogleSheetLink] = useState<string | null>(null);

  function exportExcelFile(isCsvExport: boolean) {
    if (currentUser?.isAnonymous) {
      navigate(ROUTES.signIn);
      return;
    }
    const arrayOfData = generateArrayOfData(extractedTable);
    // create new work sheet
    const ws = utils.aoa_to_sheet(arrayOfData);
    // create new work book
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, 'Data');

    writeFile(wb, isCsvExport ? `table_${tableIndex + 1}.csv` : `table_${tableIndex + 1}.xlsx`);
  }

  async function exportToGoogleSheets() {
    if (currentUser?.isAnonymous) {
      navigate(ROUTES.signIn);
      return;
    }
    setGoogleSheetsLoading(true);
    try {
      const arrayOfData = generateArrayOfData(extractedTable);
      // @ts-ignore
      const sheetUrl = await generateGoogleSheetsURL(arrayOfData);
      setGoogleSheetsLoading(false);
      if (sheetUrl) {
        setGoogleSheetLink(sheetUrl);
      }
    } catch (error) {
      setGoogleSheetsLoading(false);
    }
  }

  return (
    <Stack direction='column' spacing={1}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5'>Table #{tableIndex + 1}</Typography>
        <ButtonGroup variant='contained' size='small' aria-label='Export table buttons'>
          <Button startIcon={<PostAddRoundedIcon />} onClick={() => exportExcelFile(true)}>
            CSV
          </Button>
          <Tooltip title={stripeRole === StripeRole.Free ? 'Excel export available for paid plans' : 'Download Excel file'}>
            <span>
              <Button disabled={stripeRole === StripeRole.Free} startIcon={<BorderAllRoundedIcon />} onClick={() => exportExcelFile(false)}>
                EXCEL
              </Button>
            </span>
          </Tooltip>
          <Tooltip title={stripeRole === StripeRole.Free ? 'Google sheets export available for paid plans' : 'Get Google Sheets file'}>
            <span>
              <LoadingButton
                disabled={stripeRole === StripeRole.Free}
                startIcon={<GoogleIcon />}
                onClick={exportToGoogleSheets}
                variant='contained'
                loading={googleSheetsLoading}
              >
                Google Sheets
              </LoadingButton>
            </span>
          </Tooltip>
        </ButtonGroup>
      </Stack>
      {googleSheetLink && (
        <Link href={googleSheetLink} target='_blank' rel='noopener'>
          Click here to view the Google sheet
        </Link>
      )}
      <Collapse
        in={!collapsed}
        collapsedSize={200}
        sx={
          collapsed
            ? {
                WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              }
            : {}
        }
      >
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead style={{ backgroundColor: '#e5d1ff' }}>
              <TableRow>
                {rows[0]!.cells.map(({ colSpan, text }, i) => {
                  return (
                    <TableCell colSpan={colSpan} key={i}>
                      {text}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: '#eee6f7' }}>
              {rows.slice(1).map(({ cells }, i) => {
                return (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {cells.map(({ colSpan, text }, i) => {
                      return (
                        <TableCell colSpan={colSpan} key={i}>
                          {text}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
      <Grid container justifyContent='flex-end'>
        <Button variant='text' endIcon={collapsed ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon />} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </Button>
      </Grid>
    </Stack>
  );
}
