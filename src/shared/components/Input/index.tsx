import React, { forwardRef } from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import useStyles from './useStyles'

interface Props {
  [key: string]: unknown
  width?: number | string
  height?: number | string
  margin?: number | string
}

const Input: React.FC<Props> = forwardRef(({ height, width, margin, className = '', ...restProps }, ref) => {
  const classes = useStyles({ height, margin })

  return (
    <OutlinedInput
      {...restProps}
      style={{
        ...(width && { width }),
        ...(height && { height }),
      }}
      className={`${classes.container} ${className}`}
      inputRef={ref}
    />
  )
})

Input.displayName = 'input'
export default Input
