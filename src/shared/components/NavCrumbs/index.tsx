import React from 'react'
import { Props } from './model'
import { ReactComponent as Left } from 'src/assets/icon/arrow-left-icon.svg'
import { useHistory } from 'react-router-dom'
import useStyles from './useStyles'

// const textList = [{label:'鏡片修改說明',link:'/abc'}]
const NavCrumbs: React.FC<Props> = ({ textList }) => {
  const classes = useStyles()
  const history = useHistory()
  const doLink = (url?: string) => {
    if (!url) return
    history.push(url)
  }
  return (
    <div className={classes.crumbs}>
      {textList.map((item) => {
        return (
          <React.Fragment key={item.label}>
            <Left />
            <div onClick={() => doLink(item.link)} className={classes.label}>
              {item.label}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default NavCrumbs
