import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import ProductsService from '../../service/products.service'

import {
  ICategory,
  IIngredient,
  IProduct,
  IProductsState,
} from 'dto/products.dto'

//==============Category==========================
const getAllCategory = createAsyncThunk(
  //action type string
  'products/getAllCategory',
  // callback function
  async thunkAPI => {
    const response = await ProductsService.getAllCategory()
    return response.data
  }
)

const createCategory = createAsyncThunk(
  //action type string
  'products/createCategory',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ProductsService.createCategory(data)
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

const editCategoryById = createAsyncThunk(
  //action type string
  'products/editCategoryById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ProductsService.editCategoryById(data)
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

const deleteCategoryById = createAsyncThunk(
  //action type string
  'products/deleteCategoryById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ProductsService.deleteCategoryById(id)
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

const getAllProducts = createAsyncThunk(
  //action type string
  'products/getAllProducts',
  // callback function
  async thunkAPI => {
    try {
      const response = await ProductsService.getAllProducts()
      return response.data
    } catch (error) {
      toast.error(`Ошибка получения товаров`)
    }
  }
)

const createProduct = createAsyncThunk(
  //action type string
  'products/createProduct',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ProductsService.createProduct(data)
      toast.success(`Продукт создан`)
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

const deleteProductById = createAsyncThunk(
  //action type string
  'products/deleteProductById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ProductsService.deleteProductById(id)
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

const editProductById = createAsyncThunk(
  //action type string
  'products/editProductById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ProductsService.editProductById(data)
      toast.success(`Продукт успешно отредактирован`)
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

//==============Ingredients==========================
const createIngredient = createAsyncThunk(
  //action type string
  'products/createIngredient',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ProductsService.createIngredient(data)
      toast.success(`Ингредиент создан`)
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
const getAllIngredients = createAsyncThunk(
  //action type string
  'products/getAllIngredients',
  // callback function
  async thunkAPI => {
    try {
      const response = await ProductsService.getAllIngredients()
      return response.data
    } catch (error) {
      toast.error(`Ошибка получения ингредиентов`)
    }
  }
)
const deleteById = createAsyncThunk(
  //action type string
  'products/deleteById',
  // callback function
  async (id: number, thunkAPI) => {
    try {
      const response = await ProductsService.deleteById(id)
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
const editIngredientById = createAsyncThunk(
  //action type string
  'products/editIngredientById',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await ProductsService.editIngredientById(data)
      toast.success(`Ингредиент успешно отредактирован`)
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

const initialState: IProductsState = {
  categories: [],
  products: [],
  ingredients: [],
}

export const productsSlice = createSlice({
  name: 'products',
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
    //==============Category==========================
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.categories.push(action.payload)
      }
    })
    builder.addCase(editCategoryById.fulfilled, (state, action) => {
      if (action.payload) {
        state.categories = state.categories.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as ICategory[]
      }
    })
    builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
      state.categories = state.categories.filter(el => el.id !== action.payload)
    })
    //===============Products=========================
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload
      }
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.products.push(action.payload)
      }
    })
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      state.products = state.products.filter(el => el.id !== action.payload)
    })
    builder.addCase(editProductById.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = state.products.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IProduct[]
      }
    })
    //===============Ingredients=========================
    builder.addCase(createIngredient.fulfilled, (state, action) => {
      if (action.payload) {
        state.ingredients.push(action.payload)
      }
    })
    builder.addCase(getAllIngredients.fulfilled, (state, action) => {
      if (action.payload) {
        state.ingredients = action.payload
      }
    })
    builder.addCase(deleteById.fulfilled, (state, action) => {
      state.ingredients = state.ingredients.filter(
        el => el.id !== action.payload
      )
    })
    builder.addCase(editIngredientById.fulfilled, (state, action) => {
      if (action.payload) {
        state.ingredients = state.ingredients.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IIngredient[]
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const productsActions: any = {
  ...productsSlice.actions,
  getAllCategory,
  createCategory,
  editCategoryById,
  deleteCategoryById,
  createIngredient,
  getAllIngredients,
  deleteById,
  editIngredientById,
  createProduct,
  getAllProducts,
  deleteProductById,
  editProductById,
}

export default productsSlice.reducer
