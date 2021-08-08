import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Props } from './model'
import useStyles from './useStyles'

const LabelTitle = ({ label, className = '' }: Props) => {
  const classes = useStyles()
  return <FormHelperText className={`${classes.labelTitle} ${className}`}>{label}</FormHelperText>
}
export default LabelTitle
