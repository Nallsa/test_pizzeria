/* import $api from '../api'; */
import { $api } from '../api'

import { IContactType } from 'dto/pizzerias.dto'

export default class AddressService {
  //создаём тип контакта
  static async createContactType(data: any): Promise<{ data: IContactType }> {
    return $api.post('/contacts/type', data)
  }
  //получаем все типы контактов
  static async getAllContactsTypes(): Promise<{ data: IContactType[] }> {
    return $api.get('/contacts/type')
  }
  //редактируем категорию
  /* static async editCityById(data:ICity): Promise<{data:ICity}> {
		return $api.put('/address/city', data);
	} */
  //удаляем контакт
  static async deleteContactById(id: number): Promise<{ data: any }> {
    return $api.delete(`/contacts/${id}`)
  }
}
