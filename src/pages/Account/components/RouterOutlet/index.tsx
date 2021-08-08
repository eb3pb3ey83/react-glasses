import React, { Suspense } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Loading from 'src/shared/components/Loading'
import authConfig from 'src/utils/authConfig'
import AccountCreator from '../AccountCreator'
import AccountEditor from '../AccountEditor'
import { Props } from './model'

const RouterOutlet: React.FC<Props> = ({ openToast, closeDrawer, deptList, roleList }) => {
  const location = useLocation()
  const hasAddPermission = authConfig.getPermissions('role:add')

  React.useEffect(() => {
    const pathname = location.pathname
    const isMainPage = !pathname.includes('create') && !pathname.includes('edit')

    isMainPage && closeDrawer()
  }, [location])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {hasAddPermission && (
          <Route strict sensitive exact path='/pages/usermanagement/account/create'>
            <AccountCreator openToast={openToast} deptList={deptList} roleList={roleList} closeDrawer={closeDrawer} />
          </Route>
        )}
        <Route strict sensitive exact path='/pages/usermanagement/account/edit/:id'>
          <AccountEditor openToast={openToast} deptList={deptList} roleList={roleList} closeDrawer={closeDrawer} />
        </Route>
        <Redirect exact from='/pages/usermanagement/account/*' to={`/pages/usermanagement/account`} />
      </Switch>
    </Suspense>
  )
}

export default RouterOutlet
