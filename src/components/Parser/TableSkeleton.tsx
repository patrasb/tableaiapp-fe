import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LinearProgress, Typography } from '@mui/material';

export default function TableSkeleton() {
  return (
    <>
      <Typography variant='h5' fontStyle='italic' sx={{ marginBottom: '16px' }}>
        We are processing your image, this might take a few seconds...
      </Typography>
      <TableContainer component={Paper}>
        <LinearProgress />
        <Table sx={{ width: '100%' }} aria-label='simple table'>
          <TableHead style={{ backgroundColor: '#e5d1ff' }}>
            <TableRow>
              {Array(4)
                .fill(null)
                .map((e, i) => (
                  <TableCell key={i}>
                    <Skeleton height={50} />
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#eee6f7' }}>
            {Array(2)
              .fill(null)
              .map((e, i) => (
                <TableRow key={i}>
                  {Array(4)
                    .fill(null)
                    .map((e, i) => (
                      <TableCell key={i}>
                        <Skeleton height={30} />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
