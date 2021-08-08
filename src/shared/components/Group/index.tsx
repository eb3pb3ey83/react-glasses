import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const Group: React.FC<Props> = ({ children, title, isError }) => {
  const classes = useStyles({ isError })

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title} variant='subtitle1'>
          <span className={classes.flag} />
          {title}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default Group
