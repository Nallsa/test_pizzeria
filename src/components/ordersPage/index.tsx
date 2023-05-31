import {
  useMemo,
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'dataStore/state'
import { IOrder } from 'dto/orders.dto'

import { useActions } from 'hooks/useActions'
import { useRole } from 'hooks/useRole'

import { getUniqueCityArr } from 'handlers/getUniqueArr'

import moment from 'moment'

import Chip from 'components/chip/index'
import { ColorTypes } from 'components/chip/Styles.elements'

import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import { TransitionProps } from '@mui/material/transitions'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'

import OrderDetails from './ordersTable/OrderDetails/OrderDetails'
import { Wrapper } from './Styles.elements'
import TotalBlock from './totalBlock'

import OrderTable from './ordersTable/Table'
import PizzeriaFilter from './ordersTable/PizzeriaFilter'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface IProps {
  setEditState?: Function
}

const OrdersTable: FC<IProps> = () => {
  const { orders } = useSelector((state: RootState) => state.orders)
	const [selected, setSelected] = useState<IOrder | null>(null)
	const [filterData, setFilterData] = useState({
		pizzeria_id: null,
		payment_status: null,
	})
  const { getAllOrderStatus } = useActions()
	const { parentId, userId } = useRole()

	/* const filterData = [{ type: 'pizzeria_id', value: 10 }, {type:'payment_status', value: 'Не оплачено'}] */

  /* const [uniqCity, setUniqCity] = useState<any>(getUniqueCityArr(orders)) */

  useEffect(() => {
    getAllOrderStatus()
  }, [])

  /* useEffect(() => {
    if (orders.length > 0) {
      setUniqCity(getUniqueCityArr(orders))
    }
  }, [orders]) */

  const handleClose = (): void => {
    setSelected(null)
  }

  const handleOpen = (order: IOrder): void => {
    setSelected(order)
  }

  const getFilteredOrders = () => {
    const filtered = orders.filter(el => {
      if (el.pizzeria && el?.pizzeria?.adminsIds!.length > 0 && userId) {
        if (parentId && (el?.pizzeria?.adminsIds!.includes(userId) || el?.pizzeria?.ownerId === parentId)) return true
      }
    })

    if (filtered.length <= 1) return orders
    return filtered
	}

	const pizzeriaUserFilter = (): IOrder[] | null => {
		if (userId) {
			if (!parentId) return [...orders]
			return [...orders]?.filter(order=> order?.pizzeria?.ownerId === userId || order?.pizzeria?.adminsIds!.includes(userId))
		}
		return null
	}

	const ordersFilter = (): IOrder[] | null => {
		if (!pizzeriaUserFilter()) return null
		if (filterData?.pizzeria_id) {
			return pizzeriaUserFilter()?.filter((order: IOrder) => {
				return order.pizzeria_id === filterData?.pizzeria_id
			})?? null
		} else {
			return pizzeriaUserFilter()
		}
	}

  return (
    <div>
			<TotalBlock orders={ordersFilter()} />
			<PizzeriaFilter setState={setFilterData} />
			<OrderTable orders={ordersFilter()} setState={setSelected} />

			<Dialog
				disableEscapeKeyDown
				open={Boolean(selected)}
				onClose={handleClose}
				fullScreen
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
							Данные заказа
						</Typography>
						<Button autoFocus color='inherit' onClick={handleClose}>
							Сохранить
						</Button>
					</Toolbar>
				</AppBar>
				<OrderDetails state={selected} />
			</Dialog>
    </div>
  )
}

export default OrdersTable
