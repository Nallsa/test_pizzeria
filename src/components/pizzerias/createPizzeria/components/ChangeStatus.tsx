import { FC } from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPizzeria } from 'dto/pizzerias.dto';

interface IProps {
	state: any
	setState: Function
}

const ChangeStatus: FC<IProps> = ({ state, setState }) => {

	const handleChangeSelect = (event: SelectChangeEvent): void => {
		setState((prev: IPizzeria) => ({ ...prev, is_active: JSON.parse(event.target.value)}))
	};

	return (
		<div>
			<FormControl fullWidth sx={{marginTop: '5px', marginBottom: '5px'}}>
				<InputLabel id="demo-simple-select-helper-label">Активность</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={`${state?.is_active}`}
					onChange={handleChangeSelect}
					label="Активность"
					size="small"
			>
				<MenuItem value={`${true}`}>Работает</MenuItem>
				<MenuItem value={`${false}`}>Закрыта</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}

export default ChangeStatus