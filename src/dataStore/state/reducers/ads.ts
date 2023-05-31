import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import AdsService from '../../service/ads.service'

import { IAdsState, IAds } from 'dto/ads.dto'


const getAllAds = createAsyncThunk(
  //action type string
  'ads/getAllAds',
  // callback function
  async thunkAPI => {
    try {
			const response = await AdsService.getAll()
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
const getById = createAsyncThunk(
  //action type string
  'ads/getAllById',
  // callback function
  async (data: number, thunkAPI) => {
    try {
      const response = await AdsService.getById(data)
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

const createAds = createAsyncThunk(
  //action type string
  'ads/createAds',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AdsService.createAds(data)
      toast.success(`Объявление создано`)
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

const editAdsById = createAsyncThunk(
  //action type string
  'ads/editAdsById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AdsService.editAdsById(data)
      toast.success(`Объявление успешно отредактировано`)
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

const deleteAdsById = createAsyncThunk(
  //action type string
  'ads/deleteAdsById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await AdsService.deleteAdsById(id)
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



const initialState: IAdsState = {
  ads: [],
}

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllAds.fulfilled, (state, action) => {
      if (action.payload) {
        state.ads = action.payload
      }
    })
    builder.addCase(editAdsById.fulfilled, (state, action) => {
			if (action.payload) {
				state.ads = state.ads.map(el => el.id === action.payload?.id ? action.payload : el) as IAds[]
      }
    })
		builder.addCase(createAds.fulfilled, (state, action) => {
			if (action.payload) {
				state.ads.push(action.payload)
			}
		})
		builder.addCase(deleteAdsById.fulfilled, (state, action) => {
			state.ads = state.ads.filter(el => el.id !== action.payload)
		})
  },
})

// Action creators are generated for each case reducer function
export const adsActions: any = {
	...adsSlice.actions,
	getAllAds,
	editAdsById,
	createAds,
	deleteAdsById
}

export default adsSlice.reducer
