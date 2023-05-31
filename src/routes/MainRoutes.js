import { lazy } from 'react'
/* import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout'; */

import Loadable from 'components/Loadable'

import MainLayout from '../layout/MainLayout'
import Questions from 'pages/questions'
import Statistics from 'pages/statistics/'
/*import Products from 'pages/products/'
import Category from 'pages/category/'
import Ingredients from 'pages/ingredients/' */
import CreateIngredient from 'pages/ingredients/CreateIngredient'
import CreateCategory from 'pages/products/CreateCategory'
import CreateProduct from 'pages/products/CreateProduct'

/* const Products = lazy(() => import('pages/products/'))
const Category = lazy(() => import('pages/category/')) */

// const Statistics = Loadable(lazy(() => import('pages/statistics/')))
const Products = Loadable(lazy(() => import('pages/products/')))
const Pages = Loadable(lazy(() => import('pages/pages')))
const Ingredients = Loadable(lazy(() => import('pages/ingredients/')))
const Profile = Loadable(lazy(() => import('pages/profile/')))
const Pizzerias = Loadable(lazy(() => import('pages/pizzerias/')))
const Settings = Loadable(lazy(() => import('pages/settings/')))
const Users = Loadable(lazy(() => import('pages/users')))

// const Questions = Loadable(lazy(() => import('pages/questions')))

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Statistics />,
    },
    {
      path: '/pizzerias',
      element: <Pizzerias />,
    },
    {
      path: '/users',
      element: <Users />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: 'products',
      element: <Products />,
    },
    {
      path: 'products/create_product',
      element: <CreateProduct />,
    },
    {
      path: 'products/create_category',
      element: <CreateCategory />,
    },
    {
      path: 'pages',
      element: <Pages />,
    },
    {
      path: 'ingredients',
      element: <Ingredients />,
    },
    {
      path: 'ingredients/create_ingredient',
      element: <CreateIngredient />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
    {
      path: '/questions',
      element: <Questions />,
    },
  ],
}

export default MainRoutes

/* path: '/:pageName',
	element: <MainLayout />,
	children: [
		{
			element: <DashboardLayout />,
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
				{
					path: 'reports',
					element: <Reports />,
				},
				{
					path: 'payments',
					element: <Payments />,
				},
			],
		},
		{
			path: '/:pageName/about',
			element: <Test />,
		},
		{
			path: '/:pageName/log',
			element: <LogFunc />,
		},
		{
			path: '/:pageName/settings',
			element: <Settings />,
		},
		{
			path: '/:pageName/todo',
			element: <Todo />,
		},
	], */
