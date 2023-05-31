import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import PagesDataService from '../../service/pagesData.service'

import { IPageDataState, IPromo } from 'dto/pagesData.dto'

//==============Promo==========================
const getAllPromo = createAsyncThunk(
  //action type string
  'products/getAllPromo',
  // callback function
  async thunkAPI => {
    const response = await PagesDataService.getAllPromo()
    return response.data
  }
)

const createPromo = createAsyncThunk(
  //action type string
  'products/createPromo',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await PagesDataService.createPromo(data)
      toast.success(`Категория создана`)
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

const editPromoById = createAsyncThunk(
  //action type string
  'products/editPromoById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await PagesDataService.editPromoById(data)
      toast.success(`Категория успешно отредактирована`)
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

const deletePromoById = createAsyncThunk(
  //action type string
  'products/deletePromoById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await PagesDataService.deletePromoById(id)
      toast.success(`${response.data.message}`)
      return Number(response.data.id)
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

//==============Products==========================

const initialState: IPageDataState = {
  promo: [],
}

export const pageDataSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    /* getAllCategory: (state): void => {
			ProductsService.getAllCategory()
				.then(res => (
					state.category = res
					)
				)
		}, */
  },
  extraReducers: builder => {
    //==============Promo==========================
    builder.addCase(getAllPromo.fulfilled, (state, action) => {
      state.promo = action.payload
    })
    builder.addCase(createPromo.fulfilled, (state, action) => {
      if (action.payload) {
        state.promo.push(action.payload)
      }
    })
    builder.addCase(editPromoById.fulfilled, (state, action) => {
      if (action.payload) {
        state.promo = state.promo.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IPromo[]
      }
    })
    builder.addCase(deletePromoById.fulfilled, (state, action) => {
      state.promo = state.promo.filter(el => el.id !== action.payload)
    })
    //===============Products=========================
  },
})

// Action creators are generated for each case reducer function
export const pageDataActions: any = {
  ...pageDataSlice.actions,
  getAllPromo,
  createPromo,
  editPromoById,
  deletePromoById,
}

export default pageDataSlice.reducer
