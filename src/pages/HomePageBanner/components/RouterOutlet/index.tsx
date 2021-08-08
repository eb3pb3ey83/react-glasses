import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import authConfig from 'src/utils/authConfig'
import MainBannerCreator from '../MainBannerCreator'
import { CountyRoleType } from 'src/pages/model'
import { Props } from './model'
import MainBannerEditor from '../MainBannerEditor'

const hasAddPermission = authConfig.getPermissions('main:add')

const RouterOutlet: React.FC<Props> = ({ openToast, closeDrawer, list }) => {
  const { roleType, langListForign, langListLocal } = useContext(CountyRoleType)

  return (
    <Switch>
      {hasAddPermission && (
        <Route strict sensitive exact path='/pages/pagemanagement/homebanner/create'>
          <MainBannerCreator
            openToast={openToast}
            roleType={roleType}
            langListLocal={langListLocal}
            langListForign={langListForign}
            closeDrawer={closeDrawer}
          />
        </Route>
      )}
      <Route strict sensitive exact path='/pages/pagemanagement/homebanner/edit/:id'>
        <MainBannerEditor openToast={openToast} list={list} roleType={roleType} langListLocal={langListLocal} langListForign={langListForign} />
      </Route>
      <Redirect exact from='/pages/pagemanagement/homebanner/*' to={`/pages/pagemanagement/homebanner`} />
    </Switch>
  )
}

export default RouterOutlet
