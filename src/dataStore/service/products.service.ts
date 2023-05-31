/* import $api from '../api'; */
import { $api } from '../api'

import {
  ICategory,
  IIngredient,
  IProduct,
  IProductType,
} from 'dto/products.dto'

export default class ProductsService {
  //==============Category==========================
  //получаем все категории
  static async getAllCategory(): Promise<{ data: ICategory[] }> {
    return $api.get('/category')
  }
  //создаём категорию
  static async createCategory(data: any): Promise<{ data: ICategory }> {
    return $api.post('/category', data)
  }
  //редактируем категорию
  static async editCategoryById(data: any): Promise<{ data: ICategory }> {
    return $api.put('/category', data)
  }
  //удаляем ингредиент
  static async deleteCategoryById(id: number): Promise<{ data: any }> {
    return $api.delete(`/category/${id}`)
  }
  //================Products===================================
  //получаем все продукты
  static async getAllProducts(): Promise<{ data: IProduct[] }> {
    return $api.get('/products')
  }
  //создаём продукт
  static async createProduct(data: any): Promise<{ data: IProduct }> {
    return $api.post('/products', data)
  }
  //удаляем продукт
  static async deleteProductById(id: number): Promise<{ data: any }> {
    return $api.delete(`/products/${id}`)
  }
  //редактируем продукт
  static async editProductById(data: any): Promise<{ data: IProduct }> {
    return $api.put(`/products`, data)
  }
  //================Ingredients===================================
  //получаем все ингредиенты
  static async getAllIngredients(): Promise<{ data: IIngredient[] }> {
    return $api.get('/ingredients')
  }
  //создаём ингредиент
  static async createIngredient(
    data: IIngredient
  ): Promise<{ data: IIngredient }> {
    return $api.post('/ingredients', data)
  }
  //удаляем ингредиент
  static async deleteById(id: number): Promise<{ data: any }> {
    return $api.delete(`/ingredients/${id}`)
  }
  //редактировани ингредиент
  static async editIngredientById(data: any): Promise<{ data: IIngredient }> {
    return $api.put(`/ingredients`, data)
  }
  //================productType===================================
  //получаем все ингредиенты
  static async getAllTypes(): Promise<{ data: IProductType[] }> {
    return $api.get('/products/type')
  }
}
