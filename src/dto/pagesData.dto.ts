export interface IPageDataState {
  promo: IPromo[]
}

export interface IPromo {
  id: number | null
  title: string
  alias: string
  description: string | null
  img_small: string | null
  img_full: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  meta_robots: string | null
  is_active: boolean
  end_at: Date | null
  promo_products: number[]
}
