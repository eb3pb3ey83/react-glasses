import classNames from 'classnames'
import React from 'react'
import SortButtons from '../SortButtons'
import { Props } from './model'
import useStyles from './useStyles'

const ItemWithSort: React.FC<Props> = ({ children, align, width, sortMethod, sortDown, sortUp, disabledSort }) => {
  const classes = useStyles()

  const wrapperClass = classNames({
    [classes.itemWrapper]: true,
    [classes.alignRight]: align === 'right',
  })

  ItemWithSort.defaultProps = {
    disabledSort: false,
  }

  return (
    <span className={wrapperClass} style={{ width }}>
      {children}
      {!disabledSort ? <SortButtons sortMethod={sortMethod} sortDown={sortDown} sortUp={sortUp} /> : <></>}
    </span>
  )
}

export default ItemWithSort
