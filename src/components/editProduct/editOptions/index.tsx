import React from 'react'

import { styled } from '@mui/material/styles'
import Switch, { SwitchProps } from '@mui/material/Switch'

import { IIngredient, IProduct } from 'dto/products.dto'
import { ItemWrapper, Wrapper } from './EditOptions.elements'

interface IProps {
  active: boolean
  setActive: any
  addition?: boolean
  showAddition?: boolean
  row?: boolean
}

const EditOptions: React.FC<IProps> = ({
  active,
  setActive,
  addition,
  showAddition,
  row = false,
}) => {
  const handleSetActive = (): void => {
    setActive((prev: IProduct | IIngredient) => ({
      ...prev,
      is_active: !active,
    }))
  }

  const handleSetActiveAddition = (): void => {
    setActive((prev: IIngredient) => ({ ...prev, addition: !addition }))
  }

  return (
    <Wrapper>
      <ItemWrapper style={{ flexDirection: row ? 'row' : 'column' }}>
        {active ? <>Опубликован</> : <>Снят с публикации</>}
        <IOSSwitch sx={{ m: 1 }} checked={active} onChange={handleSetActive} />
      </ItemWrapper>
      {showAddition && (
        <ItemWrapper style={{ flexDirection: row ? 'row' : 'column' }}>
          Добавка
          <IOSSwitch
            sx={{ m: 1 }}
            checked={addition}
            onChange={handleSetActiveAddition}
          />
        </ItemWrapper>
      )}
    </Wrapper>
  )
}

export default EditOptions

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
