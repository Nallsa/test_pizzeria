// assets
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined'

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'products',
  title: 'Продукты',
  type: 'group',
  children: [
    {
      id: 'ingredients',
      title: 'Ингредиенты',
      type: 'item',
      url: '/ingredients',
      icon: ExtensionOutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: 'products',
      title: 'Товары',
      type: 'item',
      url: '/products',
      icon: LocalPizzaOutlinedIcon,
      breadcrumbs: false,
    },
    /* {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons.TbWindmill,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        } */
  ],
}

export default utilities
