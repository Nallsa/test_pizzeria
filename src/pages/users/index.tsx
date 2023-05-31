import CreateUser from 'components/usersPage/createUser'
import UsersTable from 'components/usersPage/usersTable'
import { IUser } from 'dto/users.dto'
import { useActions } from 'hooks/useActions'
import { FC, useEffect, useState } from 'react'

const Users: FC = () => {
  const { getAllUsers } = useActions()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [editData, setEditData] = useState<IUser | null>(null)

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      {editData ? (
        <CreateUser editUser={editData} setEditState={setEditData} />
      ) : (
        <>
          <UsersTable setEditState={setEditData} />
        </>
      )}
    </>
  )
}

export default Users
