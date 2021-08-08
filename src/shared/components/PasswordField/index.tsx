import React, { forwardRef } from 'react'
import Field from '../Field'
import { ReactComponent as EyesOpen } from 'src/assets/icon/eyes.svg'
import { ReactComponent as EyesClose } from 'src/assets/icon/close-eyes.svg'
import useStyles from './useStyles'

interface Props {
  label: string
  [key: string]: unknown
}

const PasswordField: React.FC<Props> = forwardRef(({ lebel, ...restProps }, ref) => {
  const classes = useStyles()
  const [isShowPassword, setIsShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setIsShowPassword((isShow) => !isShow)
  }

  return (
    <Field
      {...restProps}
      ref={ref}
      lebel={lebel}
      type={isShowPassword ? 'text' : 'password'}
      endAdornment={
        isShowPassword ? (
          <EyesClose className={classes.eyes} onClick={handleClickShowPassword} />
        ) : (
          <EyesOpen className={classes.eyes} onClick={handleClickShowPassword} />
        )
      }
    />
  )
})

PasswordField.displayName = 'PasswordField'

export default PasswordField
