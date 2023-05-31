import { MouseEvent, ChangeEvent, FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { settings } from 'ThemeStyle'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { colors } from 'ThemeStyle'

import moment from 'moment';

import Chip from '../../chip';

import { ColorTypes } from 'components/chip/Styles.elements';
import { RootState } from 'dataStore/state';
import { IOrder, IOrderStatus } from 'dto/orders.dto';

import {Wrapper} from './Styles.elements'
import EnhancedTableHead, { HeadCell, Order } from './EnhancedTableHead';
import { useRole } from 'hooks/useRole';

interface IOrderTable {
	setState: Function
	orders: IOrder[] | null
}

export enum ColorTypesRow {
  'Не оплачено' = 'opacity_orange',
  'Отменено' = 'opacity_red',
  'Отклонен' = 'opacity_red',
  'Оплачено' = 'opacity_green',
  'Оплачен' = 'opacity_green',
  'Перевод' = 'opacity_yellow',
  'Наличные' = 'opacity_light_blue',
  'Оплата картой' = 'opacity_purple',
  'Ожидает подтверждения' = 'opacity_gray',
}

interface IRowColor {
  backgroundColor?: ColorTypesRow
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T, int: boolean) {
	if (int) {
		if (parseInt((b[orderBy] as unknown) as string) < parseInt((a[orderBy] as unknown)as string)) {
			return -1;
		}
		if (parseInt((b[orderBy] as unknown)as string) > parseInt((a[orderBy] as unknown)as string)) {
			return 1;
		}
		return 0;
	} else {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}
}

function getComparator<Key extends keyof IOrder>(a: IOrder, b: IOrder, order: Order, orderBy: Key) {
	if (orderBy === 'total_goods' || orderBy === 'total_price') {
		return order === 'desc'
			? descendingComparator(a, b, orderBy, true)
			: -descendingComparator(a, b, orderBy, true);
	}
	return order === 'desc'
			? descendingComparator(a, b, orderBy, false)
			: -descendingComparator(a, b, orderBy, false);
}


/* function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
	if (a[0] === b[0]) {
		return order === 'desc'
			? (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => descendingComparator(a, b, orderBy)
			: (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => -descendingComparator(a, b, orderBy);
	}
} */

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
/* function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
} */

const OrderTable: FC<IOrderTable> = ({orders, setState}) => {
	/* const { orders } = useSelector((state: RootState) => state.orders) */
	const { parentId, userId } = useRole()
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(20);
	const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof IOrder>('id');

	if(!orders){return <></>}
	const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
	};

	const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IOrder,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders?.length) : 0;

	const headCell: HeadCell[] = [
		{
			id: 'id',
			numeric: false,
			disablePadding: false,
			label: '№',
		},
		{
			id: 'pizzeria_id',
			numeric: false,
			disablePadding: false,
			label: 'Отделение',
		},
		{
			id: 'create_at',
			numeric: false,
			disablePadding: false,
			label: 'Создан',
		},
		{
			id: 'delivery_type',
			numeric: false,
			disablePadding: false,
			label: 'Тип',
		},
		{
			id: 'total_goods',
			numeric: false,
			disablePadding: false,
			label: 'Товаров',
		},
		{
			id: 'total_price',
			numeric: false,
			disablePadding: false,
			label: 'Сумма',
		},
		{
			id: 'payment_type',
			numeric: false,
			disablePadding: false,
			label: 'Тип платежа',
		},
		{
			id: 'payment_status',
			numeric: false,
			disablePadding: false,
			label: 'Статус платежа',
		},
		{
			id: 'status',
			numeric: false,
			disablePadding: false,
			label: 'Статус',
		},
	]

	/* const pizzeriaFilter = (): IOrder[] | null => {
		if (userId) {
			if (!parentId) return [...orders]
			return [...orders]?.filter(order=> order?.pizzeria?.ownerId === userId || order?.pizzeria?.adminsIds!.includes(userId))
		}
		return null
	} */


	return (
		<>
			<Wrapper>
				<TableContainer /* component={Paper} sx={{borderRadius: settings.blockBorderRadius}} */>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={orders.length}
							headCells={headCell}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
								rows.sort(getComparator(order, orderBy)).slice() */}
							{orders?.sort((a, b) => getComparator(a, b, order, orderBy))?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => {
								const statusColor = (status: string): string => {
									if (status in ColorTypesRow) {
										return colors[ColorTypesRow[status as keyof typeof ColorTypesRow]]
									}
									return 'ffffff'
								}
								return (
									<TableRow
										key={row.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: statusColor(row.payment_status) }}
										onClick={() => setState(row)}
									>
										<TableCell component="th" scope="row">
											{row.id}
										</TableCell>
										<TableCell align="right">{row?.pizzeria?.address?.city} {row?.pizzeria?.address?.street}</TableCell>
										<TableCell align="right">{moment(row?.create_at).format('LT')}</TableCell>
										<TableCell align="right"><DeliveryHandle order={row} /></TableCell>
										<TableCell align="right">{row?.total_goods} шт</TableCell>
										<TableCell align="right"><span style={{ fontWeight: 'bold' }}>{row?.total_price} ₽</span></TableCell>
										<TableCell align="right">{row?.payment_type}</TableCell>
										<TableCell align="right">{row?.payment_status}</TableCell>
										<TableCell align="right"><StatusHandler status={row?.status_obj} /></TableCell>
									</TableRow>
								)
							})}
							{emptyRows > 0 && (
									<TableRow
										style={{
											height: 53 * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 20, 30]}
					component="div"
					count={orders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Wrapper>
		</>
	)
}

export default OrderTable

const DeliveryHandle: FC<{order:IOrder}> = ({order}) => {
	if (order?.delivery_type) {
		if (order?.in_time) {
			return <div style={{color: 'red'}}>{moment(order?.in_time).format('L')} - {moment(order?.in_time).format('LT')}</div>
		} else {
			return <>Доставка</>
		}
	} else {
		return <>Самовывоз</>
	}
}

const StatusHandler:  FC<{status:IOrderStatus | undefined}> = ({status}) => {
	if (!status) {
		return (
			<Chip
				color={
					ColorTypes['gray']
				}
			>
				Не задан
			</Chip>
		)
	} else {
		return (
			<Chip
				color={
					ColorTypes[
						status?.color as keyof typeof ColorTypes
					]
				}
			>
				{status?.description}
			</Chip>
		)
	}
}