import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


import ContactsService from '../../service/contacts.service'
import PizzeriaService from '../../service/pizzeria.service'

import { IDeliveryArea, IPizzeria, IPizzeriasState } from 'dto/pizzerias.dto'

//==============Contacts==========================
const getAllContactsTypes = createAsyncThunk(
  //action type string
  'pizzerias/getAllContactsTypes',
  // callback function
  async thunkAPI => {
    try {
      const response = await ContactsService.getAllContactsTypes()
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

const createContactType = createAsyncThunk(
  //action type string
  'pizzerias/createContactType',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ContactsService.createContactType(data)
      toast.success(`Тип контакта создан`)
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

/* const editCityById = createAsyncThunk(
	//action type string
	'address/editCityById',
	// callback function
	async (data: any, thunkAPI) => {
		try {
			const response = await AddressService.editCityById(data)
			toast.success(`Город успешно отредактирован`);
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

const deleteContactById = createAsyncThunk(
  //action type string
  'pizzerias/deleteContactById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ContactsService.deleteContactById(id)
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
//==============pizzerias==========================
const getAllPizzerias = createAsyncThunk(
  //action type string
  'pizzerias/getAllPizzerias',
  // callback function
  async thunkAPI => {
    try {
      const response = await PizzeriaService.getAllPizzerias()
      return response.data
		} catch (error: any) {
			toast.error(`${error?.status}`)
			if (error?.data?.message) {
				console.log({ error })
        toast.error(`${error?.data?.message}`)
      } else {
				toast.error(`${error?.statusText}`)
      }
    }
  }
)

const createPizzeria = createAsyncThunk(
  //action type string
  'pizzerias/createPizzeria',
  // callback function
  async (data: IPizzeria, thunkAPI) => {
    try {
      const response = await PizzeriaService.createPizzeria(data)
      toast.success(`Пиццерия создана`)
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

const getPizzeriaById = createAsyncThunk(
  //action type string
  'pizzerias/getPizzeriaById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await PizzeriaService.getPizzeriaById(id)
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
const deletePizzeriaById = createAsyncThunk(
  //action type string
  'pizzerias/deletePizzeriaById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await PizzeriaService.deletePizzeriaById(id)
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

const editPizzeriaById = createAsyncThunk(
  //action type string
  'pizzerias/editPizzeriaById',
  // callback function
  async (data: IPizzeria, thunkAPI) => {
    try {
      const response = await PizzeriaService.editPizzeriaById(data)
      toast.success(`Пиццерия успешно отредактирована`)
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

//=====================DeliveryArea========================
const createDeliveryArea = createAsyncThunk(
  //action type string
  'pizzerias/createDeliveryArea',
  // callback function
  async (data: IDeliveryArea, thunkAPI) => {
    try {
      const response = await PizzeriaService.createDeliveryArea(data)
      toast.success(`Адрес добавлен`)
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
			return error
    }
  }
)
const deleteDeliveryArea = createAsyncThunk(
  //action type string
  'pizzerias/deleteDeliveryArea',
  // callback function
  async (data: IDeliveryArea, thunkAPI) => {
    try {
      await PizzeriaService.deleteDeliveryArea(data?.id!)
      toast.success(`Адрес удалён`)
      return data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
			return error
    }
  }
)
const editDeliveryArea = createAsyncThunk(
  //action type string
  'pizzerias/editDeliveryArea',
  // callback function
  async (data: IDeliveryArea, thunkAPI) => {
    try {
      const response = await PizzeriaService.editDeliveryArea(data)
      toast.success(`Адрес отредактирован`)
      return response?.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
			}
			return error
    }
  }
)


const initialState: IPizzeriasState = {
  pizzerias: [],
  contactTypes: [],
}

export const pizzeriaSlice = createSlice({
  name: 'pizzeria',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //==============contacts==========================
    builder.addCase(getAllContactsTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.contactTypes = action.payload
      }
    })
    builder.addCase(createContactType.fulfilled, (state, action) => {
      if (action.payload) {
        state.contactTypes.push(action.payload)
      }
    })
    /* builder.addCase(editCityById.fulfilled, (state, action) => {
			if (action.payload) {
				state.cities = state.cities.map((i) => (i.id === action.payload?.id ? action.payload : i)) as ICity[]
			}
		}) */
		builder.addCase(deleteContactById.fulfilled, (state, action) => {
			state.pizzerias = state?.pizzerias?.map(el => ({
				...el,
				contacts: el?.contacts?.filter(contact => contact.id !== action?.payload)?? null,
			}))
    })
    //==============pizzerias==========================
    builder.addCase(getAllPizzerias.fulfilled, (state, action) => {
      if (action.payload) {
        state.pizzerias = action.payload
      }
    })
    builder.addCase(createPizzeria.fulfilled, (state, action) => {
      if (action.payload) {
        state.pizzerias.push(action.payload)
      }
    })
    builder.addCase(getPizzeriaById.fulfilled, (state, action) => {
      if (action.payload) {
        let hasPizzaria = true
        state.pizzerias.map(el => {
          if (el.id === action.payload?.id) hasPizzaria = false
        })
        if (hasPizzaria) state.pizzerias.push(action.payload)
      }
    })
    builder.addCase(deletePizzeriaById.fulfilled, (state, action) => {
      state.pizzerias = state.pizzerias.filter(el => el.id !== action.payload)
    })
    builder.addCase(editPizzeriaById.fulfilled, (state, action) => {
      state.pizzerias = state.pizzerias?.map(el =>
        el.id === action?.payload?.id ? action.payload : el
      )
		})
		//====================deliveryArea========================
    builder.addCase(createDeliveryArea.fulfilled, (state, action) => {
			state.pizzerias = state.pizzerias?.map(el => {
				if (el.id === action?.payload?.pizzeria_id) {
					if (el.delivery_area) {
						return {...el, delivery_area: [...el.delivery_area, action.payload]}
					} else {
						return {...el, delivery_area: [action.payload]}
					}
				} else {
					return el
				}
			}
      )
    })
    builder.addCase(deleteDeliveryArea.fulfilled, (state, action) => {
			state.pizzerias = state.pizzerias?.map(el => {
				if (el.id === action?.payload?.pizzeria_id) {
					return {...el, delivery_area: el?.delivery_area?.filter(item => item.id !== action?.payload?.id)}
				} else {
					return el
				}
			}
      )
    })
    builder.addCase(editDeliveryArea.fulfilled, (state, action) => {
			state.pizzerias = state.pizzerias?.map(el => {
				if (el.id === action?.payload?.pizzeria_id) {
					return {...el, delivery_area: el?.delivery_area?.map(item => item.id === action?.payload?.id ? action?.payload : item)}
				} else {
					return el
				}
			}
      )
    })
  },
})

// Action creators are generated for each case reducer function
export const pizzeriaActions: any = {
  ...pizzeriaSlice.actions,
  getAllContactsTypes,
  createContactType,
  getAllPizzerias,
  createPizzeria,
  getPizzeriaById,
  deletePizzeriaById,
  editPizzeriaById,
  deleteContactById,
	createDeliveryArea,
	deleteDeliveryArea,
	editDeliveryArea
}

export default pizzeriaSlice.reducer
