import Actions from 'dataStore/state/actions'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(Actions, dispatch)
}
