/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type ExtractedTable from '@/shared/interfaces/ExtractedTable';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {
  type GridRowsProp,
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  type GridEventListener,
  type GridRowId,
  type GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { type ExtractedTableRow } from '@/shared/interfaces/ExtractedTable';
import { useContext, useState } from 'react';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingButton from '@mui/lab/LoadingButton';
import { utils, writeFile } from 'xlsx';
import generateGoogleSheetsURL from './helpers/generateGoogleSheetsURL';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import { UserContext } from '@/App';

interface Props {
  extractedTable: ExtractedTable;
  tableIndex: number;
}

function getRowsForDataGrid(rows: ExtractedTableRow[]) {
  if (!rows) return [];
  const keys = rows[0]?.cells.map((rowCell) => rowCell.text);

  const rowsToAdd = rows.slice(1);

  const rowsForDataGrid = [];
  for (const row of rowsToAdd) {
    const rowObj = { id: Math.floor(Math.random() * 9999999999) };
    let indexCol = 1;
    const values = row?.cells?.map((rowCell) => rowCell.text);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (!rowObj[keys[i]]) {
        rowObj[keys[i]] = value;
      } else {
        const newKey = `${keys[i]} (${indexCol})`;
        rowObj[newKey] = value;
        indexCol++;
      }
    }
    rowsForDataGrid.push(rowObj);
  }
  return rowsForDataGrid;
}

function getColumnsForDataGrid(rows: ExtractedTableRow[], lastColumn: any) {
  if (!rows) return [];
  const keys = rows[0]?.cells?.map((rowCell) => rowCell.text);

  const columns = [];
  let index = 1;
  for (const key of keys) {
    let keyName = key;
    if (columns.find((column) => column.field === key)) {
      keyName = `${key} (${index})`;
      index++;
    }
    columns.push({
      field: keyName,
      headerName: keyName,
      type: 'string',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    });
  }

  columns.push(lastColumn);
  return columns;
}

function generateArrayOfData(rows) {
  const arrayOfData = [Object.keys(rows[0])];

  for (const row of rows) {
    arrayOfData.push(Object.values(row));
  }

  return arrayOfData;
}
export default function ParserFileEditableTable({ extractedTable, tableIndex }: Props) {
  const { currentUser } = useContext(UserContext);
  const [rows, setRows] = useState(getRowsForDataGrid(extractedTable.rows));
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [googleSheetsLoading, setGoogleSheetsLoading] = useState<boolean>(false);
  const [googleSheetLink, setGoogleSheetLink] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const lastColumn = {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label='Save'
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
            key={id}
          />,
          <GridActionsCellItem icon={<CancelIcon />} label='Cancel' className='textPrimary' onClick={handleCancelClick(id)} color='inherit' key={id} />,
        ];
      }

      return [
        <GridActionsCellItem icon={<EditIcon />} label='Edit' className='textPrimary' onClick={handleEditClick(id)} color='inherit' key={'edit'} />,
        <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' key={'delete'} />,
      ];
    },
  };
  const columns = getColumnsForDataGrid(extractedTable.rows, lastColumn);

  function exportExcelFile(isCsvExport: boolean) {
    if (currentUser.isAnonymous) {
      navigate(ROUTES.signIn);
      return;
    }
    const arrayOfData = generateArrayOfData(rows);
    // create new work sheet
    const ws = utils.aoa_to_sheet(arrayOfData);
    // create new work book
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, 'Data');

    writeFile(wb, isCsvExport ? `table_${tableIndex + 1}.csv` : `table_${tableIndex + 1}.xlsx`);
  }

  async function exportToGoogleSheets() {
    if (currentUser.isAnonymous) {
      navigate(ROUTES.signIn);
      return;
    }
    setGoogleSheetsLoading(true);
    try {
      const arrayOfData = generateArrayOfData(extractedTable);
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
          <Button startIcon={<BorderAllRoundedIcon />} onClick={() => exportExcelFile(false)}>
            EXCEL
          </Button>
          <Button startIcon={<PostAddRoundedIcon />} onClick={() => exportExcelFile(true)}>
            CSV
          </Button>
          <LoadingButton startIcon={<GoogleIcon />} onClick={exportToGoogleSheets} variant='contained' loading={googleSheetsLoading}>
            Google Sheets
          </LoadingButton>
        </ButtonGroup>
      </Stack>
      {googleSheetLink && (
        <Link href={googleSheetLink} target='_blank' rel='noopener'>
          Click here to view the Google sheet
        </Link>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{ background: '#eee6f7' }}
      />
    </Stack>
  );
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 'ewqewq';
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer sx={{ background: '#e5d1ff' }}>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
