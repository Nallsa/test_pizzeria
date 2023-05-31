import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'

import EditCard from 'components/editProduct/editCard'
import EditForm from 'components/editProduct/editForm'
import EditMeta from 'components/editProduct/editMeta'
import EditOptions from 'components/editProduct/editOptions'
import EditPrice from 'components/editProduct/editPrice'
import FileInput from 'components/editProduct/fileInput'
import IngredientsList from 'components/editProduct/ingredientsList'
import { IProduct } from 'dto/products.dto'
import { useActions } from 'hooks/useActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { settings } from 'ThemeStyle'
import { Row } from './Styles.elements'

const CreateProduct: React.FC = () => {
  const location = useLocation()
  const state = location?.state as any
  const product = state?.product as any | null
  const navigate = useNavigate()
  const { createProduct, editProductById } = useActions()

  const initialState: IProduct = {
    id: null,
    title: '',
    description: null,
    article: null,
    img_small: null,
    img_full: null,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    meta_robots: null,
    ingredients: [],
    size: [
      { weight: null, name: 'S', article: null },
      { weight: null, name: 'L', article: null },
      { weight: null, name: 'XL', article: null },
    ],
    price: [
      { price: null, pizzeriaId: null, name: 'S' },
      { price: null, pizzeriaId: null, name: 'L' },
      { price: null, pizzeriaId: null, name: 'XL' },
    ],
    single_size: null,
    single_price: [{ price: null, pizzeriaId: null }],
    categories: null,
    create_at: undefined,
    update_at: undefined,
    product_type: true,
    is_active: true,
  }

  const removeDuplicates = (arr: any[]) => {
    const result: any[] = []
    const duplicatesIndices: any[] = []

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current: any, index: any) => {
      if (duplicatesIndices.includes(index)) return

      result.push(current)

      // Сравниваем каждый элемент в массиве после текущего
      for (
        let comparisonIndex = index + 1;
        comparisonIndex < arr.length;
        comparisonIndex++
      ) {
        const comparison = arr[comparisonIndex]
        const currentKeys = Object.keys(current)
        const comparisonKeys = Object.keys(comparison)

        // Проверяем длину массивов
        if (currentKeys.length !== comparisonKeys.length) continue

        // Проверяем значение ключей
        const currentKeysString = currentKeys.sort().join('').toLowerCase()
        const comparisonKeysString = comparisonKeys
          .sort()
          .join('')
          .toLowerCase()
        if (currentKeysString !== comparisonKeysString) continue

        // Проверяем индексы ключей
        let valuesEqual = true
        for (let i = 0; i < currentKeys.length; i++) {
          const key = currentKeys[i]
          if (current[key] !== comparison[key]) {
            valuesEqual = false
            break
          }
        }
        if (valuesEqual) duplicatesIndices.push(comparisonIndex)
      } // Конец цикла
    })
    return result
  }

  const [productState, setProductState] = useState<IProduct>(initialState)
	const [priceArray, setPriceArray] = useState<any[]>([])

  useEffect(() => {
    if (product) {
      setPriceArray(removeDuplicates(product.price))
    }
  }, [])

  useEffect(() => {
    if (product) {
      for (let [key, value] of Object.entries(product)) {
        setProductState((prev: IProduct) => ({
          ...prev,
          [key]: value,
          price: priceArray,
        }))
      }
    }
  }, [priceArray])

  const handleSetFile = (name: string, value: any): void => {
    setProductState((prev: IProduct) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const formData = new FormData()
    productState?.id && formData.append('id', JSON.stringify(productState.id!))
    formData.append('title', JSON.stringify(productState.title))
    formData.append('description', JSON.stringify(productState.description))
    formData.append('img_small', productState.img_small!)
    formData.append('img_full', productState.img_full!)
    formData.append('meta_title', JSON.stringify(productState.meta_title))
    formData.append(
      'meta_description',
      JSON.stringify(productState.meta_description)
    )
    formData.append('meta_keywords', JSON.stringify(productState.meta_keywords))
    formData.append('meta_robots', JSON.stringify(productState.meta_robots))
    formData.append('ingredients', JSON.stringify(productState.ingredients))
    formData.append('size', JSON.stringify(productState.size))
    formData.append('single_size', JSON.stringify(productState.single_size))
    formData.append('price', JSON.stringify(productState.price))
    formData.append('single_price', JSON.stringify(productState.single_price))
    formData.append('categories', JSON.stringify(productState.categories))
    formData.append('product_type', JSON.stringify(productState.product_type))
    formData.append('is_active', JSON.stringify(productState.is_active))
    formData.append('article', JSON.stringify(productState.article))
    if (productState.id) {
      editProductById(formData)
    } else {
      createProduct(formData)
    }
    navigate('../products')
  }

  const handleCancel = (): void => {
    setProductState(initialState)
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
      <Grid
        container
        spacing={3}
        /* sx={{ maxHeight: `${settings.wrapper}vh`, overflowY: 'auto' }} */
      >
        <Grid item xs={12} md={7}>
          <EditCard title='Информация' option={buttonSection()}>
            <EditForm
              setProductState={setProductState}
              productState={productState}
            />
          </EditCard>
          <EditCard title='Цена товара в пиццерии' style={{ marginTop: 20 }}>
            <EditPrice
              setProductState={setProductState}
              productState={productState}
            />
          </EditCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <EditCard title='Детали'>
            <div>
              <EditOptions
                active={productState.is_active}
                setActive={setProductState}
              />
              <Row>
                <FileInput
                  title='Маленькое изображение'
                  name='img_small'
                  setFile={handleSetFile}
                  file={productState?.img_small}
                />

                <FileInput
                  title='Большое изображение'
                  setFile={handleSetFile}
                  name='img_full'
                  file={productState?.img_full}
                />
              </Row>
            </div>
          </EditCard>
          <EditCard title='Состав' style={{ marginTop: 20 }}>
            <IngredientsList
              state={productState.ingredients}
              setState={setProductState}
            />
          </EditCard>

          <EditCard title='Мета данные' style={{ marginTop: 20 }}>
            <EditMeta setState={setProductState} state={productState} />
          </EditCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateProduct
