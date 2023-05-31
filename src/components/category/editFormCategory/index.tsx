import { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

import Editor from '../../editor'
import { Input, Label } from './Form.elements'

import { ICategory } from 'dto/products.dto'

interface IProp {
  setState: Function
  state: ICategory
}

const EditFormCategory: React.FC<IProp> = ({ state, setState }) => {
  // const [editorState, setEditorState] = useState<any>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: ICategory) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // const handleChangeText = (value: any): void => {
  //   setEditorState(value)
  //   setState((prev: ICategory) => ({
  //     ...prev,
  //     description: JSON.stringify(editorState),
  //   }))
  // }

  return (
    <div style={{width: '100%'}}>
      <Input>
        <Label>Название</Label>
        <TextField
          name='title'
          id='name'
          value={state?.title || ''}
          size='small'
          fullWidth
          onChange={handleChange}
        />
      </Input>

      <Input>
				<Label>Описание</Label>
				<TextField
          name='description'
          id='description'
          value={state?.description || ''}
          size='small'
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
        {/* <Editor setState={handleChangeText} state={editorState} /> */}
      </Input>
    </div>
  )
}

export default EditFormCategory
