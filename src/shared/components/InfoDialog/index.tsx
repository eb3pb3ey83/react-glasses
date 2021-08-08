import React from 'react'
import { Box, Typography } from '@material-ui/core'
import closeSrc from 'src/assets/icon/close-bold.svg'
import { Dialog as DialogComponent } from '@material-ui/core'
import { Props } from './model'
import useStyles from './useStyles'

const Container: React.FC<Props> = ({ open, onClose, children, title, ...restProps }) => {
  const classes = useStyles()

  return (
    <DialogComponent classes={{ paper: classes.paper }} style={{ borderRadius: 0 }} {...restProps} open={open}>
      <Box justifyContent='space-between' height={64} className={classes.titleContainer}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={classes.closeIcon} onClick={onClose}>
            <img src={closeSrc} alt='' />
          </button>
        </div>
      </Box>
      {children}
    </DialogComponent>
  )
}

const Content: React.FC<{ disabled?: boolean }> = ({ children, disabled }) => {
  const classes = useStyles({ disabled })

  return (
    <Box className={`${classes.contentContainer} custom_scrollbar`}>
      <Box className={classes.content}>{children}</Box>
    </Box>
  )
}

const Footer: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Box height={64} className={classes.control}>
      {children}
    </Box>
  )
}

export default { Container, Footer, Content }
