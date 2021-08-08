import { Box, FormHelperText } from '@material-ui/core'
import { differenceBy } from 'lodash'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import ErrorMessage from 'src/shared/components/ErrorMessage'
import Field from 'src/shared/components/Field'
import MultipleAutoComplete from 'src/shared/components/MultipleAutoComplete'
import { FormToolsContext } from '../../context'
import AccountDepts from '../AccountDepts'
import AccountOpenFlag from '../AccountOpenFlag'
import { useSelectedRoleList } from './hooks'
import { Props } from './model'
import useStyles from './useStyles'

const AccountModifier: React.FC<Props> = ({ roleList, deptList, hasUpdatePermission }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)
  const { t } = useTranslation()
  const roleOptions = roleList.map((value) => ({ id: value.id, name: isChinese ? value.role_name_ch : value.role_name_en }))
  const { selectedRoleList } = useSelectedRoleList(roleList)

  return (
    <>
      <Box className={classes.roleName}>
        <Field
          disabled={!hasUpdatePermission}
          name='user_name_ch'
          ref={context?.register}
          classes={{ root: classes.blueInput, notchedOutline: classes.notched }}
          placeholder={t('account.chNamePlaceholder')}
          height={40}
          label={t('account.name')}
          labelClassName={classes.label}
          error={Boolean(context?.errors.user_name_ch)}
          errorMessage={context?.errors?.user_name_ch?.message}
        />
        <Field
          disabled={!hasUpdatePermission}
          name='user_name_en'
          ref={context?.register}
          classes={{ root: classes.blueInput, notchedOutline: classes.notched }}
          placeholder={t('account.enNamePlaceholder')}
          height={40}
          error={Boolean(context?.errors.user_name_en)}
          errorMessage={context?.errors?.user_name_en?.message}
        />
      </Box>

      <Box display='flex' flexDirection='column' marginBottom='20px'>
        <Field
          name='email'
          disabled
          classes={{ root: classes.blueInput, notchedOutline: classes.notched }}
          ref={context?.register}
          placeholder={t('account.emailPlaceholder')}
          height={40}
          label={t('account.email')}
          labelClassName={classes.label}
          error={Boolean(context?.errors.email)}
          errorMessage={context?.errors?.email?.message}
        />
      </Box>

      <FormHelperText className={`${classes.label} ${classes.settingLabel}`}>
        角色
        {context?.errors.roles && <ErrorMessage className={classes.errorMessage} message={t('account.roleError')} />}
      </FormHelperText>

      <Box display='flex' flexDirection='column' marginBottom='20px'>
        <Controller
          name='roles'
          render={(props) => (
            <MultipleAutoComplete
              disabled={!hasUpdatePermission}
              value={selectedRoleList}
              options={differenceBy(roleOptions, selectedRoleList, 'name')}
              onChange={(value) => props.onChange(value)}
              placeholder={props.value.length > 0 ? '' : t('account.rolePlaceholder')}
            />
          )}
          control={context?.control}
        />
      </Box>

      <AccountDepts deptList={deptList} disabled={!hasUpdatePermission} />
      <AccountOpenFlag disabled={!hasUpdatePermission} />
    </>
  )
}

export default AccountModifier
