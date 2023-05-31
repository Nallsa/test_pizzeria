import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import UsersService from '../../service/users.service'

import { IUser, IUsersState } from 'dto/users.dto'

const getAllUsers = createAsyncThunk(
  //action type string
  'users/getAllUsers',
  // callback function
  async thunkAPI => {
    try {
      const response = await UsersService.getAllUsers()
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

/* const createUser = createAsyncThunk(
	//action type string
	'users/createUser',
	// callback function
	async (data: any, thunkAPI) => {
		try {
			const response = await UsersService.createUser(data)
			toast.success(`Пользователь создан`);
			return response.data
		} catch (error: any) {
			if (error?.data?.message) {
				toast.error(`${error?.data?.message}`);
			} else {
				toast.error(`${error?.statusText}`);
			}
		}
	}
) */

const editUserById = createAsyncThunk(
  //action type string
  'address/editCityById',
  // callback function
  async (data: any, thunkAPI: any) => {
    try {
      const response = await UsersService.editUserById(data)
      toast.success(`Пользователь успешно отредактирован`)
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const createLegalData = createAsyncThunk(
  //action type string
  'users/createLegalData',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await UsersService.createLegalData(data)
      toast.success(`Данные добавлены`)
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const editLegalData = createAsyncThunk(
  //action type string
  'users/editLegalData',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await UsersService.editLegalData(data)
      toast.success(`Данные обновлены`)
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

/* const getAllCitiesByValue = createAsyncThunk(
	//action type string
	'address/getAllCitiesByValue',
	// callback function
	async (data: string, thunkAPI) => {
		try {
			const response = await AddressService.getAllCitiesByValue(data)
			return response.data
		} catch (error: any) {
			if (error?.data?.message) {
				toast.error(`${error?.data?.message}`);
			} else {
				toast.error(`${error?.statusText}`);
			}
		}
	}
) */

/* const deleteCityById = createAsyncThunk(
	//action type string
	'address/deleteCityById',
	// callback function
	async (id: number, thunkAPI) => {
		try {
			const response = await AddressService.deleteCityById(id)
			toast.success(`${response.data.message}`);
			return Number(response.data.id)
		} catch (error: any) {
			if (error?.data?.message) {
				toast.error(`${error?.data?.message}`);
			} else {
				toast.error(`${error?.statusText}`);
			}
		}
	}
) */

const initialState: IUsersState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload]
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload
      }
    })
    builder.addCase(editUserById.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = state.users.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IUser[]
      }
    })
    builder.addCase(createLegalData.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = state.users.map(i =>
          i.id === action.payload?.userId
            ? { ...i, legalData: action.payload }
            : i
        ) as IUser[]
      }
    })
    builder.addCase(editLegalData.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = state.users.map(i =>
          i.id === action.payload?.userId
            ? { ...i, legalData: action.payload }
            : i
        ) as IUser[]
      }
    })
    /* builder.addCase(getAllCitiesByValue.fulfilled, (state, action) => {
			if (action.payload) {
				state.cities = action.payload
			}
		})
		builder.addCase(createCity.fulfilled, (state, action) => {
			if (action.payload) {
				state.cities.push(action.payload)
			}
		})

		builder.addCase(deleteCityById.fulfilled, (state, action) => {
			state.cities = state.cities.filter(el=> el.id !== action.payload)
		}) */
  },
})

// Action creators are generated for each case reducer function
export const usersActions: any = {
  ...usersSlice.actions,
  getAllUsers,
  editUserById,
  createLegalData,
  editLegalData,
}

export default usersSlice.reducer
