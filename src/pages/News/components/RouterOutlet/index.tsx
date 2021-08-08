import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NewsCreator from '../NewsCreator'
import { Props } from './model'
import { CountyRoleType } from 'src/pages/model'
import NewsEditor from '../NewsEditor'
import authConfig from 'src/utils/authConfig'

const RouterOutlet: React.FC<Props> = ({ openToast }) => {
  const hasAddPermission = authConfig.getPermissions('news:add')
  return (
    <CountyRoleType.Consumer>
      {({ roleType, langListLocal, langListForign }) => (
        <Switch>
          {hasAddPermission && (
            <Route strict sensitive exact path='/pages/newsmanagement/create'>
              {roleType && langListLocal && langListForign && (
                <NewsCreator openToast={openToast} roleType={roleType} langListLocal={langListLocal} langListForign={langListForign} />
              )}
            </Route>
          )}
          <Route strict sensitive exact path='/pages/newsmanagement/edit/:id'>
            <NewsEditor openToast={openToast} roleType={roleType} langListLocal={langListLocal} langListForign={langListForign} />
          </Route>
          <Redirect exact from='/pages/newsmanagement/*' to={`/pages/newsmanagement`} />
        </Switch>
      )}
    </CountyRoleType.Consumer>
  )
}

export default RouterOutlet
