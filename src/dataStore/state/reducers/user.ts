import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { IUserData } from 'dto/user.dto'

export interface UserState {
  userId: string
  firstName: string
}

const initialState: UserState = {
  userId: '',
  firstName: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUserData>) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
    },
  },
})

// Action creators are generated for each case reducer function
export const userActions = { ...userSlice.actions }

export default userSlice.reducer
