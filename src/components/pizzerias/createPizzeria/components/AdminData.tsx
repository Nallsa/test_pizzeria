import { FC, ChangeEvent, useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { RootState } from 'dataStore/state'
import { useActions } from 'hooks/useActions'
import { useSelector } from 'react-redux'
import { IPizzeria } from 'dto/pizzerias.dto'

interface IProps {
  state: any
  setState: Function
}

const AdminData: FC<IProps> = ({ state, setState }) => {
  const { getAllUsers } = useActions()
  const { users } = useSelector((state: RootState) => state.users)

  const handleChangeSelect = (event: SelectChangeEvent): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      ownerId: Number(event.target.value),
    }))
  }

  useEffect(() => {
    if (!users || users.length === 0) {
      getAllUsers()
    }
  }, [users])

  const admins = users?.filter(
    user => user?.is_admin && user?.is_active && user?.is_legal
  )

  return (
    <FormControl fullWidth sx={{ marginTop: '5px', marginBottom: '5px' }}>
      <InputLabel id='demo-simple-select-helper-label'>
        Администратор
      </InputLabel>
      <Select
        labelId='demo-simple-select-helper-label'
        id='demo-simple-select-helper'
        value={`${state?.ownerId}`}
        onChange={handleChangeSelect}
        label='Администратор'
        size='small'
      >
        {admins?.map(admin => (
          <MenuItem
            value={`${admin?.id}`}
            key={admin?.id}
          >{`${admin?.first_name} ${admin?.last_name}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AdminData
