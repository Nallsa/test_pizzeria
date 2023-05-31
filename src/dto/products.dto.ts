export interface ICategory {
  id: number | null
  title: string
  description: string | null
  img_url: string | null
  url: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_robots: string | null
}

export interface IProductsState {
  categories: ICategory[]
  products: IProduct[]
  ingredients: IIngredient[]
}

export interface IngredientsProp {
  id: number
  weight_s?: number
  weight_l?: number
  weight_xl?: number
}

export interface ISizeProp {
  weight: number | null
	name: string
	article?: string | null
}
export interface IPriceProp {
  price: number | null
  pizzeriaId: number | null
  name: string
}
export interface ISinglePriceProp {
  price: number | null
  pizzeriaId: number | null
}

export interface IUploadImg {
  path?: string
  lastModified?: number
  lastModifiedDate?: any
  name?: string
  size?: number
  type?: string
  webkitRelativePath?: any
}

export interface IProduct {
  id?: number | null
	title: string
	article: string | null
  product_type: boolean
  description: string | null
  img_small: string | null
  img_full: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_robots: string | null
  ingredients: IngredientsProp[] | []
  size: ISizeProp[] | []
  single_size: string | null
  price: IPriceProp[] | []
  single_price: ISinglePriceProp[] | null
  categories: number | null
  create_at?: Date
  update_at?: Date | null
  is_active: boolean
  deletedIngredients?: string[]
  addIngredients?: IIngredient[]
  qty?: number
}

export interface IProductType {
  id: number | null
  description: string
}

export interface IIngredient {
  id?: number | null
  title: string
	article: string | null
	articles?: IIingredientsArticles | null
  description: string | null
  img_url: string | null | Blob
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_robots: string | null
  price_type: string | null
  price: number | null
  is_active: boolean
  addition: boolean
  create_at?: Date
  update_at?: Date | null
  add_weight?: IAddWeight | null
}

export interface IIingredientsArticles {
	weight_s?: string | null
	weight_l?: string | null
	weight_xl?: string | null
}

export interface IAddWeight {
  weight_s?: number | null
  weight_l?: number | null
  weight_xl?: number | null
}
