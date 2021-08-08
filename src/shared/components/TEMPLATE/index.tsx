import React from 'react'
import useStyles from './useStyles'

const Template: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.container} />
    </>
  )
}

export default Template
