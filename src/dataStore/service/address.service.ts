/* import $api from '../api'; */
import { $api } from '../api'

import { IAddress, ICity, IStreet } from 'dto/address.dto'

export default class AddressService {
  //==============Cities==========================
  //получаем все города
  static async getAllCities(): Promise<{ data: ICity[] }> {
    return $api.get('/address/cities')
  }
  static async getAllCitiesByValue(data: any): Promise<{ data: ICity[] }> {
    return $api.post('/address/cities', data)
  }
  //получение по id
  static async getCityById(id: number): Promise<{ data: ICity }> {
    return $api.get(`/address/city/${id}`)
  }
  //создаём город
  static async createCity(data: any): Promise<{ data: ICity }> {
    return $api.post('/address/city', data)
  }
  //редактируем категорию
  static async editCityById(data: ICity): Promise<{ data: ICity }> {
    return $api.put('/address/city', data)
  }
  //удаляем город
  static async deleteCityById(id: number): Promise<{ data: any }> {
    return $api.delete(`/address/city/${id}`)
  }
  //================Streets===================================
  //получаем все улицы
  static async getAllStreets(): Promise<{ data: IStreet[] }> {
    return $api.get('/address/streets')
  }
  //получаем все улицы по id города
  static async getStreetsById(data: any): Promise<{ data: IStreet[] }> {
    return $api.post('/address/streets_id', data)
  }
  //получаем улицу по id
  static async getStreetById(id: number): Promise<{ data: IStreet }> {
    return $api.get(`/address/street/${id}`)
  }
  //создаём улицу
  static async createStreet(data: any): Promise<{ data: IStreet }> {
    return $api.post('/address/street', data)
  }
  //удаляем улицу
  static async deleteStreetById(id: number): Promise<{ data: any }> {
    return $api.delete(`/address/street/${id}`)
  }
  //редактируем улицу
  static async editStreetById(data: IStreet): Promise<{ data: IStreet }> {
    return $api.put(`/address/street/`, data)
  }
  //================Addresses===================================
  //получаем все адреса
  static async getAllIngredients(): Promise<{ data: IAddress[] }> {
    return $api.get('/address')
  }
  //создаём ингредиент
  static async createAddress(data: IAddress): Promise<{ data: IAddress }> {
    return $api.post('/address', data)
  }
  //удаляем ингредиент
  static async deleteById(id: number): Promise<{ data: any }> {
    return $api.delete(`/address/${id}`)
  }
  //редактировани ингредиент
  static async editIngredientById(data: any): Promise<{ data: IAddress }> {
    return $api.put(`/address`, data)
  }
}
