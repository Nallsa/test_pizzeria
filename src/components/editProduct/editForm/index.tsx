import ScaleIcon from '@mui/icons-material/Scale'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { ChangeEvent, lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';

import Loadable from '../../Loadable'
import { Input, InputRow, Label, Options } from './Form.elements'
/* import Editor from '../../editor' */

import { RootState } from 'dataStore/state'
import { ICategory, IProduct } from 'dto/products.dto'
import { useActions } from 'hooks/useActions'

interface IProp {
  setProductState: Function
  productState: IProduct
}

const Editor = Loadable(lazy(() => import('../../editor')))

const EditForm: React.FC<IProp> = ({ productState, setProductState }) => {
  const { getAllCategory } = useActions()
  const { categories } = useSelector((state: RootState) => state.products)
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  )

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedCategory(value)
    setProductState((prev: IProduct) => ({ ...prev, categories: value.id }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductState((prev: IProduct) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // const handleChangeText = (value: any): void => {
  //   setProductState((prev: IProduct) => ({ ...prev, description: value }))
  // }

	const handleChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
    const data = productState?.size?.map(el => {
      if (el.name === e.target.name) {
        return { ...el, [e.target.id]: e.target.value }
      }
      return el
    })
    setProductState((prev: IProduct) => ({ ...prev, size: data }))
  }

  const handleChangeSingleSize = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductState((prev: IProduct) => ({
      ...prev,
      single_size: e.target.value,
    }))
  }

  const handleChangeProductType = (event: SelectChangeEvent) => {
    event.target.value === '1' &&
      setProductState((prev: IProduct) => ({ ...prev, product_type: true }))
    event.target.value === '0' &&
      setProductState((prev: IProduct) => ({ ...prev, product_type: false }))
  }

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategory()
    }
    if (productState.categories) {
      setSelectedCategory(
        categories.filter(el => el.id === productState.categories)[0]
      )
    }
  }, [productState])

  return (
    <div>
      <InputRow>
        <Input>
          <Label>Название</Label>
          <TextField
            name='title'
            id='name'
            value={productState?.title || ''}
            size='small'
            fullWidth
            onChange={handleChange}
          />
        </Input>
        <Input style={{ width: '30%' }}>
          <Label>Тип товара</Label>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={productState?.product_type ? '1' : '0'}
            size='small'
            onChange={handleChangeProductType}
          >
            <MenuItem value={'1'}>Пицца</MenuItem>
            <MenuItem value={'0'}>Другое</MenuItem>
          </Select>
        </Input>
      </InputRow>

			<InputRow>
				<Input>
					<Label>Категория</Label>
					<Autocomplete
						size='small'
						id='category-outlined'
						options={categories}
						getOptionLabel={option => option.title}
						filterSelectedOptions
						value={selectedCategory}
						onChange={handleChangeMultiple}
						renderInput={params => <TextField {...params} />}
					/>
				</Input>
				{/* <Input style={{ width: '40%' }}>
					<Label>Артикул</Label>
						<TextField
							name='article'
							id='article'
							value={productState?.article || ''}
							size='small'
							fullWidth
							onChange={handleChange}
						/>
				</Input> */}
			</InputRow>

      <Input>
        <Label>Описание</Label>
				{/* <Editor setState={handleChangeText} state={productState.description} /> */}
				<TextField
          name='description'
          id='description'
          value={productState?.description || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </Input>

      {productState.product_type ? (
        <>
          <Label>Размеры</Label>
          <Options>
            <TextField
              id='s-input-with-icon-textfield'
              size='small'
              label='Размер'
              disabled
              sx={{ width: '90px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>S</InputAdornment>
                ),
              }}
            />

            <TextField
              size='small'
              label='Вес'
              name='S'
              value={
                productState?.size?.filter(el => el.name === 'S')[0].weight
              }
              id='weight'
              onChange={handleChangeSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ScaleIcon />
                  </InputAdornment>
                ),
              }}
						/>

            <TextField
              size='small'
              label='Артикул'
              name='S'
              value={
                productState?.size?.filter(el => el.name === 'S')[0].article
              }
              id='article'
              onChange={handleChangeSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IntegrationInstructionsOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Options>

          <Options>
            <TextField
              id='l-input-with-icon-textfield'
              size='small'
              label='Размер'
              disabled
              sx={{ width: '90px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>L</InputAdornment>
                ),
              }}
            />

            <TextField
              size='small'
              name='L'
              id='weight'
              label='Вес'
              value={
                productState?.size?.filter(el => el.name === 'L')[0].weight
              }
              onChange={handleChangeSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ScaleIcon />
                  </InputAdornment>
                ),
              }}
						/>
						<TextField
              size='small'
              label='Артикул'
              name='L'
              value={
                productState?.size?.filter(el => el.name === 'L')[0].article
              }
              id='article'
              onChange={handleChangeSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IntegrationInstructionsOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Options>

          <Options>
            <TextField
              id='xl-input-with-icon-textfield'
              size='small'
              label='Размер'
              disabled
              sx={{ width: '90px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>XL</InputAdornment>
                ),
              }}
            />

            <TextField
              size='small'
              name='XL'
              id='weight'
              label='Вес'
              value={
                productState?.size?.filter(el => el.name === 'XL')[0].weight
              }
              onChange={handleChangeSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ScaleIcon />
                  </InputAdornment>
                ),
              }}
						/>
						<TextField
              size='small'
              label='Артикул'
              name='XL'
              value={
                productState?.size?.filter(el => el.name === 'XL')[0].article
              }
              id='article'
              onChange={handleChangeSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IntegrationInstructionsOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Options>
        </>
      ) : (
        <>
          <Label>Размер или объём</Label>
          <Options>
            <TextField
              size='small'
              name='size'
              label='Количество'
              value={productState?.single_size ?? ''}
              onChange={handleChangeSingleSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ScaleIcon />
                  </InputAdornment>
                ),
              }}
						/>
						<TextField
							name='article'
							id='article'
							label='Артикул'
							value={productState?.article || ''}
							size='small'
							fullWidth
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<IntegrationInstructionsOutlinedIcon />
									</InputAdornment>
								),
							}}
						/>
          </Options>
        </>
      )}
    </div>
  )
}

export default EditForm
