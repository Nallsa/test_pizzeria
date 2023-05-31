import { $api } from '../api'

import { IOrder, IOrderStatus } from 'dto/orders.dto'

export default class OrderService {
  //получаем все заказы
  static async getAllOrders(): Promise<{ data: IOrder[] }> {
    return $api.get('/orders/all')
  }
  //редактируем заказ
  static async editOrder(data: any): Promise<{ data: IOrder }> {
    return $api.put('/orders/', data)
  }
  //получаем все статусы заказов
  static async getAllOrderStatus(): Promise<{ data: IOrderStatus[] }> {
    return $api.get('/order_status/')
  }
  //Создаём статус заказа
  static async createOrderStatus(
    data: IOrderStatus
  ): Promise<{ data: IOrderStatus }> {
    return $api.post('/order_status/', data)
  }
  //Редактируем статус заказа
  static async editOrderStatus(
    data: IOrderStatus
  ): Promise<{ data: IOrderStatus }> {
    return $api.put('/order_status/', data)
  }
  //удаляем статус заказа
  static async deleteOrderStatus(
    id: number | string
  ): Promise<{ data: IOrderStatus }> {
    return $api.delete(`/order_status/${id}`)
  }
  // //создаём акцию
  // static async createPromo(data:any): Promise<{data:IPromo}> {
  // 	return $api.post('/promo', data);
  // }
  // //редактируем акцию
  // static async editPromoById(data:any): Promise<{data:IPromo}> {
  // 	return $api.put('/promo', data);
  // }
  // //удаляем акцию
  // static async deletePromoById(id: number): Promise<{data:any}> {
  // 	return $api.delete(`/promo/${id}` );
  // }
}
