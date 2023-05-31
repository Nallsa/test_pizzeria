import { ChangeEvent, FC } from 'react'

import TextField from '@mui/material/TextField'

import { Button } from '@mui/material'
import { IUser } from 'dto/users.dto'
import { useActions } from 'hooks/useActions'
import { ICreateUserProps } from '../index'
import { Column, Label } from '../Styles.elements'

const LegalData: FC<ICreateUserProps> = ({ state, setState }) => {
  const { createLegalData, editLegalData } = useActions()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IUser) => ({
      ...prev,
      legalData: { ...prev.legalData, [e.target.name]: e.target.value },
    }))
  }

  const saveHandler = (): void => {
    if (state?.legalData?.id) {
      editLegalData(state.legalData)
    } else {
      createLegalData(state.legalData)
    }
  }

  return (
    <Column>
      <Label>Юридические данные</Label>
      <TextField
        id='legalName'
        name='legalName'
        label='Название юридического лица'
        variant='outlined'
        size='small'
        value={state?.legalData?.legalName}
        onChange={onChangeHandler}
      />
      <TextField
        id='identificationNumber'
        name='identificationNumber'
        label='ИНН'
        variant='outlined'
        size='small'
        value={state?.legalData?.identificationNumber}
        onChange={onChangeHandler}
      />
      <TextField
        id='ogrn'
        name='ogrn'
        label='ОГРН/ОГРНИП'
        variant='outlined'
        size='small'
        value={state?.legalData?.ogrn}
        onChange={onChangeHandler}
      />
      <TextField
        id='legalAddress'
        name='legalAddress'
        label='Юридический адрес'
        variant='outlined'
        size='small'
        value={state?.legalData?.legalAddress}
        onChange={onChangeHandler}
      />
      <TextField
        id='phone'
        name='phone'
        label='Номер телефона'
        variant='outlined'
        size='small'
        value={state?.legalData?.phone}
        onChange={onChangeHandler}
      />
      <TextField
        id='email'
        name='email'
        label='email'
        variant='outlined'
        size='small'
        value={state?.legalData?.email}
        onChange={onChangeHandler}
      />
      <Button onClick={saveHandler} variant='text'>
        Сохранить
      </Button>
    </Column>
  )
}

export default LegalData
