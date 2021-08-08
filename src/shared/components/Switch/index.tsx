import { FormControlLabel, Switch as SwitchComponent } from '@material-ui/core'
import React from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const Switch: React.FC<Props> = ({ label, checked, onChange, ...restProps }) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      labelPlacement='start'
      onChange={onChange}
      {...restProps}
      className={classes.switch}
      control={<SwitchComponent checked={checked} />}
      label={label}
    />
  )
}

export default Switch
