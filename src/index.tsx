import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ruRU } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import store from './dataStore/state'

import './index.css'
import App from './App'

const theme = createTheme(
  {
    /* palette: {
      primary: { main: '#1976d2' },
    }, */
  },
  ruRU,
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Router>
					<App />
				</Router>
			</ThemeProvider>
    </Provider>
  </React.StrictMode>
)
