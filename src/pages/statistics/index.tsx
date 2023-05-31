import OrdersTable from 'components/ordersPage'
import { IUser } from 'dto/users.dto'
import { useActions } from 'hooks/useActions'
import { FC, useEffect, useState } from 'react'

const Statistics: FC = () => {
  const { getAllOrders } = useActions()

  useEffect(() => {
		getAllOrders()
	}, [])

	useEffect(() => {
    const timer = setTimeout(() => {
      getAllOrders()
    }, 120000)
    return () => {
      clearTimeout(timer)
    }
  })

  return (
    <div>
      <OrdersTable />
    </div>
  )
}

export default Statistics
