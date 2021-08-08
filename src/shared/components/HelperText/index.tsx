import React from 'react'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import { Props } from './model'
import useStyles from './useStyles'

const HelperText: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.helperText}>
      <div className='firstLine'>
        <InfoIcon />
        {title}
      </div>
      <div className='secondLine'>{children}</div>
    </div>
  )
}

export default HelperText
