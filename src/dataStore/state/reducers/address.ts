import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import AddressService from '../../service/address.service'

import { IAddressState, ICity, IStreet } from 'dto/address.dto'

//==============Cities==========================
const getAllCities = createAsyncThunk(
  //action type string
  'address/getAllCities',
  // callback function
  async thunkAPI => {
    try {
      const response = await AddressService.getAllCities()
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
const getAllCitiesByValue = createAsyncThunk(
  //action type string
  'address/getAllCitiesByValue',
  // callback function
  async (data: string, thunkAPI) => {
    try {
      const response = await AddressService.getAllCitiesByValue(data)
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

const createCity = createAsyncThunk(
  //action type string
  'address/createCity',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.createCity(data)
      toast.success(`Город создан`)
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

const editCityById = createAsyncThunk(
  //action type string
  'address/editCityById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.editCityById(data)
      toast.success(`Город успешно отредактирован`)
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

const deleteCityById = createAsyncThunk(
  //action type string
  'address/deleteCityById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await AddressService.deleteCityById(id)
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

//==============Streets==========================

const getCityById = createAsyncThunk(
  //action type string
  'address/getCityById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.getCityById(data)
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

const getAllStreets = createAsyncThunk(
  //action type string
  'address/getAllStreets',
  // callback function
  async thunkAPI => {
    try {
      const response = await AddressService.getAllStreets()
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

const getStreetsById = createAsyncThunk(
  //action type string
  'address/getStreetsById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.getStreetsById(data)
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

const createStreet = createAsyncThunk(
  //action type string
  'address/createStreet',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.createStreet(data)
      toast.success(`Улица добавлена`)
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

const deleteStreetById = createAsyncThunk(
  //action type string
  'address/deleteStreetById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await AddressService.deleteStreetById(id)
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

const editStreetById = createAsyncThunk(
  //action type string
  'address/editStreetById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.editStreetById(data)
      toast.success(`Улица успешно отредактирована`)
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

//==============Addresses==========================
const createAddress = createAsyncThunk(
  //action type string
  'address/createAddress',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await AddressService.createAddress(data)
      toast.success(`Добавлен адрес`)
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

const initialState: IAddressState = {
  cities: [],
  streets: [],
  addresses: [],
}

export const addressSlice = createSlice({
  name: 'address',
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
    //==============Cities==========================
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      if (action.payload) {
        state.cities = action.payload
      }
    })
    builder.addCase(getCityById.fulfilled, (state, action) => {
      if (action.payload) {
        let hasCity = true
        state.cities.map(el => {
          if (el.id === action.payload?.id) hasCity = false
        })
        if (hasCity) state.cities.push(action.payload)
      }
    })
    builder.addCase(getAllCitiesByValue.fulfilled, (state, action) => {
      if (action.payload) {
        state.cities = action.payload
      }
    })
    builder.addCase(createCity.fulfilled, (state, action) => {
      if (action.payload) {
        state.cities.push(action.payload)
      }
    })
    builder.addCase(editCityById.fulfilled, (state, action) => {
      if (action.payload) {
        state.cities = state.cities.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as ICity[]
      }
    })
    builder.addCase(deleteCityById.fulfilled, (state, action) => {
      state.cities = state.cities.filter(el => el.id !== action.payload)
    })
    //===============Streets=========================
    builder.addCase(getAllStreets.fulfilled, (state, action) => {
      if (action.payload) {
        state.streets = action.payload
      }
    })
    builder.addCase(getStreetsById.fulfilled, (state, action) => {
      if (action.payload) {
        state.streets = action.payload
      }
    })
    builder.addCase(createStreet.fulfilled, (state, action) => {
      if (action.payload) {
        state.streets.push(action.payload)
      }
    })
    builder.addCase(deleteStreetById.fulfilled, (state, action) => {
      state.streets = state.streets.filter(el => el.id !== action.payload)
    })
    builder.addCase(editStreetById.fulfilled, (state, action) => {
      if (action.payload) {
        state.streets = state.streets.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IStreet[]
      }
    })
    //===============Addresses=========================
    builder.addCase(createAddress.fulfilled, (state, action) => {
      if (action.payload) {
        state.addresses.push(action.payload)
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const addressActions: any = {
  ...addressSlice.actions,
  getAllCities,
  getCityById,
  createCity,
  editCityById,
  deleteCityById,
  getAllStreets,
  createStreet,
  deleteStreetById,
  editStreetById,
  createAddress,
  getAllCitiesByValue,
  getStreetsById,
}

export default addressSlice.reducer
