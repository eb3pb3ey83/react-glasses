import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Props } from './model'
import { CountyRoleType } from 'src/pages/model'
import ContactEditor from '../ContactEditor'
import authConfig from 'src/utils/authConfig'
import Loading from 'src/shared/components/Loading'

const hasAddPermission = authConfig.getPermissions('contact:add')

const RouterOutlet: React.FC<Props> = ({ openToast, closeDrawer }) => {
  return (
    <Suspense fallback={<Loading />}>
      <CountyRoleType.Consumer>
        {({ roleType }) => (
          <Switch>
            {hasAddPermission && (
              <Route strict exact sensitive path='/pages/pagemanagement/contact/create'>
                {roleType ? <ContactEditor openToast={openToast} closeDrawer={closeDrawer} roleType={roleType} isCreate={true} /> : <Loading />}
              </Route>
            )}
            {
              <Route strict sensitive path='/pages/pagemanagement/contact/:id'>
                {roleType ? <ContactEditor openToast={openToast} closeDrawer={closeDrawer} roleType={roleType} isCreate={false} /> : <Loading />}
              </Route>
            }
            <Redirect exact from='/pages/pagemanagement/contact/*' to={`/pages/pagemanagement/contact`} />
          </Switch>
        )}
      </CountyRoleType.Consumer>
    </Suspense>
  )
}

export default RouterOutlet
