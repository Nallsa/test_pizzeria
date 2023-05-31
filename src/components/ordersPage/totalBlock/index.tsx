import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

import { FC } from 'react'

import ResultsCard from '../../resultsCard'
import { RootState } from 'dataStore/state'
import { colors } from '../../../ThemeStyle'
import formatPrice from 'handlers/priceFormat'
import { IOrder } from 'dto/orders.dto'

interface IProp {
	orders: IOrder[] | null
}

const TotalBlock: FC<IProp> = ({orders}) => {
	/* const { orders } = useSelector((state: RootState) => state.orders) */

	if(!orders) return <></>

  const totalOrders = orders?.length
  const newOrders = orders?.filter(order =>
    order?.status_obj?.description?.includes('Новый')
  )
  const acceptedOrder = orders?.filter(order =>
    order?.status_obj?.description?.includes('Принят') || order?.status_obj?.description?.includes('В работе')
  )


	const price = orders
		?.filter(order=> order?.status_obj?.description !== 'Отменён')
		?.reduce((acc, num: any) => acc + Number(num.total_price), 0)


  return (
    <Grid container spacing={3} sx={{ mb: '25px' }}>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={totalOrders}
          text={'Всего заказов'}
          color={colors.info}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={newOrders?.length}
          text={'Новых заказов'}
          color={colors.warning}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={acceptedOrder?.length}
          text={'Заказов в работе'}
          color={colors.danger}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard total={formatPrice(price)} text={'Сумма'} color={colors.success} />
      </Grid>
    </Grid>
  )
}

export default TotalBlock
