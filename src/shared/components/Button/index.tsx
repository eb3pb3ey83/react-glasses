import React, { forwardRef, RefObject } from 'react'
import ButtonComponent from '@material-ui/core/Button'
import useStyles from './useStyles'

interface Props {
  type: 'submit' | 'button'
  fullWidth?: boolean
  isDeleteButton?: boolean
  isWhiteButton?: boolean
  className?: string
  width?: number | string
  height?: number | string
  [key: string]: unknown
}

const Button: React.FC<Props> = forwardRef(
  ({ children, type, className = '', fullWidth, isDeleteButton, isWhiteButton, width, height, ...props }, ref) => {
    const styles = useStyles({ isDeleteButton, isWhiteButton })

    return (
      <ButtonComponent
        size='medium'
        type={type}
        disableRipple
        fullWidth={fullWidth}
        variant='contained'
        color='primary'
        className={`${styles.button} ${className}`}
        style={{ width: width, height }}
        ref={ref as RefObject<HTMLButtonElement> | null | undefined}
        {...props}
      >
        {children}
      </ButtonComponent>
    )
  },
)

Button.defaultProps = {
  fullWidth: true,
  isWhiteButton: false,
  height: 54,
}

export default Button
