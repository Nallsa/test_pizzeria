export interface IQuestionsState {
  questions: IQuestion[]
}

export interface IQuestion {
  id: number
  name: string
  phone: string
  subject: string
  pizzeria_id: number
  is_viewed: boolean
  is_agree: boolean
  viewerId: number
  create_at?: string
  update_at?: string
}

export interface ICreateQuestion {
  name: string
  phone: string
  subject: string
  pizzeria_id: number
  is_agree: boolean
}
