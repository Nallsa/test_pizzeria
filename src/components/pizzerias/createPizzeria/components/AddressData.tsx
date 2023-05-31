import { ChangeEvent, FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { IPizzeria } from 'dto/pizzerias.dto'

import CityChoice from './CityChoice'
import StreetChoice from './StreetChoice'
import AddressChoice from './AddressChoice'

import {Wrapper, HeaderTitle, Row} from './Styles.elements'

interface IProps {
	state: IPizzeria | null
	setState: Function
	handleSave: ()=>void
	handleCancel: ()=>void
}

const AddressData: FC<IProps> = ({ state, setState, handleSave, handleCancel }) => {

	const handleChangeAddress = (
    name: string,
    value: number | string | null
  ): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }))
	}

	const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

	return (
		<Wrapper>
			<HeaderTitle>Домен точки</HeaderTitle>
				<TextField
					value={state?.name}
					name='name'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-name'
					label='Название'
					fullWidth
					variant='outlined'
				/>
			<HeaderTitle>Адрес</HeaderTitle>
			<CityChoice
				state={state?.address}
				setState={handleChangeAddress}
			/>

			<StreetChoice
				state={state?.address}
				setState={handleChangeAddress}
			/>

			<AddressChoice
				state={state?.address}
				setState={handleChangeAddress}
			/>

			<HeaderTitle>Время работы</HeaderTitle>
			<Row>
				<TextField
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					fullWidth
					id='time_open'
					label='Открытие'
					size='small'
					type='time'
					name='time_open'
					defaultValue={state?.time_open}
					onChange={handleChangeData}
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						step: 300, // 5 min
					}}
				/>
				<TextField
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					fullWidth
					id='time_close'
					label='Закрытие'
					size='small'
					type='time'
					name='time_close'
					defaultValue={state?.time_close}
					onChange={handleChangeData}
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						step: 300, // 5 min
					}}
				/>
			</Row>
			<Row>
        <Button onClick={handleSave} variant='text'>
          Сохранить
        </Button>
        <Button onClick={handleCancel} color='error' variant='text'>
          Отмена
        </Button>
      </Row>
		</Wrapper>
	)
}

export default AddressData
