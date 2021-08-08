import React from 'react'
import { MainRouterOutlet } from './Components/RouterOutlet'
import { useLocation } from 'react-router'
import Company from './Company'

const Customer: React.FC = () => {
  const location = useLocation()
  const pathName = location.pathname
  const isMainPage = /^\/pages\/customermanagement\/{0,1}$/.test(pathName)
  const isCompanyEditorPage = /\/company\/create|\/company\/edit/.test(pathName)

  return isMainPage || isCompanyEditorPage ? <Company /> : <MainRouterOutlet />
}

export default Customer
