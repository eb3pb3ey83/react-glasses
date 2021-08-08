import React from 'react'
import { Box, Drawer, Typography } from '@material-ui/core'
import closeSrc from 'src/assets/icon/close-bold.svg'
import { ReactComponent as Eyes } from 'src/assets/icon/eye-history.svg'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useStyles from './useStyles'

interface Props {
  open: boolean
  title: string
  onClose?: () => void
  [key: string]: unknown
  width?: string | number
  editHistory?: {
    updated_time?: string
    updated_user?: {
      user_name_ch: string
      user_name_en: string
    }
    created_time?: string
    created_user?: {
      user_name_ch: string
      user_name_en: string
    }
  }
}

const Container: React.FC<Props> = ({ open, onClose, title, children, width, editHistory }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'

  return (
    <Drawer
      disableEnforceFocus
      style={{ position: 'absolute' }}
      PaperProps={{ style: { width } }}
      classes={{ root: classes.root, paper: classes.container }}
      anchor='right'
      open={open}
      onClose={onClose}
      transitionDuration={0}
      // disablePortal={true}
    >
      <Box justifyContent='space-between' height={64} className={classes.titleContainer}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {editHistory && (
            <div className={classes.actionHistory}>
              <Eyes />
              {t('eventRecord')}
              <table className={`${classes.historyLog} log`}>
                <tbody>
                  <tr>
                    <td>{t('title.lastUpdatedUser')}</td>
                    <td>{editHistory.updated_user && editHistory.updated_user[isChinese ? 'user_name_ch' : 'user_name_en']}</td>
                  </tr>
                  <tr>
                    <td>{t('title.lastUpdatedTime')}</td>
                    <td>{editHistory.updated_time}</td>
                  </tr>
                  {editHistory.created_time && editHistory.created_user && (
                    <>
                      <tr>
                        <td>{t('title.section14')}</td>
                        <td>{editHistory.created_user[isChinese ? 'user_name_ch' : 'user_name_en']}</td>
                      </tr>
                      <tr>
                        <td>{t('title.section15')}</td>
                        <td>{editHistory.created_time}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <button className={classes.closeIcon} onClick={onClose}>
            <img src={closeSrc} alt='' />
          </button>
        </div>
      </Box>
      {children}
    </Drawer>
  )
}

const Content: React.FC<{ disabled?: boolean }> = ({ children, disabled }) => {
  const classes = useStyles({ disabled })

  return (
    <Box className={`${classes.contentContainer} custom_scrollbar`}>
      <Box className={classes.content}>{children}</Box>
    </Box>
  )
}

const Footer: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Box height={64} className={classes.control}>
      {children}
    </Box>
  )
}

export default { Container, Footer, Content }
