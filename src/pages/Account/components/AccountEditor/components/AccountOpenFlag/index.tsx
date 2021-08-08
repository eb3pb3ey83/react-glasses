import FormHelperText from '@material-ui/core/FormHelperText'
import React from 'react'
import Switch from 'src/shared/components/Switch'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import { FormToolsContext } from '../../context'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Props } from './model'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import EmailSender from 'src/shared/components/EmailSender'
import useStyles from './useStyles'

const AccountOpenFlag: React.FC<Props> = ({ disabled }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)
  const shouldSendEmail = context?.openFlag === '2'
  const isAccountOpen = context?.watchedOpenFlag === '1'
  const { t } = useTranslation()

  const handleChange = (isChecked: boolean, props: ControllerRenderProps<Record<string, unknown>>) => {
    props.onChange(isChecked ? '1' : '0')
  }

  const sendOpenAccountEmail = () => {
    context?.email && context?.sendEmail({ email: context.email })
  }

  return (
    <>
      <FormHelperText className={`${classes.label} ${classes.settingLabel}`}>{t('account.section2')}</FormHelperText>
      {shouldSendEmail ? (
        <EmailSender onEmailSend={sendOpenAccountEmail} disabled={disabled} isChinese={isChinese} />
      ) : (
        <>
          <Controller
            name='openFlag'
            render={(props) => (
              <Switch
                onChange={(_event, isChecked) => handleChange(isChecked, props)}
                checked={isAccountOpen}
                label={isAccountOpen ? t('select.enable') : t('select.disable')}
                disabled={disabled}
              />
            )}
            control={context?.control}
          />
          {!isAccountOpen && (
            <FormHelperText className={classes.accountInfo}>
              <InfoIcon />
              <span className={classes.accountInfoText}>{t('account.section1')}</span>
            </FormHelperText>
          )}
        </>
      )}
    </>
  )
}

export default AccountOpenFlag
