import React, { useEffect, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom'
import { MenuInfo, Props } from './model'
import IconToImg from '../IconDecide/IconToImg'
import HeaderMenuLogo from 'src/assets/icon/header-menu-logo.svg'
import classNames from 'classnames'
import arrowUpIcon from '../../../assets/icon/arrow-up-icon.svg'
import arrowDownIcon from '../../../assets/icon/arrow-down-icon.svg'
import Loading from '../Loading'
import { isArray } from 'lodash'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useStyles from './useStyles'

const Menu: React.FC<Props> = ({ menuData }: Props) => {
  const { url } = useRouteMatch()
  const { pathname } = useLocation()
  const { language } = useLanguage()

  const classes = useStyles()
  const isEnglish = language === 'en-US' ? true : false
  const [menuArray, setMenuArray] = useState(menuData?.menus)

  useEffect(() => {
    if (!menuArray && menuData) {
      setMenuArray(menuData.menus)
    }
  }, [menuData])

  const renderMenu = (item: MenuInfo, isOpenChildren = false) => {
    const menuList = classNames({
      [classes.listItem]: true,
      [classes.isShowMenuItem]: !isOpenChildren,
    })
    if (item.menu_type === '1') {
      //has children
      return (
        <div key={item.id}>
          <div
            className={`${classes.listItemParnet} ${pathname.includes(`/${item.menu_path}/`) ? classes.itemActive : ''}`}
            onClick={() => {
              const newMenuArray =
                menuArray &&
                menuArray.map((value) => {
                  const isCurrentItem = value.id === item.id
                  // return isCurrentItem ? { ...value, arrow: !item.arrow } : value
                  if (isCurrentItem) {
                    return { ...value, arrow: !item.arrow }
                  } else {
                    value.arrow = false
                    return value
                  }
                })
              setMenuArray(newMenuArray)
            }}
          >
            <>
              <div className='itemSliderActive' />
              {item.menu_icon ? (
                <IconToImg src={item.menu_icon ? item.menu_icon : ''} />
              ) : (
                <div style={{ marginRight: '14px', minWidth: '20px', height: '16px', background: 'transparent' }} />
              )}
              <div className={`${classes.itemText} parent`}>{isEnglish ? item.menu_name_en : item.menu_name_ch}</div>
            </>
            {item.arrow ? <img src={arrowUpIcon} /> : <img src={arrowDownIcon} />}
          </div>
          {item.sub_menu?.map((subMenuItem: MenuInfo) => renderMenu(subMenuItem, item.arrow))}
        </div>
      )
    } else {
      return (
        <NavLink
          exact
          to={`${url}/${item.menu_path}`}
          className={item.parent_id ? menuList : `${classes.listItemParnet}`}
          activeClassName={classes.itemActive}
          key={item.id}
        >
          {!item.parent_id && <div className='itemSliderActive' />}
          {!item.parent_id && item.menu_icon && <IconToImg src={item.menu_icon} />}
          {!item.parent_id && !item.menu_icon && <div style={{ marginRight: '14px', minWidth: '20px', height: '16px', background: 'transparent' }} />}
          <div className={`${classes.itemText} ${!item.parent_id ? 'parent' : 'child'}`}>{isEnglish ? item.menu_name_en : item.menu_name_ch}</div>
        </NavLink>
      )
    }
  }

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <img className='menuLogo' src={HeaderMenuLogo} alt='' />
      </div>
      {(menuArray && menuArray.length === 0) || !menuArray ? (
        <Loading />
      ) : (
        <>
          <List> {menuArray && isArray(menuArray) && menuArray.map((item) => renderMenu(item))} </List>
        </>
      )}
    </>
  )
  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
        open
      >
        {drawer}
      </Drawer>
    </nav>
  )
}

export default Menu
