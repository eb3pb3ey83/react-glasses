import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'src/shared/components/Loading'
import authConfig from 'src/utils/authConfig'
import LoginBannerCreator from '../LoginBannerCreator'
import LoginBannerEditor from '../LoginBannerEditor'
import { Props } from './model'

const hasAddPermission = authConfig.getPermissions('role:add')

const RouterOutlet: React.FC<Props> = ({ openToast, list, closeDrawer }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {hasAddPermission && (
          <Route strict sensitive path='/pages/pagemanagement/loginbanner/create'>
            <LoginBannerCreator openToast={openToast} closeDrawer={closeDrawer} />
          </Route>
        )}
        <Route strict sensitive path='/pages/pagemanagement/loginbanner/edit/:id'>
          <LoginBannerEditor openToast={openToast} list={list} closeDrawer={closeDrawer} />
        </Route>
        <Redirect exact from='/pages/pagemanagement/loginbanner/*' to={`/pages/pagemanagement/loginbanner`} />
      </Switch>
    </Suspense>
  )
}

export default RouterOutlet
