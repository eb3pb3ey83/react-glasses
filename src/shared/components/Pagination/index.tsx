import React from 'react'
import { Pagination as PaginationComponent } from '@material-ui/lab'
import { Props } from './model'
import useStyles from './useStyles'

const Pagination: React.FC<Props> = (props) => {
  const classes = useStyles()

  return <PaginationComponent {...props} className={classes.container} color='secondary' showFirstButton showLastButton />
}

export default Pagination
