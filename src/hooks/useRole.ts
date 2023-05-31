import {useState, useLayoutEffect} from 'react'
import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { RootState } from 'dataStore/state'
import { useActions } from 'hooks/useActions'
import { IUser } from 'dto/users.dto'

export const useRole = () => {
  const { getAllUsers } = useActions()
  const { users } = useSelector((state: RootState) => state.users)

  const [decodedOldToken, setDecodedOldToken] = useState<any>()
  const [user, setUser] = useState<IUser | null>(null)

  const token = localStorage.getItem('token')
  if (token && !decodedOldToken) setDecodedOldToken(jwtDecode(token))

  useLayoutEffect(() => {
    if (!users || users.length === 0) getAllUsers()
    if (users.length> 0 && decodedOldToken && !user) {
      const currentUser = users?.find(
        user => user?.id === decodedOldToken?.id
			)
			if (currentUser) {
				setUser(currentUser)
			}
    }
  }, [users, decodedOldToken])

  return { parentId: user?.parentId, userId: user?.id }
}
