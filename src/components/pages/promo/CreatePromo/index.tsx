import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

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

import { IPromo } from 'dto/pagesData.dto'
import Editor from '../../../editor'
import EditCard from '../../../editProduct/editCard'
import EditMeta from '../../../editProduct/editMeta'
import EditOptions from '../../../editProduct/editOptions'
import FileInput from '../../../editProduct/fileInput'

import { useActions } from 'hooks/useActions'

import { RootState } from 'dataStore/state'
import { IUploadImg } from 'dto/products.dto'
import transliterate from '../../../../handlers/translit'
import { Input, Label, Row } from './Styles.elements'

interface IProps {
  setShow: Function
  editPromo: IPromo | null
  setEditPromo: Function
}

const stateData: IPromo = {
  id: null,
  title: '',
  alias: '',
  description: null,
  img_small: null,
  img_full: null,
  meta_title: null,
  meta_description: null,
  meta_keywords: null,
  meta_robots: null,
  end_at: null,
  is_active: true,
  promo_products: [],
}

const CreatePromo: React.FC<IProps> = ({
  setShow,
  editPromo,
  setEditPromo,
}) => {
  const { products } = useSelector((state: RootState) => state.products)
  const { getAllProducts, createPromo, editPromoById } = useActions()
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [showDate, setShowDate] = useState<boolean>(true)
  const [promoState, setPromoState] = useState<IPromo>(stateData)

  const handleChangeMultiple = (event: any, value: any) => {
    setSelectedProducts(value.map((el: any) => el))
    setPromoState((prev: IPromo) => ({
      ...prev,
      promo_products: value.map((el: any) => el.id),
    }))
  }

  useEffect(() => {
    if (editPromo) {
      for (let [key, value] of Object.entries(editPromo)) {
        setPromoState((prev: IPromo) => ({ ...prev, [key]: value }))
      }
      if (editPromo.end_at) {
        setShowDate(false)
      }
      setSelectedProducts(
        editPromo.promo_products
          .map(el => products.filter(i => i.id === el))
          .flat()
      )
    }
    if (products.length === 0) {
      getAllProducts()
    }
  }, [editPromo, products])

  const handleSave = () => {
    const formData = new FormData()
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
    }
    /* navigate('../ingredients') */
  }

  const handleSetFile = (name: string, value: IUploadImg | null): void => {
    setPromoState((prev: IPromo) => ({ ...prev, [name]: value }))
  }

  const handleChangeInfo = (e: any): void => {
    if (e.target.name === 'title') {
      setPromoState((prev: IPromo) => ({
        ...prev,
        title: e.target.value,
        alias: transliterate(e.target.value),
      }))
    } else {
      setPromoState((prev: IPromo) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const handleChangeDate = (newValue: Date | null) => {
    setPromoState((prev: IPromo) => ({ ...prev, end_at: newValue }))
  }
  const handleActiveDate = () => {
    if (!showDate) {
      setPromoState((prev: IPromo) => ({ ...prev, end_at: null }))
      setShowDate(true)
    } else {
      setShowDate(false)
    }
  }

  const handleChangeText = (value: any): void => {
    setPromoState((prev: IPromo) => ({ ...prev, description: value }))
  }

  const handleCancel = (): void => {
    setShow(false)
    setPromoState(stateData)
    setEditPromo(null)
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
        <Grid item xs={12} sm={12} md={6}>
          <EditCard title='Информация' option={buttonSection()}>
            <div style={{ flexDirection: 'column', width: '100%' }}>
              <Input>
                <Label>Название</Label>
                <TextField
                  name='title'
                  id='name'
                  value={promoState?.title || ''}
                  size='small'
                  fullWidth
                  onChange={handleChangeInfo}
                />
              </Input>
              <Input>
                <Label>Алиас (название на латинице)</Label>
                <TextField
                  name='alias'
                  id='alias'
                  value={promoState?.alias || ''}
                  size='small'
                  fullWidth
                  onChange={handleChangeInfo}
                />
              </Input>
              <Input>
                <Label>
                  {showDate ? 'Бесконечная акция' : 'Дата окончания акции'}
                </Label>
                <Row style={{ justifyContent: 'space-between' }}>
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={showDate}
                    onChange={handleActiveDate}
                  />
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      disabled={showDate}
                      label='Укажите дату'
                      inputFormat='DD/MM/yyyy'
                      value={promoState?.end_at || new Date()}
                      onChange={handleChangeDate}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Row>
              </Input>
              <Input>
                <Label>Описание</Label>
                <Editor
                  setState={handleChangeText}
                  state={promoState?.description}
                />
              </Input>
            </div>
          </EditCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <EditCard title='Детали'>
            <div>
              <Row>
                <EditOptions
                  active={promoState?.is_active}
                  setActive={promoState}
                  row
                />
              </Row>
              <Row>
                <FileInput
                  file={promoState?.img_small}
                  setFile={handleSetFile}
                  title='Изображение маленькое'
                  name='img_small'
                />

                <FileInput
                  file={promoState?.img_full}
                  setFile={handleSetFile}
                  title='Изображение большое'
                  name='img_full'
                />
              </Row>
            </div>
          </EditCard>

          <EditCard title='Акционные товары' style={{ marginTop: 20 }}>
            <Input>
              <Label>Товары</Label>
              <Autocomplete
                multiple
                size='small'
                id='category-outlined'
                options={products}
                getOptionLabel={option => option.title}
                filterSelectedOptions
                value={selectedProducts}
                onChange={handleChangeMultiple}
                renderInput={params => <TextField {...params} />}
              />
            </Input>
          </EditCard>

          <EditCard title='Мета данные' style={{ marginTop: 20 }}>
            <EditMeta setState={setPromoState} state={promoState} />
          </EditCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreatePromo

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
