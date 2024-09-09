// generate an array of arrays to be added to xlsx utils in order to be exported. https://docs.sheetjs.com/docs/api/utilities/array

import type ExtractedTable from '@/shared/ExtractedTable';
import { type ExtractedTableRow, type ExtractedTableRowCell } from '@/shared/ExtractedTable';

export default function generateArrayOfData(extractedTable: ExtractedTable) {
  const { rows } = extractedTable;
  const headingsFromExtractedTable = rows[0]!.cells.map((rowCell: ExtractedTableRowCell) => rowCell.text);
  const rowsFromExtractedTable = rows.slice(1).map((rowCell: ExtractedTableRow) => rowCell.cells.map((cell: ExtractedTableRowCell) => cell.text));

  return [[...headingsFromExtractedTable], ...rowsFromExtractedTable];
}
