import { IconButton, InputAdornment, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useActions } from 'hooks/useActions'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { ILoginData } from 'dto/user.dto'

import AuthService from 'dataStore/service/auth.service'

import * as Yup from 'yup'

import { FormWrapper } from './LoginForm.elements'

interface errorData {
  phone: boolean
  password: boolean
  phoneMessage: string
  passwordMessage: string
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    phone: '+7',
    password: '',
  })
  const [errorData, setErrorData] = useState<errorData>({
    phone: false,
    phoneMessage: '',
    password: false,
    passwordMessage: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  let navigate = useNavigate()
  const { updateUser } = useActions()

  const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, 'Неверный формат')
      .min(11, 'Неверное количество символов')
      .required('Обязательное поле'),
  })
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .max(16, 'Не более 16 символов')
      .required('Обязательное поле'),
  })

  const handleSetLoginData = async (e: any): Promise<void> => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    if (e.target.name === 'phone') {
      const data: { phone: string } = { phone: e.target.value }
      const user: boolean = await phoneSchema.isValid(data)
      try {
        await phoneSchema.validate(data)
        setErrorData({ ...errorData, phoneMessage: '', phone: !user })
      } catch (err: any) {
        setErrorData({
          ...errorData,
          phoneMessage: err?.errors[0],
          phone: !user,
        })
      }
    }
    if (e.target.name === 'password') {
      const data: { password: string } = { password: e.target.value }
      const password: boolean = await passwordSchema.isValid(data)
      try {
        await passwordSchema.validate(data)
        setErrorData({
          ...errorData,
          passwordMessage: '',
          password: !password,
        })
      } catch (err: any) {
        setErrorData({
          ...errorData,
          passwordMessage: err?.errors[0],
          password: !password,
        })
      }
    }
  }

  const loginHandler = () => {
    if (loginData.phone.length > 10 && loginData.password.length > 6) {
      AuthService.login(loginData)
        .then(response => {
          if (response?.data?.token) {
            localStorage.setItem('token', response.data.token)
            const decoded: any = jwtDecode(response.data.token)
            updateUser({
              userId: decoded.id,
              firstName: decoded.first_name,
            })
            toast.success(`Здравствуйте, ${decoded.first_name}!`)
            navigate(`/`)
          }
        })
        .catch(error => {
          console.log(error.response)
          if (error?.response?.status) {
            toast.error(error.response.data.message)
          } else {
            toast.error('Сервер недоступен')
          }
        })
    }
  }

  const keyEnterHandler = (e: any): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      loginHandler()
    }
  }
  return (
    <FormWrapper>
      <Typography variant='h4' gutterBottom>
        Вход в панель управления
      </Typography>

      <TextField
        placeholder='Номер телефона'
        fullWidth
        value={loginData.phone}
        label={errorData.phone ? errorData.phoneMessage : null}
        name='phone'
        type='phone'
        onChange={handleSetLoginData}
        required
        error={errorData.phone}
      />

      <TextField
        placeholder='Пароль'
        fullWidth
        name='password'
        type={showPassword ? 'text' : 'password'}
        label={errorData.password ? errorData.passwordMessage : null}
        onChange={handleSetLoginData}
        required
        error={errorData.password}
        onKeyPress={keyEnterHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant='contained'
        fullWidth
        size='large'
        disabled={errorData.phone || errorData.password}
        onClick={loginHandler}
      >
        Вход
      </Button>

      <Typography variant='body2' sx={{ mt: { md: 2 } }}>
        У Вас нет аккаунта? {''}
        <a href='http://bruno.vies.tech/franchise'>
          Подайте заявку на странице франшизы
        </a>
      </Typography>
    </FormWrapper>
  )
}

export default LoginForm
