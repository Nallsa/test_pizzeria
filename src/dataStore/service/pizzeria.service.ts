/* import $api from '../api'; */
import { $api } from '../api'

import { IDeliveryArea, IDeliveryAreaSettings, IPizzeria } from '../../dto/pizzerias.dto'
import { IPaymentMethods } from 'components/pizzerias/createPizzeria/components/PaymentData'

export default class PizzeriaService {
  //==============pizzerias==========================
  //получаем все
  static async getAllPizzerias(): Promise<{ data: IPizzeria[] }> {
    return $api.get('/pizzerias/all')
  }
  //получаем по id
  static async getPizzeriaById(id: number): Promise<{ data: IPizzeria }> {
    return $api.get(`/pizzerias/${id}`)
  }
  //создаём
  static async createPizzeria(data: any): Promise<{ data: IPizzeria }> {
    return $api.post('/pizzerias/', data)
  }
  //редактируем
  static async editPizzeriaById(data: IPizzeria): Promise<{ data: IPizzeria }> {
    return $api.put('/pizzerias/', data)
  }
  //удаляем
  static async deletePizzeriaById(id: number): Promise<{ data: any }> {
    return $api.delete(`/pizzerias/${id}`)
	}

  //==============DeliveryAreaSettings==========================
	//Создаём
	static async createDeliveryAreaSettings(
		data: IDeliveryAreaSettings
	): Promise<{ data: IDeliveryAreaSettings }> {
		return $api.post('/delivery_area_settings', data)
	}
	//Получаем по id пиццерии
	static async getDeliveryAreaSettingsByPizzeria(
		id: number
	): Promise<{ data: IDeliveryAreaSettings }> {
		return $api.get(`/delivery_area_settings/pizzeria/${id}`)
	}
	//Удаляем
  static async deleteDeliveryAreaSettings(
    id: number
  ): Promise<{ data: IDeliveryAreaSettings }> {
    return $api.delete(`/delivery_area_settings/${id}`)
  }
	//редактируем
  static async editDeliveryAreaSettings(
    data: IDeliveryAreaSettings
  ): Promise<{ data: IDeliveryAreaSettings }> {
    return $api.put('/delivery_area_settings', data)
  }

  //==============DeliveryArea==========================
  //Создаём адрес доставки
  static async createDeliveryArea(
    data: IDeliveryArea
  ): Promise<{ data: IDeliveryArea }> {
    return $api.post('/delivery_area', data)
  }
  //Удаляем адрес доставки
  static async deleteDeliveryArea(
    id: number
  ): Promise<{ data: IDeliveryArea }> {
    return $api.delete(`/delivery_area/${id}`)
  }
  //редактируем адрес доставки
  static async editDeliveryArea(
    data: IDeliveryArea
  ): Promise<{ data: IDeliveryArea }> {
    return $api.put('/delivery_area', data)
  }

  //==============PaymentMethods==========================
  //получаем все
  static async getAllMethods(): Promise<{ data: IPaymentMethods[] }> {
    return $api.get('/payments/methods')
  }
}
