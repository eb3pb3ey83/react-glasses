import { Box, FormControlLabel, FormGroup, FormHelperText, Radio, RadioGroup } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import ErrorMessage from 'src/shared/components/ErrorMessage'
import Field from 'src/shared/components/Field'
import Group from 'src/shared/components/Group'
import { FormToolsContext } from '../../context'
import MenuGroup from '../MenuGroup'
import { Props } from './model'
import useStyles from './useStyles'

const RoleModifier: React.FC<Props> = ({ menuButtons }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)

  return (
    <>
      <Box className={classes.roleName}>
        <Field
          name='role_name_ch'
          ref={context?.register}
          disabled={!context?.hasUpdatePermission}
          placeholder={t('role.chNamePlaceholder')}
          height={40}
          label={t('role.name')}
          labelClassName={classes.label}
          error={Boolean(context?.errors.role_name_ch)}
          errorMessage={context?.errors?.role_name_ch?.message}
        />
        <Field
          name='role_name_en'
          ref={context?.register}
          disabled={!context?.hasUpdatePermission}
          placeholder={t('role.enNamePlaceholder')}
          height={40}
          error={Boolean(context?.errors.role_name_en)}
          errorMessage={context?.errors?.role_name_en?.message}
        />
      </Box>

      <FormHelperText className={`${classes.label}`}>{t('role.category')}</FormHelperText>

      <Controller
        name='role_type'
        render={(props) => (
          <RadioGroup
            value={props.value}
            onChange={(event) => props.onChange(Number(event.target.value))}
            aria-label='gender'
            className={classes.radioGroup}
          >
            <FormControlLabel disabled={!context?.hasUpdatePermission} value={0} control={<Radio />} label={t('select.all')} />
            <FormControlLabel disabled={!context?.hasUpdatePermission} value={1} control={<Radio />} label={t('select.national')} />
            <FormControlLabel disabled={!context?.hasUpdatePermission} value={2} control={<Radio />} label={t('select.international')} />
          </RadioGroup>
        )}
        control={context?.control}
      />

      <FormHelperText className={`${classes.label} ${classes.settingLabel}`}>
        {t('role.permission')}
        {context?.errors.menus_buttons_id && <ErrorMessage className={classes.errorMessage} message={t('role.checkboxValidate')} />}
      </FormHelperText>

      {menuButtons.map((data) => (
        <Group key={data.id} isError={Boolean(context?.errors.menus_buttons_id)} title={isChinese ? data.menu_name_ch : data.menu_name_en}>
          <FormGroup>
            {data.sub_menu ? data.sub_menu.map((subItem) => <MenuGroup key={subItem.id} menuItem={subItem} />) : <MenuGroup menuItem={data} />}
          </FormGroup>
        </Group>
      ))}
    </>
  )
}

export default RoleModifier
