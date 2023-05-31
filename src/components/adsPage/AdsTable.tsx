import { FC, useState } from 'react'
import moment from 'moment'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import Block from './../block/index';

import { IAds } from 'dto/ads.dto';

interface IProps {
	ads: IAds[]
}

const AdsTable: FC<IProps> = ({ ads = [] }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ads?.length) : 0;


	return (
		<Block>
			<TableContainer>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Объявление</TableCell>
							<TableCell align="right">Старт показа</TableCell>
							<TableCell align="right">Окончание показа</TableCell>
							<TableCell align="right">Активность</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ads?.map((row) => (
							<TableRow
								key={row?.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row?.title}
								</TableCell>
								<TableCell align="right">{moment(row?.start_at).format('LLLL')}</TableCell>
								<TableCell align="right">{moment(row?.end_at).format('LLLL')}</TableCell>
								<TableCell align="right">{row?.is_active}</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={ads?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Block>
	)
}

export default AdsTable