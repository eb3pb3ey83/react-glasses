import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'src/shared/components/Loading'
import authConfig from 'src/utils/authConfig'
import RoleCreator from '../RoleCreator'
import RoleEditor from '../RoleEditor'
import { Props } from './model'

const RouterOutlet: React.FC<Props> = ({ openToast, closeDrawer }) => {
  const hasAddPermission = authConfig.getPermissions('role:add')

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {hasAddPermission && (
          <Route strict sensitive exact path='/pages/usermanagement/role/create'>
            <RoleCreator openToast={openToast} closeDrawer={closeDrawer} />
          </Route>
        )}
        <Route strict sensitive exact path='/pages/usermanagement/role/edit/:id'>
          <RoleEditor openToast={openToast} closeDrawer={closeDrawer} />
        </Route>
        <Redirect exact from='/pages/usermanagement/role/*' to={`/pages/usermanagement/role`} />
      </Switch>
    </Suspense>
  )
}

export default RouterOutlet
