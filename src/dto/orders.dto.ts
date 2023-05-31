import { IProduct } from './products.dto'
import { IUser } from './users.dto'
import { IAddress, IPizzeria } from './pizzerias.dto'

export interface IOrdersState {
  orders: IOrder[]
  statuses: IOrderStatus[]
}

export interface IOrder {
  id: number
  pizzeria_id: number
  pizzeria?: IPizzeria
  customer_id: number
  customer?: IUser
  delivery_type: boolean
  appointed_time: boolean
  in_time?: Date
  address_id: number
  address_obj?: IAddress
  address: string
  message: string
  status: number
  status_obj?: IOrderStatus
	payment_type: string | 'Опллата картой' | 'Наличные' | 'Перевод' | 'Онлайн оплата'
	payment_status: 'Не оплачено' | 'Отменено' | 'Наличные' | 'Перевод'
  total_price: number
  total_goods: number
  goods: IProduct[]
  promo: string
  create_at?: Date
  update_at?: Date
}

export interface IOrderStatus {
  id?: number
  description: string
  color?: string
}