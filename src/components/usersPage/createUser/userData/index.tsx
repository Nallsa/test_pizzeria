import { ChangeEvent, FC } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { IUser } from 'dto/users.dto'
import { ICreateUserProps } from '../index'
import { Column, Label } from '../Styles.elements'

const UserData: FC<ICreateUserProps> = ({ state, setState }) => {
  const handleChangeSelect = (event: SelectChangeEvent): void => {
    if (event.target.value === 'admin') {
      setState((prev: ICreateUserProps) => ({ ...prev, is_admin: true }))
    }
    if (event.target.value === 'manager') {
      setState((prev: ICreateUserProps) => ({ ...prev, is_admin: false }))
    }
    if (event.target.value === 'active') {
      setState((prev: ICreateUserProps) => ({ ...prev, is_active: true }))
    }
    if (event.target.value === 'deActive') {
      setState((prev: ICreateUserProps) => ({ ...prev, is_active: false }))
    }
    if (event.target.value === 'noLegal') {
      setState((prev: ICreateUserProps) => ({ ...prev, is_legal: false }))
    }
    if (event.target.value === 'legal') {
      setState((prev: ICreateUserProps) => ({ ...prev, is_legal: true }))
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IUser) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Column>
      <Label>Данные пользователя</Label>
      <FormControl>
        <InputLabel id='demo-simple-select-helper-label'>
          Тип учётной записи
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state?.is_admin ? 'admin' : 'manager'}
          label='Тип учётной записи'
          onChange={handleChangeSelect}
          size='small'
        >
          <MenuItem value={'admin'}>Администратор</MenuItem>
          <MenuItem value={'manager'}>Менеджер</MenuItem>
        </Select>
      </FormControl>
      {state.is_admin && (
        <FormControl>
          <InputLabel id='demo-simple-select-helper-label'>Юр.лицо</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={state?.is_legal ? 'legal' : 'noLegal'}
            label='Юр.лицо'
            onChange={handleChangeSelect}
            size='small'
          >
            <MenuItem value={'legal'}>Да</MenuItem>
            <MenuItem value={'noLegal'}>Нет</MenuItem>
          </Select>
        </FormControl>
      )}
      <TextField
        id='first_name'
        name='first_name'
        label='Имя'
        variant='outlined'
        size='small'
        value={state?.first_name}
        onChange={onChangeHandler}
      />
      <TextField
        id='last_name'
        name='last_name'
        label='Фамилия'
        variant='outlined'
        size='small'
        value={state?.last_name ?? ''}
        onChange={onChangeHandler}
      />
      <TextField
        id='phone'
        name='phone'
        label='Телефон'
        variant='outlined'
        size='small'
        value={state?.phone ?? ''}
        onChange={onChangeHandler}
      />
      <TextField
        id='email'
        name='email'
        label='email'
        variant='outlined'
        size='small'
        value={state?.email ?? ''}
        onChange={onChangeHandler}
      />
      <TextField
        id='password'
        name='password'
        label='Пароль'
        variant='outlined'
        size='small'
        value={state?.password ?? ''}
        onChange={onChangeHandler}
      />
      <FormControl>
        <InputLabel id='demo-simple-select-helper-label'>
          Состояние учётной записи
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state?.is_active ? 'active' : 'deActive'}
          label='Состояние учётной записи'
          onChange={handleChangeSelect}
          size='small'
        >
          <MenuItem value={'active'}>Активен</MenuItem>
          <MenuItem value={'deActive'}>Отключен</MenuItem>
        </Select>
      </FormControl>
    </Column>
  )
}

export default UserData
