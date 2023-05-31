import { combineReducers } from 'redux'
import userReducer from './user'
import uiReducer from './UI'
import productReducer from './products'
import pageDataReducer from './pagesData'
import addressReducer from './address'
import pizzeriasReducer from './pizzeria'
import usersReducer from './users'
import ordersReducer from './orders'
import questionsReducer from './questions'
import adsReducer from './ads'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  products: productReducer,
  pageData: pageDataReducer,
  address: addressReducer,
  pizzerias: pizzeriasReducer,
  users: usersReducer,
  orders: ordersReducer,
  questions: questionsReducer,
  ads: adsReducer,
})

export default rootReducer
