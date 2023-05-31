import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { Input, Label, Wrapper } from './Meta.elements'

import { IPromo } from 'dto/pagesData.dto'
import { ICategory, IIngredient, IProduct } from 'dto/products.dto'

interface IProp {
  setState: Function
  state: IProduct | IIngredient | ICategory | IPromo
}

const EditMeta: React.FC<IProp> = ({ state, setState }) => {
  interface IChangeProp {
    target: {
      name: string
      value: string
    }
  }

  const handleChange = (e: IChangeProp): void => {
    setState((prev: IProduct | IIngredient | ICategory | IPromo) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Wrapper>
      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Заголовок</Label>
        </Tooltip>
        <TextField
          name='meta_title'
          id='meta_title'
          value={state?.meta_title || ''}
          size='small'
          fullWidth
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Описание</Label>
        </Tooltip>
        <TextField
          name='meta_description'
          id='meta_description'
          value={state?.meta_description || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Ключевые слова</Label>
        </Tooltip>
        <TextField
          name='meta_keywords'
          id='meta_keywords'
          value={state?.meta_keywords || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </Input>

      <Input>
        <Tooltip title='Рекомендации по заполнению МЕТА-данных можно посмотреть в разделе документации'>
          <Label>Поисковый робот</Label>
        </Tooltip>
        <TextField
          name='meta_robots'
          id='meta_robots'
          value={state?.meta_robots || ''}
          size='small'
          fullWidth
          onChange={handleChange}
        />
      </Input>
    </Wrapper>
  )
}

export default EditMeta
