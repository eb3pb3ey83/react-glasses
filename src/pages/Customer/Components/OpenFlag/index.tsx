import { Box, FormHelperText } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import { useOnFlagChange } from './useOnFlagChange'
import FormikSwitch from 'src/shared/components/FormikSwitch'
import { OpenFlagContext, Props } from './model'
import useStyles from './useStyles'

export const OpenFlagProvider: React.FC<Props> = ({ children, value }) => {
  return <OpenFlagContext.Provider value={value}>{children}</OpenFlagContext.Provider>
}

export const OpenFlag: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { values } = useFormikContext<{ open_flag: string }>()
  const isAccountOpen = values.open_flag === '1'
  const { onFlagChange } = useOnFlagChange()

  return (
    <>
      <FormHelperText className={classes.label}>{t('company.openFlag')}</FormHelperText>
      <Box marginBottom='32px'>
        <FormikSwitch
          disabled={disabled}
          labelClassName={classes.switchLabel}
          className={classes.switch}
          name='open_flag'
          label={isAccountOpen ? t('select.enable') : t('select.disable')}
          onChange={onFlagChange}
        />
        {!isAccountOpen && (
          <FormHelperText className={classes.accountInfo}>
            <InfoIcon />
            <span className={classes.accountInfoText}>{t('company.dealerOpenFlagText')}</span>
          </FormHelperText>
        )}
      </Box>
    </>
  )
}

export default OpenFlag
