/* import $api from '../api'; */
import { $api } from '../api'

import { ILegalData, IUser } from 'dto/users.dto'

export default class UsersService {
  //получаем всех пользователей
  static async getAllUsers(): Promise<{ data: IUser[] }> {
    return $api.get('/admins')
  }
  //создание пользователя
  static async createUser(data: IUser): Promise<{ data: IUser }> {
    return $api.post('/admins/new', data)
  }
  //редактирование
  static async editUserById(data: IUser): Promise<{ data: IUser }> {
    return $api.put(`/admins`, data)
  }
  //создание данных юрлица
  static async createLegalData(
    data: ILegalData
  ): Promise<{ data: ILegalData }> {
    return $api.post(`/legal`, data)
  }
  //обновление данных юрлица
  static async editLegalData(data: ILegalData): Promise<{ data: ILegalData }> {
    return $api.put(`/legal`, data)
  }
  /* 	static async getAllCitiesByValue(data: any): Promise<{data:ICity[]}> {
		return $api.post('/address/cities', data);
	}
	//получение по id
	static async getCityById(id: number): Promise<{data:ICity}> {
		return $api.get(`/address/city/${id}` );
	}
	//создаём город
	static async createCity(data:any): Promise<{data:ICity}> {
		return $api.post('/address/city', data);
	}
	//редактируем категорию
	static async editCityById(data:ICity): Promise<{data:ICity}> {
		return $api.put('/address/city', data);
	}
	//удаляем город
	static async deleteCityById(id: number): Promise<{data:any}> {
		return $api.delete(`/address/city/${id}` );
	} */
}
