export interface IAddressState {
  cities: ICity[]
  streets: IStreet[]
  addresses: IAddress[]
}

export interface ICity {
  id: number | null
  city: string
  is_active: boolean
}

export interface IStreet {
  id: number | null
  street: string | null
  cityId: number | null
  city: string | null
  is_active: boolean
}

export interface IAddress {
  id: number | null
  cityId: number | null
  city: string | null
  streetId: number | null
  street: string | null
  house: string | null
  housing: string | null
  apartment: string | null
  entrance: string | null
  floor: string | null
  intercom: string | null
  user_id?: number | null
  pizzeria_id?: number | null
  description?: string | null
  is_active: boolean
}
