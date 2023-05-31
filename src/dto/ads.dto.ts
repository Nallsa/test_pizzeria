export interface IAdsState {
  ads: IAds[]
}

export interface IAds {
	id?: number
	title: string
	description: string | null
	img: string | null
	start_at: Date | string | null
	end_at: Date | string | null
	is_active: boolean
}