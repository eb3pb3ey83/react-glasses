import React from 'react'
import useStyles from './useStyles'

const Container: React.FC = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.filterContainer}>{children}</div>
}

const Control: React.FC = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.control}>{children}</div>
}

const Info: React.FC = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.info}>{children}</div>
}

export default { Container, Control, Info }
