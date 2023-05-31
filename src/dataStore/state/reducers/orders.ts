import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import OrdersService from '../../service/orders.service'

import { IOrdersState, IOrderStatus } from 'dto/orders.dto'

const getAllOrders = createAsyncThunk(
  //action type string
  'orders/getAllOrders',
  // callback function
  async thunkAPI => {
    try {
      const response = await OrdersService.getAllOrders()
      return response?.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const getAllOrderStatus = createAsyncThunk(
  //action type string
  'orders/getAllOrderStatus',
  // callback function
  async thunkAPI => {
    try {
      const response = await OrdersService.getAllOrderStatus()
      return response?.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const createOrderStatus = createAsyncThunk(
  //action type string
  'orders/createOrderStatus',
  // callback function
  async (data: IOrderStatus, thunkAPI) => {
    try {
      const response = await OrdersService.createOrderStatus(data)
      toast.success(`Статус создан`)
      return response?.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const editOrderStatus = createAsyncThunk(
  //action type string
  'orders/editOrderStatus',
  // callback function
  async (data: IOrderStatus, thunkAPI) => {
    try {
      const response = await OrdersService.editOrderStatus(data)
      toast.success(`Статус отредактирован`)
      return response?.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const deleteOrderStatus = createAsyncThunk(
  //action type string
  'orders/deleteOrderStatus',
  // callback function
  async (id: number | string, thunkAPI) => {
    try {
      const response = await OrdersService.deleteOrderStatus(id)
      toast.success(`Статус удалён`)
      return id
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const editOrder = createAsyncThunk(
  //action type string
  'orders/editOrder',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await OrdersService.editOrder(data)
      console.log({ response })
      toast.success(`Заказ изменён`)
      return response?.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const initialState: IOrdersState = {
  orders: [],
  statuses: [],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      if (action.payload) {
        state.orders = action?.payload
      }
    })
    builder.addCase(editOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.orders = state.orders.map(el => {
          if (action?.payload && el.id === action?.payload?.id) {
            return action?.payload
          } else {
            return el
          }
        })
      }
    })
    builder.addCase(getAllOrderStatus.fulfilled, (state, action) => {
      if (action?.payload) {
        state.statuses = action?.payload
      }
    })
    builder.addCase(createOrderStatus.fulfilled, (state, action) => {
      if (action?.payload) {
        state.statuses.push(action?.payload)
      }
    })
    builder.addCase(editOrderStatus.fulfilled, (state, action) => {
      if (action.payload) {
        state.statuses = state.statuses.map(el => {
          if (action?.payload && el.id === action?.payload.id) {
            return action?.payload
          } else {
            return el
          }
        })
      }
    })
    builder.addCase(deleteOrderStatus.fulfilled, (state, action) => {
      if (action?.payload) {
        state.statuses = state.statuses.filter(el => el.id !== action?.payload)
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const ordersActions: any = {
  ...ordersSlice.actions,
  getAllOrders,
  getAllOrderStatus,
  createOrderStatus,
  editOrderStatus,
  deleteOrderStatus,
  editOrder,
}

export default ordersSlice.reducer
