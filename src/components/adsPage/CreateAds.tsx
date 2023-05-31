import { FC, useState } from 'react'

import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import SaveIcon from '@mui/icons-material/Save'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Switch, { SwitchProps } from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import EditCard from 'components/editProduct/editCard'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { Input, Label, ItemWrapper, Row, SwitchWrapper } from './Styles.elements'
import { IAds } from 'dto/ads.dto'
import Editor from './../editor/index';
import FileInput from 'components/editProduct/fileInput'
import { IUploadImg } from 'dto/products.dto'

const initialState: IAds = {
	title: '',
	description: '',
	img: null,
	start_at: null,
	end_at: null,
	is_active: true
}

const CreateAds: FC = () => {
	const [adsState, setAdsState] = useState<IAds>(initialState)

	const buttonSection = (): React.ReactElement => {

		const handleSave = () => {
			/* const formData = new FormData()
			promoState?.id && formData.append('id', JSON.stringify(promoState.id!))
			formData.append('title', JSON.stringify(promoState.title))
			formData.append('alias', JSON.stringify(promoState.alias))
			formData.append('description', JSON.stringify(promoState.description))
			formData.append('img_small', promoState.img_small!)
			formData.append('img_full', promoState.img_full!)
			formData.append('meta_title', JSON.stringify(promoState.meta_title))
			formData.append(
				'meta_description',
				JSON.stringify(promoState.meta_description)
			)
			formData.append('meta_keywords', JSON.stringify(promoState.meta_keywords))
			formData.append('meta_robots', JSON.stringify(promoState.meta_robots))
			formData.append('end_at', JSON.stringify(promoState.end_at!))
			formData.append('is_active', JSON.stringify(promoState.is_active!))
			formData.append(
				'promo_products',
				JSON.stringify(promoState.promo_products!)
			)
			if (promoState.id) {
				editPromoById(formData)
				setEditPromo(null)
				setShow(false)
			} else {
				createPromo(formData)
				setShow(false)
			} */
		}

		const handleCancel = (): void => {
			/* setShow(false)
			setPromoState(stateData)
			setEditPromo(null) */
		}

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

	const handleChangeText = (value: any): void => {
		setAdsState((prev: IAds) => ({ ...prev, description: value }))
	}

	const handleSetFile = (name: string, value: IUploadImg | null): void => {
    setAdsState((prev: IAds) => ({ ...prev, [name]: value }))
	}

	const handleChangeDate = (newValue: string | Date | null, type: string) => {
    setAdsState((prev: IAds) => ({ ...prev, [type]: newValue }))
  }

	const handleActive = () => {
		setAdsState((prev: IAds) => ({ ...prev, is_active: !prev.is_active }))
  }

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12} /* sm={12} md={6} */>
					<EditCard
						title='Информация'
						option={buttonSection()}
					>
						<ItemWrapper>
							<Input>
								<Label>Заголовок</Label>
								<TextField
									name='title'
									id='name'
									value={adsState?.title || ''}
									size='small'
									fullWidth
									/* onChange={handleChangeInfo} */
								/>
							</Input>

							<Input>
								<Label>Описание</Label>
								<Editor
									setState={handleChangeText}
									state={adsState?.description}
								/>
							</Input>

							<Row>
								<ItemWrapper>
									<FileInput
										file={adsState?.img}
										setFile={handleSetFile}
										title='Изображение'
										name='img'
									/>
								</ItemWrapper>
								<ItemWrapper>
									<Row>
										<SwitchWrapper>
											<Label>{adsState?.is_active ? <>Отключить объявление</> : <>Включить объявление</>}</Label>
											<IOSSwitch
													sx={{ m: 1 }}
													checked={adsState?.is_active}
													onChange={handleActive}
												/>
										</SwitchWrapper>
									</Row>

										<Row>
											<LocalizationProvider dateAdapter={AdapterMoment}>
												<MobileDatePicker
													// disabled={showDate}
													label='Укажите дату начала показа'
													inputFormat='DD/MM/yyyy'
													value={adsState?.start_at || new Date()}
													onChange={(newValue)=>handleChangeDate(newValue, 'start_at')}
												renderInput={params => <TextField {...params} />}
											/>
											<DateTimePicker
												label='Укажите дату начала показа'
												value={adsState?.start_at || new Date()}
												onChange={(newValue)=>handleChangeDate(newValue, 'start_at')}
												renderInput={(params) => <TextField {...params} />}
											/>
												<MobileDatePicker
													// disabled={showDate}
													label='Укажите дату окончания показа'
													inputFormat='DD/MM/yyyy'
													value={adsState?.end_at || new Date()}
													onChange={(newValue)=>handleChangeDate(newValue, 'end_at')}
													renderInput={params => <TextField {...params} />}
												/>
											</LocalizationProvider>
										</Row>
								</ItemWrapper>
							</Row>
						</ItemWrapper>
					</EditCard>
				</Grid>
			</Grid>
		</div>
	)
}

export default CreateAds

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: '43px',
  height: '26px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))
