import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import EditFormCategory from 'components/category/editFormCategory'
import EditCard from 'components/editProduct/editCard/index'
import EditMeta from 'components/editProduct/editMeta/index'
import FileInput from 'components/editProduct/fileInput/index'
import { ICategory, IUploadImg } from 'dto/products.dto'
import { useActions } from 'hooks/useActions'
import { settings } from 'ThemeStyle'

const CreateCategory: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location?.state as any
  const category = state?.category as any | null
  const { createCategory, editCategoryById } = useActions()
  const [categoryState, setCategoryState] = useState<ICategory>({
    id: null,
    title: '',
    description: null,
    img_url: null,
    url: null,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    meta_robots: null,
  })

  useEffect(() => {
    if (category) {
      for (let [key, value] of Object.entries(category)) {
        setCategoryState((prev: ICategory) => ({ ...prev, [key]: value }))
      }
    }
  }, [category])

  const handleSave = () => {
    const formData = new FormData()
    categoryState?.id &&
      formData.append('id', JSON.stringify(categoryState.id!))
    formData.append('title', categoryState.title!)
    formData.append('description', categoryState.description!)
    formData.append('img_url', categoryState.img_url!)
    formData.append('url', categoryState.url!)
    formData.append('meta_title', categoryState.meta_title!)
    formData.append('meta_description', categoryState.meta_description!)
    formData.append('meta_keywords', categoryState.meta_keywords!)
    formData.append('meta_robots', categoryState.meta_robots!)
    if (categoryState.id) {
      editCategoryById(formData)
    } else {
      createCategory(formData)
    }
    navigate('../products')
  }

  const handleSetFile = (name: string, value: IUploadImg | null): void => {
    setCategoryState((prev: ICategory) => ({ ...prev, [name]: value }))
  }

  const handleCancel = (): void => {
    setCategoryState({
      id: null,
      title: '',
      description: null,
      img_url: null,
      url: null,
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      meta_robots: null,
    })
    navigate('../products')
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
        <Grid item xs={12} md={7}>
          <EditCard title='Информация' option={buttonSection()}>
            <EditFormCategory
              state={categoryState}
              setState={setCategoryState}
            />
          </EditCard>
        </Grid>
        <Grid item xs={12} md={5} sx={{ maxHeight: `${settings.wrapper}vh` }}>
          <EditCard title='Детали'>
            {/* <EditOptions
							active={ingredientState?.is_active}
							setActive={setIngredientState}
							addition={ingredientState.addition}
							showAddition={true}
						/> */}

            <FileInput
              file={categoryState?.img_url}
              setFile={handleSetFile}
              title='Изображение'
              name='img_url'
            />
          </EditCard>

          <EditCard title='Мета данные' style={{ marginTop: 20 }}>
            <EditMeta setState={setCategoryState} state={categoryState} />
          </EditCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateCategory
