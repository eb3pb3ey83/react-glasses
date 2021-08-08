import React from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const FormErrorHelperText: React.FC<Props> = ({ text, className = '', style }) => {
  const classes = useStyles()
  return (
    <div className={`${className} ${classes.errorMessage}`} style={style}>
      {text}
    </div>
  )
}

export default FormErrorHelperText
