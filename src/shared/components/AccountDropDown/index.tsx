import React from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { ReactComponent as ArrowDown } from 'src/assets/icon/arrow-down-icon.svg'
import { ReactComponent as ArrowUp } from 'src/assets/icon/arrow-up-icon.svg'
import { UserInfo } from './model'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { ResetPasswordType } from 'src/pages/model'
import authConfig from 'src/utils/authConfig'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const AccountDropDown = () => {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isChinese = language === 'zh-TW'
  const userData: string | null = window.localStorage.getItem('authenticatedUser')
  const userInfo: UserInfo | null = userData ? JSON.parse(userData) : null
  const avatarWord = isChinese ? userInfo?.user_name_ch.slice(0, 1) : userInfo?.user_name_en.slice(0, 1)
  const classes = useStyles({ word: avatarWord })
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const { setIsPasswordOpen } = React.useContext(ResetPasswordType)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const modifyPassword = (event: React.MouseEvent<EventTarget>) => {
    handleClose(event)
    setIsPasswordOpen && setIsPasswordOpen(true)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (anchorRef.current !== null && prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        disableRipple={true}
        onClick={handleToggle}
      >
        <div className={classes.account}>
          <div className={classes.avatar}>{avatarWord}</div>
          <div className={classes.name}>{isChinese ? userInfo?.user_name_ch : userInfo?.user_name_en}</div>
          {!!open ? <ArrowUp className={classes.arrowDown} /> : <ArrowDown className={classes.arrowDown} />}
        </div>
      </Button>
      <Popper style={{ zIndex: 2 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>{t('admin1')}</MenuItem>
                  <MenuItem onClick={modifyPassword}>{t('admin2')}</MenuItem>
                  <MenuItem onClick={() => authConfig.logOut()}>{t('admin3')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default AccountDropDown
