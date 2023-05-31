import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import EditCard from 'components/editProduct/editCard'
import EditMeta from 'components/editProduct/editMeta'
import EditOptions from 'components/editProduct/editOptions'
import FileInput from 'components/editProduct/fileInput'
import { IIngredient, IUploadImg } from 'dto/products.dto'

import EditFormIngredient from 'components/ingredients/editFormIngredient'

import { useActions } from 'hooks/useActions'

import { Input, Label, Row, Col } from './Styles.elements'

const initialState: IIngredient = {
	id: null,
	article: null,
	title: '',
	description: null,
	img_url: null,
	meta_title: null,
	meta_description: null,
	meta_keywords: null,
	meta_robots: null,
	price_type: 'kg',
	price: null,
	is_active: true,
	addition: false,
	add_weight: { weight_s: null, weight_l: null, weight_xl: null },
	articles: { weight_s: null, weight_l: null, weight_xl: null },
}

const CreateIngredient: React.FC = () => {
  const location = useLocation()
  const state = location?.state as any
  const ingredient = state?.ingredient as any | null
  const navigate = useNavigate()
	const { createIngredient, editIngredientById } = useActions()


  const [ingredientState, setIngredientState] = useState<IIngredient>(initialState)

  useEffect(() => {
    if (ingredient) {
      for (let [key, value] of Object.entries(ingredient)) {
        /* if (key === 'add_weight') {
					setIngredientState((prev:IIngredient)=> ({...prev, [key]: JSON.parse(value)}))
				} */
        setIngredientState((prev: IIngredient) => ({ ...prev, [key]: value }))
      }
    }
  }, [ingredient])

  const handleChangeWeight = (e: any): void => {
    const newData = {
      ...ingredientState.add_weight,
      [e.target.name]: e.target.value,
    }
    setIngredientState((prev: IIngredient) => ({
      ...prev,
      add_weight: newData,
    }))
	}

  const handleChangeArticles = (e: any): void => {
    const newData = {
      ...ingredientState.articles,
      [e.target.name]: e.target.value,
    }
    setIngredientState((prev: IIngredient) => ({
      ...prev,
      articles: newData,
    }))
  }

  const handleSave = () => {
    const formData = new FormData()
    ingredientState?.id &&
      formData.append('id', JSON.stringify(ingredientState.id!))
    formData.append('title', JSON.stringify(ingredientState.title))
    formData.append('article', JSON.stringify(ingredientState.article))
    formData.append('articles', JSON.stringify(ingredientState.articles))
    formData.append('description', JSON.stringify(ingredientState.description))
    formData.append('img_url', ingredientState.img_url!)
    formData.append('meta_title', JSON.stringify(ingredientState.meta_title))
    formData.append(
      'meta_description',
      JSON.stringify(ingredientState.meta_description)
    )
    formData.append(
      'meta_keywords',
      JSON.stringify(ingredientState.meta_keywords)
    )
    formData.append('meta_robots', JSON.stringify(ingredientState.meta_robots))
    formData.append('price_type', JSON.stringify(ingredientState.price_type))
    formData.append('price', JSON.stringify(ingredientState.price!))
    formData.append('is_active', JSON.stringify(ingredientState.is_active!))
    formData.append('addition', JSON.stringify(ingredientState.addition!))
    formData.append('add_weight', JSON.stringify(ingredientState.add_weight!))
    if (ingredientState.id) {
      editIngredientById(formData)
    } else {
      createIngredient(formData)
    }
    navigate('../ingredients')
  }

  const handleSetFile = (name: string, value: IUploadImg | null): void => {
    setIngredientState((prev: IIngredient) => ({ ...prev, [name]: value }))
  }

  const handleCancel = (): void => {
    setIngredientState(initialState)
    navigate('../ingredients')
  }

  const buttonSection = (): React.ReactElement => {
    return (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          size='small'
          variant='outlined'
          startIcon={<DoDisturbOnIcon />}
          onClick={handleCancel}
          color='error'
        >
          Отмена
        </Button>
        <Button
          size='small'
          variant='outlined'
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </div>
    )
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={7}>
          <EditCard title='Информация' option={buttonSection()}>
            <EditFormIngredient
              state={ingredientState}
              setState={setIngredientState}
            />
          </EditCard>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <EditCard title='Детали'>
            <div>
              <Row>
                <EditOptions
                  active={ingredientState?.is_active}
                  setActive={setIngredientState}
                  addition={ingredientState.addition}
                  showAddition={true}
                />
                <FileInput
                  file={ingredientState?.img_url}
                  setFile={handleSetFile}
                  title='Изображение'
                  name='img_url'
                />
              </Row>
              {ingredientState?.addition && (
                <>
									<Input>
										<Row>
											<Col>
												<Label>Вес добавки</Label>
												<TextField
													size='small'
													name='weight_s'
													value={ingredientState?.add_weight?.weight_s}
													id='outlined-basic'
													label='S'
													type='number'
													variant='outlined'
													onChange={handleChangeWeight}
												/>
												<TextField
													size='small'
													name='weight_l'
													value={ingredientState?.add_weight?.weight_l}
													id='outlined-basic'
													type='number'
													label='L'
													variant='outlined'
													onChange={handleChangeWeight}
												/>
												<TextField
													size='small'
													name='weight_xl'
													type='number'
													value={ingredientState?.add_weight?.weight_xl}
													id='outlined-basic'
													label='XL'
													variant='outlined'
													onChange={handleChangeWeight}
												/>
											</Col>
											<Col>
												<Label>Артикул</Label>
												<TextField
													size='small'
													name='weight_s'
													value={ingredientState?.articles?.weight_s}
													id='outlined-basic'
													label='S'
													type='text'
													variant='outlined'
													onChange={handleChangeArticles}
												/>
												<TextField
													size='small'
													name='weight_l'
													value={ingredientState?.articles?.weight_l}
													id='outlined-basic'
													type='text'
													label='L'
													variant='outlined'
													onChange={handleChangeArticles}
												/>
												<TextField
													size='small'
													name='weight_xl'
													type='text'
													value={ingredientState?.articles?.weight_xl}
													id='outlined-basic'
													label='XL'
													variant='outlined'
													onChange={handleChangeArticles}
												/>
											</Col>
										</Row>
                  </Input>
                </>
              )}
            </div>
          </EditCard>

          <EditCard title='Мета данные' style={{ marginTop: 20 }}>
            <EditMeta setState={setIngredientState} state={ingredientState} />
          </EditCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateIngredient
