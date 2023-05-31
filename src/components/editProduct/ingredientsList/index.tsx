import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { RootState } from 'dataStore/state'
import { IngredientsProp } from 'dto/products.dto'
import { useActions } from 'hooks/useActions'
import { Input, Label } from './Form.elements'

interface IProps {
  state: IngredientsProp[]
  setState: any
}

/* id: number;
	weight_s: number;
	weight_l: number;
	weight_xl: number; */

const IngredientsList: React.FC<IProps> = ({ state, setState }) => {
  const { ingredients } = useSelector((state: RootState) => state.products)
  const { getAllIngredients } = useActions()

  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([])

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedIngredients(value.map((el: any) => el))
    setState((prev: IngredientsProp[]) => ({
      ...prev,
      ingredients: value.map((el: any) => ({
        id: el.id,
        weight_s: null,
        weight_l: null,
        weight_xl: null,
      })),
    }))
  }

  useEffect(() => {
    if (ingredients.length === 0) {
      getAllIngredients()
    }
    if (state.length > 0) {
      setSelectedIngredients(
        state.map(el => ingredients.filter(i => i.id === el.id)).flat()
      )
    }
  }, [ingredients, state])

  return (
    <Input>
      <Label>Ингредиенты</Label>
      <Autocomplete
        multiple
        size='small'
        id='category-outlined'
        options={ingredients}
        getOptionLabel={option => option.title}
        filterSelectedOptions
        value={selectedIngredients}
        onChange={handleChangeMultiple}
        renderInput={params => <TextField {...params} />}
      />
    </Input>
  )
}

export default IngredientsList
