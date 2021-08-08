import React from 'react'
import { ReactComponent as UpArrow } from 'src/assets/icon/up.svg'
import { ReactComponent as DownArrow } from 'src/assets/icon/down.svg'
import { ReactComponent as UpSelectedArrow } from 'src/assets/icon/up-selected.svg'
import { ReactComponent as DownSelectedArrow } from 'src/assets/icon/down-selected.svg'
import { Props } from './model'
import { AccountOrder } from 'src/pages/Account/model'
import { OrderChange } from 'src/pages/Role/machineConfig/event'
import { sortProps } from '../ItemWithSort/model'
import { SortContext } from '../SortProvider/model'
import useStyles from './useStyles'

const SortButtons: React.FC<Props> = ({ sortUp, sortDown, sortMethod }) => {
  const classes = useStyles()
  const typedSortMethod = sortMethod as (orderBy: OrderChange['order_by'] | AccountOrder | sortProps) => void
  const { currentSort, initializePage } = React.useContext(SortContext)

  const onClick = React.useCallback(
    (sortType: string) => {
      initializePage && initializePage()
      typedSortMethod(sortType)
    },
    [typedSortMethod],
  )

  return (
    <div className={classes.buttonsWrapper}>
      <button className={classes.button} onClick={() => onClick(sortUp)}>
        {currentSort === sortUp ? <UpSelectedArrow style={{ opacity: '.8' }} /> : <UpArrow />}
      </button>
      <button className={classes.button} onClick={() => onClick(sortDown)}>
        {currentSort === sortDown ? <DownSelectedArrow style={{ opacity: '.8' }} /> : <DownArrow />}
      </button>
    </div>
  )
}

export default SortButtons
