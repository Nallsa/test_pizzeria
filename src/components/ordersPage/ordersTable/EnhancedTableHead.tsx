import { FC } from 'react'

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { IOrder } from 'dto/orders.dto';

/* export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
} */

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof IOrder;
  label: string;
	numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IOrder) => void;
  order: Order;
  orderBy: string;
	rowCount: number;
	headCells: HeadCell[]
}

const EnhancedTableHead: FC<EnhancedTableProps> = (props) => {

	const { order, orderBy, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler =
    (property: keyof IOrder) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
		};

	return (
		<TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
	)
}

export default EnhancedTableHead