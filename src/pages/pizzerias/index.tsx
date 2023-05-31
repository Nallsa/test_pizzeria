import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from 'hooks/useActions'

import Button from '@mui/material/Button'

import CreatePizzeria from 'components/pizzerias/createPizzeria'
import PizzeriaCard from 'components/pizzerias/pizzeriaCard'

import { RootState } from 'dataStore/state'
import { IPizzeria } from 'dto/pizzerias.dto'

const Pizzerias: FC = () => {
  const { getAllPizzerias } = useActions()
  const { pizzerias } = useSelector((state: RootState) => state.pizzerias)
  const [showCreatePage, setShowCreatePage] = useState<boolean>(false)
  const [selectedPizzeria, setSelectedPizzeria] = useState<IPizzeria | null>(
    null
  )
  const handleShowCreatePage = (): void => {
    setSelectedPizzeria(null)
    setShowCreatePage(!showCreatePage)
  }

  const handleEditPage = (): void => {
    setShowCreatePage(!showCreatePage)
  }

  const fetchHandler = async () => {
    if (pizzerias.length === 0) {
      const query = await getAllPizzerias()
      return query
    }
    return null
  }

  useEffect(() => {
    fetchHandler()
  }, [])

  const handleEdit = (data: IPizzeria): void => {
    setShowCreatePage(true)
    setSelectedPizzeria(data)
  }

  return (
    <div>
      {showCreatePage ? (
        <CreatePizzeria showForm={handleEditPage} editData={selectedPizzeria} />
      ) : (
        <>
          <Button variant='outlined' onClick={handleShowCreatePage}>
            + Создать
          </Button>
          {pizzerias?.map((el, index) => (
            <div key={index}>
              <PizzeriaCard pizzeria={el} edit={handleEdit} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Pizzerias
