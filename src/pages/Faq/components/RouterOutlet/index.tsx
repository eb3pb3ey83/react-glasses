import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'src/shared/components/Loading'
import authConfig from 'src/utils/authConfig'
import FaqDrawer from '../FaqDrawer'
import { CountyRoleType } from 'src/pages/model'
import { Props } from './model'

const hasAddPermission = authConfig.getPermissions('faq:add')

const RouterOutlet: React.FC<Props> = ({ openToast, closeDrawer }) => {
  return (
    <Suspense fallback={<Loading />}>
      <CountyRoleType.Consumer>
        {({ roleType }) => (
          <Switch>
            {hasAddPermission && (
              <Route strict exact sensitive path='/pages/pagemanagement/faq/create'>
                {roleType ? <FaqDrawer openToast={openToast} closeDrawer={closeDrawer} roleType={roleType} /> : <Loading />}
              </Route>
            )}

            <Route strict sensitive path='/pages/pagemanagement/faq/:id'>
              {roleType ? <FaqDrawer openToast={openToast} closeDrawer={closeDrawer} roleType={roleType} /> : <Loading />}
            </Route>

            <Redirect exact from='/pages/pagemanagement/faq/*' to={`/pages/pagemanagement/faq`} />
          </Switch>
        )}
      </CountyRoleType.Consumer>
    </Suspense>
  )
}

export default RouterOutlet
