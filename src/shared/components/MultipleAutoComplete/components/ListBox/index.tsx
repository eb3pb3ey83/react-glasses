/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType, HTMLAttributes, LegacyRef } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useStyles from './useStyles'

const ListBox: ComponentType<HTMLAttributes<HTMLElement>> = React.forwardRef((props, ref: LegacyRef<HTMLUListElement>) => {
  const classes = useStyles()
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <PerfectScrollbar>
      <ul {...props} className={classes.listBox} ref={ref} />
    </PerfectScrollbar>
  )
})

ListBox.displayName = 'listBox'
export default ListBox
