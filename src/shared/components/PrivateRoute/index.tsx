import React from 'react'
import { Redirect, Route } from 'react-router'

interface Props {
  [key: string]: unknown
}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const isAuth = window.localStorage.getItem('isLogin')
  return <Route {...rest} render={() => (isAuth ? children : <Redirect to='/login' />)} />
}

export default PrivateRoute
