import React from 'react'
import closeSrc from 'src/assets/icon/white-close.svg'
import { Props } from './model'
import useStyles from './useStyles'

const Labels: React.FC<Props> = ({ selectedList, hasDeleteIcon, onClick, limited, limitedLength }) => {
  const classes = useStyles()
  const limitedList = selectedList.slice(0, limitedLength)
  const restLength = selectedList.length - limitedList.length
  const hasMore = selectedList.length > 1

  return limited && hasMore && limitedLength ? (
    <>
      {limitedList.map((item) => (
        <button className={classes.label} key={item.id} onClick={() => onClick && onClick(item)}>
          <span className={classes.text}>{item.name}</span>
          {onClick && hasDeleteIcon && <img src={closeSrc} alt='' />}
        </button>
      ))}
      <span className={classes.more}>{`+${restLength}`}</span>
    </>
  ) : (
    <>
      {selectedList.map((item) => (
        <button className={classes.label} key={item.id} onClick={() => onClick && onClick(item)}>
          <span className={classes.text}>{item.name}</span>
          {onClick && hasDeleteIcon && <img src={closeSrc} alt='' />}
        </button>
      ))}
    </>
  )
}

Labels.defaultProps = {
  hasDeleteIcon: true,
}

export default Labels
