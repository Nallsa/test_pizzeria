export interface IUsersState {
  users: IUser[]
}

export interface IUser {
  id: number | null | undefined
  is_admin: boolean | undefined
  is_active: boolean | undefined
  is_legal: boolean | undefined
  legalData: ILegalData
  first_name: string | undefined
  last_name: string | null | undefined
  phone: string | undefined
  email: string | null | undefined
  password: string | null | undefined
  parentId: number | null | undefined
}

export interface ILegalData {
  id?: number | null | undefined
  userId?: number | null | undefined
  legalName: string | null | undefined
  identificationNumber: string | null
  ogrn: string | null
  legalAddress: string | null
  phone: string | null
  email: string | null
}
