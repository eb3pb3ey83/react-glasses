import React from 'react'
import { ReactComponent as ChatIcon } from 'src/assets/icon/chat-icon.svg'
import LanguageButton from '../LanguageButton'
import AccountDropDown from 'src/shared/components/AccountDropDown'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

interface Props {
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = React.memo(() => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.headerLg}>
      <div className={classes.headerLgRight}>
        <div className={classes.onlineQA}>
          <ChatIcon className='chatIcon' />
          <div className='QATitle'>{t('header.goButton')}</div>
        </div>
        <AccountDropDown />
        <LanguageButton className={`${classes.languageButton} langBtn`} />
      </div>
    </div>
  )
})

Header.displayName = 'header'

export default Header
