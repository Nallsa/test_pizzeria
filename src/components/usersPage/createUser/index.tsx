import { FC, useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import { Button } from '@mui/material'
import UsersService from 'dataStore/service/users.service'
import { IUser } from 'dto/users.dto'
import { useActions } from 'hooks/useActions'
import { toast } from 'react-toastify'
import LegalData from './legalData'
import { Row, Wrapper } from './Styles.elements'
import UserData from './userData'

export interface ICreateUserProps {
  state: IUser
  setState: Function
}

interface IProps {
  editUser: IUser | null
  setEditState: Function
}

export const userState: IUser = {
  id: null,
  is_admin: true,
  is_active: true,
  is_legal: false,
  first_name: '',
  last_name: null,
  phone: '',
  email: null,
  password: null,
  parentId: null,
  legalData: {
    id: null,
    userId: null,
    legalName: null,
    identificationNumber: null,
    ogrn: null,
    legalAddress: null,
    phone: null,
    email: null,
  },
}

const CreateUser: FC<IProps> = ({ editUser, setEditState }) => {
  const [state, setState] = useState<IUser>(userState)
  const { createUser, editUserById } = useActions()

  useEffect(() => {
    if (editUser?.id) {
      setState((prev: IUser) => ({ ...prev, ...editUser }))
      if (state?.legalData && !state.legalData?.userId) {
        setState((prev: IUser) => ({
          ...prev,
          legalData: { ...prev.legalData, userId: prev.id },
        }))
      }
    }

    return () => {
      setState(userState)
    }
  }, [editUser])

  const saveHandler = (): void => {
    if (state.id) {
      editUserById(state)
    } else {
      UsersService.createUser(state)
        .then(res => {
          createUser(res.data)
          setState((prev: IUser) => ({
            ...prev,
            id: res.data.id,
            is_admin: res.data.is_admin,
            is_active: res.data.is_active,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            phone: res.data.phone,
            email: res.data.email,
            parentId: res.data.parentId,
          }))
          toast.success(`Пользователь создан`)
        })
        .catch(error => {
          if (error?.data?.message) {
            toast.error(`${error?.data?.message}`)
          } else {
            toast.error(`${error?.statusText}`)
          }
        })
    }
  }

  const handleCancel = (): void => {
    setEditState(null)
  }

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <UserData state={state} setState={setState} />
        </Grid>
        <Grid item xs={8}>
          {state?.is_admin && state.id && state.is_legal ? (
            <>
              <LegalData state={state} setState={setState} />
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Row>
        <Button onClick={saveHandler} variant='text'>
          Сохранить
        </Button>
        <Button onClick={handleCancel} color='error' variant='text'>
          Назад
        </Button>
      </Row>
    </Wrapper>
  )
}

export default CreateUser
