import React from 'react'

import LoginForm from 'components/auth/LoginForm'

import { Wrapper } from './Auth.elements'

const Auth: React.FC = () => {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  )
}

export default Auth
