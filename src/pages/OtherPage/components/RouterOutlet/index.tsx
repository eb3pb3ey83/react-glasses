import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Props } from './model'
import { CountyRoleType } from 'src/pages/model'
import OthersEditor from '../OthersEditor'

const RouterOutlet: React.FC<Props> = ({ openToast }) => {
  return (
    <CountyRoleType.Consumer>
      {({ roleType, langListLocal, langListForign }) => (
        <Switch>
          <Route strict sensitive exact path='/pages/pagemanagement/otherpage/edit/:id'>
            <OthersEditor openToast={openToast} roleType={roleType} langListLocal={langListLocal} langListForign={langListForign} />
          </Route>
          <Redirect exact from='/pages/pagemanagement/otherpage/*' to={`/pages/pagemanagement/otherpage`} />
        </Switch>
      )}
    </CountyRoleType.Consumer>
  )
}

export default RouterOutlet
