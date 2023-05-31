import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import { useActions } from 'hooks/useActions'

import { ICategory } from 'dto/products.dto'
import { useNavigate } from 'react-router'

const ITEM_HEIGHT = 48

interface IProps {
  item: ICategory | undefined | null
}

const CategoryMenu: React.FC<IProps> = ({ item }) => {
  const navigate = useNavigate()
  const { deleteCategoryById } = useActions()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    if (typeof item?.id === 'number') {
      deleteCategoryById(item.id)
      setAnchorEl(null)
    }
  }

  const handleEdit = () => {
    navigate('create_category', { state: { category: item } })
  }
  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            /* width: '20ch', */
            borderRadius: '15px',
            padding: '8px',
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            borderRadius: '6px',
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            borderRadius: '6px',
            color: 'rgb(255, 72, 66)',
          }}
        >
          <ListItemIcon>
            <DeleteForeverIcon
              sx={{
                color: 'rgb(255, 72, 66)',
              }}
            />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default CategoryMenu
