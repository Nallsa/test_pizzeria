import { ICity, IStreet } from "./address.dto"

export interface IPizzeriasState {
  pizzerias: IPizzeria[]
  contactTypes: IContactType[]
}

export interface IPizzeria {
	id: number | null
	ownerId: number | null
	name: string | null
	map: string | null
	addressId: number | null
	adminsIds: number[] | null
	is_active: boolean
	address: IAddress | null
	contacts: IContacts[] | null
	delivery_description: string | null
	orderMail: string | null
	payment_method: string | null
	api_login: string | null
	api_password: string | null
	secret_key: string | null
	accounting_secret_key: string | null
	accounting_key_affiliate: string | null
	min_order_price: number | null
	delivery_price: number | null
	delivery_area?: IDeliveryArea[] | null
	yandex_metrica?: string | null
	yandex_counter?: string | null
	time_open?: string | null
	time_close?: string | null
}

export interface IDeliveryArea {
	id: number | null
	pizzeria_id: number | null
	area: string | null
	cityId: number | null
	city?: ICity | null
	streetId: number | null
	street?: IStreet | null
	delivery_price: number | null
	min_order_price: number | null
	delivery_description: string | null
	is_active: boolean;
}

export interface IDeliveryAreaSettings {
	id: number | null
	pizzeria_id: number | null
	pizzeria_coords: number[] | null
	search_coords: number[][] | null
	geo_json: any | null
	api_key: string | null
	area?: IDeliveryArea[]
}

export interface IAddress {
  id?: number | null
  apartment?: string | null
  city: string | null
  cityId: number | null
  description: string | null
  entrance?: string | null
  floor: string | null
  house: string | null
  housing: string | null
  intercom?: string | null
  pizzeria_id?: number | null
  street: string | null
  streetId: number | null
  is_active?: boolean
  user_id?: number | null
}

export interface IContacts {
  uuid?: number | null
  id: number | null
  contact_type: string | null
  contact: string | null
  contact_type_id: number | null
  pizzeria_id: number | null
}

export interface IContactType {
  id: number | null
  contact_type: string
}
