// assets
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Аналитика',
  type: 'group',
  children: [
    {
      id: 'analytic',
      title: 'Аналитика',
      type: 'item',
      url: '/',
      icon: DashboardOutlinedIcon,
      breadcrumbs: false,
    }
  ],
}
/* const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
}; */

export default dashboard
