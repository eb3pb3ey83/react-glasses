import React from 'react'
import { ReactComponent as DeleteIcon } from 'src/assets/icon/delete.svg'
import { FocusTabInfo } from './model'
import useStyles from './useStyle'

const FocusTab: React.FC<FocusTabInfo> = ({ onDelete }) => {
  const classes = useStyles()

  return (
    <div className={classes.focusTab}>
      <div className={classes.focusTabTxt}>文字</div>
      <div className={classes.focusTabClear} onClick={onDelete}>
        <DeleteIcon className={classes.focusTabClearIcon} />
      </div>
    </div>
  )
}

export default FocusTab
