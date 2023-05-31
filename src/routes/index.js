import { useRoutes } from 'react-router-dom'

// routes
/* import MainRoutes from './MainRoutes'; */
import AuthRoutes from './AuthRoutes'
import MainRoutes from './MainRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([AuthRoutes, MainRoutes])
}
