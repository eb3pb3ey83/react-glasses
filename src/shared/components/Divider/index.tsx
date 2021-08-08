import React from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const Divider: React.FC<Props> = ({ margin = 16 }) => {
  const classes = useStyles({ margin })

  return (
    <>
      <div className={classes.divider} />
    </>
  )
}

export default Divider
