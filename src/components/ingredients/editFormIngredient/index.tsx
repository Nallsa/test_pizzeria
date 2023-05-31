import { useState } from 'react'

import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import Editor from '../../editor'
import { Input, Label, Options, Row } from './Form.elements'

import { IIngredient } from 'dto/products.dto'

const options = [
  { name: 'Цена за кг.', value: 'kg' },
  { name: 'Цена за шт.', value: 'pc' },
]

interface IProp {
  setState: Function
  state: IIngredient
}

const EditFormIngredient: React.FC<IProp> = ({ state, setState }) => {
  const [editorState, setEditorState] = useState<any>()

  interface IChangeProp {
    target: {
      name: string
      value: string
    }
  }

  const handleChange = (e: IChangeProp): void => {
    setState((prev: IIngredient) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleChangeText = (value: any): void => {
    setEditorState(value)
    setState((prev: IIngredient) => ({ ...prev, description: value }))
  }

  return (
    <div>
      <Input>
				<Label>Название</Label>
				<Row>
					<TextField
						name='title'
						id='name'
						value={state?.title || ''}
						size='small'
						fullWidth
						onChange={handleChange}
					/>
					<TextField
						name='article'
						id='article'
						label='Артикул'
						value={state?.article || ''}
						size='small'
						fullWidth
						onChange={handleChange}
					/>
				</Row>
      </Input>

      <Input>
        <Label>Описание</Label>
        <Editor setState={handleChangeText} state={editorState} />
      </Input>

      <Options>
        <Input>
          <Label>Цена</Label>
          <TextField
            name='price'
            id='name'
            value={state?.price || ''}
            size='small'
            fullWidth
            onChange={handleChange}
            type='number'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <CurrencyRubleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Input>

        <Input>
          <Label>Тип цены</Label>
          <Select
            name='price_type'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={state?.price_type || ''}
            /* label="Тип цены" */
            onChange={handleChange}
            size='small'
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Input>
      </Options>
    </div>
  )
}

export default EditFormIngredient
