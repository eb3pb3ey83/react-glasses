import { IconButton } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { MouseEvent } from 'react'

interface Props {
  isShowPassword: boolean
  handleClickShowPassword: () => void
  handleMouseDownPassword: (event: MouseEvent) => void
}

const Eyes: React.FC<Props> = ({ isShowPassword, handleClickShowPassword, handleMouseDownPassword }) => {
  return (
    <InputAdornment position='end'>
      <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
        {isShowPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  )
}

export default Eyes
