// assets
import DvrIcon from '@mui/icons-material/Dvr'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import StorefrontIcon from '@mui/icons-material/Storefront'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
	id: 'pages',
	title: 'Страницы',
  type: 'group',
	children: [
	{
      id: 'pages',
      title: 'Страницы',
      type: 'item',
      url: '/pages',
      icon: MenuBookOutlinedIcon,
      breadcrumbs: false,
		},
		{
      id: 'pizzerias',
      title: 'Пиццерии',
      type: 'item',
      url: '/pizzerias',
      icon: StorefrontIcon,
      breadcrumbs: false,
    },

    {
      id: 'users',
      title: 'Пользователи',
      type: 'item',
      url: '/users',
      icon: GroupAddOutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: 'questions',
      title: 'Запросы',
      type: 'item',
      url: '/questions',
      icon: BallotOutlinedIcon,
      breadcrumbs: false,
    },
    // {
    //   id: 'sample-page',
    //   title: 'Sample Page',
    //   type: 'item',
    //   url: '/',
    //   icon: DvrIcon,
    //   breadcrumbs: false,
    // },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: '/docs',
    //   icon: HelpOutlineIcon,
    //   /* external: true,
    //         target: true */
    // },
    {
      id: 'settings',
      title: 'Настройки',
      type: 'item',
      url: '/settings',
      icon: SettingsOutlinedIcon,
      /* external: true,
            target: true */
    },
  ],
}

export default other
