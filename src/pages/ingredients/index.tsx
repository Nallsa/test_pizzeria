import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Loadable from 'components/Loadable'

/* import IngredientCard from 'components/ingredients/ingredientCard' */
import { RootState } from 'dataStore/state'
import { useActions } from 'hooks/useActions'

const IngredientCard = Loadable(
  lazy(() => import('components/ingredients/ingredientCard'))
)

const Ingredients: React.FC = () => {
  const navigate = useNavigate()
  const { getAllIngredients } = useActions()
  const { ingredients } = useSelector((state: RootState) => state.products)
  const [nameFilter, setNameFilter] = useState<string>('')
  const [additionFilter, setAdditionFilter] = useState<boolean | null>(null)

  const handleCreateIngredient = (): void => {
    navigate('create_ingredient')
  }

  useEffect(() => {
    getAllIngredients()
  }, [])

  const handleAdditionFilter = (e: any): void => {
    e.target.name === 'all' && setAdditionFilter(null)
    e.target.name === 'ingredient' && setAdditionFilter(false)
    e.target.name === 'not' && setAdditionFilter(true)
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          /* sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: '#f0f2f5',
            paddingBottom: 0.5,
            paddingTop: 0.5,
          }} */
        >
          <ButtonGroup
            /* size="small" */ aria-label='small button group'
            sx={{ margin: '0px 10px 10px 0px', flexWrap: 'wrap' }}
          >
            <Button
              onClick={handleAdditionFilter}
              name='all'
              key='one'
              variant={additionFilter === null ? 'contained' : 'outlined'}
            >
              Все ({ingredients.length})
            </Button>
            <Button
              onClick={handleAdditionFilter}
              name='ingredient'
              key='two'
              variant={additionFilter === false ? 'contained' : 'outlined'}
            >
              Ингредиенты
            </Button>
            <Button
              onClick={handleAdditionFilter}
              name='not'
              key='three'
              variant={additionFilter === true ? 'contained' : 'outlined'}
            >
              Добавки ({ingredients.filter(el => el.addition).length})
            </Button>
          </ButtonGroup>

          <Button
            /* size="small" */
            variant='outlined'
            startIcon={<AddCircleOutlineIcon />}
            sx={{ margin: '0 10px 0px 0' }}
            onClick={handleCreateIngredient}
          >
            добавить ингредиент
          </Button>

          <TextField
            sx={theme => ({
              [theme.breakpoints.down('sm')]: {
                margin: '10px 0 0 0',
              },
            })}
            size='small'
            id='outlined-basic'
            label='Поиск ингредиента'
            variant='outlined'
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
        </Grid>
        {ingredients
          ?.filter(el => {
            if (additionFilter === null) {
              return el
            } else {
              return el.addition === additionFilter
            }
          })
          .filter(el =>
            el.title.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .sort((a, b) => {
            var textA = a.title.toUpperCase()
            var textB = b.title.toUpperCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
          })
          .map((ingredient, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <IngredientCard ingredient={ingredient} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default Ingredients
