import React from 'react'
import { Tab as TabComponent } from '@material-ui/core'
import TabsComponent from '../Tabs'
import useStyles from './useStyles'

interface Props {
  [key: string]: unknown
}

const Tabs: React.FC<Props> = ({ children, ...restProps }) => {
  const classes = useStyles()

  return (
    <TabsComponent {...restProps} className={`${classes.tabs} ${restProps.className ? restProps.className : ''}`}>
      {children}
    </TabsComponent>
  )
}

const Tab: React.FC<Props> = (props) => {
  const classes = useStyles()

  return <TabComponent disableRipple {...props} className={classes.tab} />
}

export default { Tabs, Tab }
