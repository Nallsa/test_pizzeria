import { $api } from '../api'

import { IAds } from 'dto/ads.dto'

export default class AdsService {
  //получаем все объявления
  static async getAll(): Promise<{ data: IAds[] }> {
    return $api.get('/ads')
	}
	//получение по id
  static async getById(data: number): Promise<{ data: IAds }> {
    return $api.get(`/ads/cities/${data}`)
  }
  //создаём объявление
  static async createAds(data: IAds): Promise<{ data: IAds }> {
    return $api.post('/ads', data)
  }
  //редактируем объявление
  static async editAdsById(data: IAds): Promise<{ data: IAds }> {
    return $api.put('/ads', data)
  }
  //удаляем город
  static async deleteAdsById(id: number): Promise<{ data: any }> {
    return $api.delete(`/ads/${id}`)
  }

}
