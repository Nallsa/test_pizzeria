import { FC } from 'react'
import { useSelector } from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Button } from '@mui/material'
import { RootState } from 'dataStore/state'
import { userState } from '../createUser'
import { Wrapper } from './Styles.elements'

interface IProps {
  setEditState: Function
}

const UsersTable: FC<IProps> = ({ setEditState }) => {
  const { users } = useSelector((state: RootState) => state.users)
  return (
    <Wrapper>
      <Button onClick={() => setEditState(userState)} variant='text'>
        Создать пользователя
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align='right'>Телефон</TableCell>
              <TableCell align='right'>email</TableCell>
              <TableCell align='right'>Тип</TableCell>
              <TableCell align='right'>Статус</TableCell>
              <TableCell align='right'>Юр.лицо</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(user => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => setEditState(user)}
                hover
              >
                <TableCell component='th' scope='row'>
                  {user?.first_name} {user?.last_name}
                </TableCell>
                <TableCell align='right'>{user.phone}</TableCell>
                <TableCell align='right'>{user.email}</TableCell>
                <TableCell align='right'>
                  {user.is_admin ? 'Админ' : 'Менеджер'}
                </TableCell>
                <TableCell align='right'>
                  {user.is_active ? 'Активен' : 'Отключен'}
                </TableCell>
                <TableCell align='right'>
                  {user.is_legal ? 'Есть' : 'Нет'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default UsersTable
