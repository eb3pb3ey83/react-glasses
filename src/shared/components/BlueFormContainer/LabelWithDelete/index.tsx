import React from 'react'
import { ReactComponent as DeleteIcon } from 'src/assets/icon/delete.svg'
import useStyles from './useStyles'

interface Props {
  text?: string
  onClick: () => void
}

const LabelWithDelete: React.FC<Props> = ({ text, onClick }) => {
  const classes = useStyles()
  return (
    <div className={`${classes.labelWithDelete} labelDelete`}>
      <div className={classes.leftBtn}>{text}</div>
      <div className={classes.deleteBtn} onClick={onClick}>
        <DeleteIcon />
      </div>
    </div>
  )
}

export default LabelWithDelete
