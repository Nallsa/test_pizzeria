import { $api } from '../api'

import { IPromo } from 'dto/pagesData.dto'

export default class PagesDataService {
  //==============Promo==========================
  //получаем все акции
  static async getAllPromo(): Promise<{ data: IPromo[] }> {
    return $api.get('/promo')
  }
  //создаём акцию
  static async createPromo(data: any): Promise<{ data: IPromo }> {
    return $api.post('/promo', data)
  }
  //редактируем акцию
  static async editPromoById(data: any): Promise<{ data: IPromo }> {
    return $api.put('/promo', data)
  }
  //удаляем акцию
  static async deletePromoById(id: number): Promise<{ data: any }> {
    return $api.delete(`/promo/${id}`)
  }
  //================Products===================================
}
