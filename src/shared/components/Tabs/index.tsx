import { Tabs as TabsComponent } from '@material-ui/core'
import React from 'react'
import useStyles from './useStyles'

interface Props {
  [key: string]: unknown
}

const Tabs: React.FC<Props> = ({ children, ...restProps }) => {
  const classes = useStyles()

  return (
    <>
      <TabsComponent
        {...restProps}
        classes={{
          root: classes.root,
          indicator: classes.indicator,
          flexContainer: classes.flexContainer,
        }}
      >
        {children}
      </TabsComponent>
    </>
  )
}

export default Tabs
