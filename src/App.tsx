import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Routes from './routes'
import { useNavigate } from 'react-router'
import jwtDecode from 'jwt-decode'

import moment from 'moment'
import 'moment/locale/ru'

import 'react-toastify/dist/ReactToastify.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './App.css'

function App() {
  moment.locale('ru')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const currentTime = Date.now() / 1000
      const decodedOldToken: any = jwtDecode(token)
      if (decodedOldToken?.exp < currentTime) {
        localStorage.removeItem('token')
        navigate('/auth')
      }
    } else {
      navigate('/auth')
    }
  }, [])

  return (
    <div className='App'>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Routes />
    </div>
  )
}

export default App
