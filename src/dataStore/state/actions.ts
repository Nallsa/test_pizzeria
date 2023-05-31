import { userActions } from './reducers/user'
import { uiActions } from './reducers/UI'
import { productsActions } from './reducers/products'
import { pageDataActions } from './reducers/pagesData'
import { addressActions } from './reducers/address'
import { pizzeriaActions } from './reducers/pizzeria'
import { usersActions } from './reducers/users'
import { ordersActions } from './reducers/orders'
import { questionsActions } from './reducers/questions'
import { adsActions } from './reducers/ads'

const useActions = {
  ...userActions,
  ...uiActions,
  ...productsActions,
  ...pageDataActions,
  ...addressActions,
  ...pizzeriaActions,
  ...usersActions,
  ...ordersActions,
  ...questionsActions,
  ...adsActions,
}

export default useActions
