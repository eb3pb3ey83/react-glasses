import { FormHelperText } from '@material-ui/core'
import { FormikErrors, useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CheckBoxGroup from 'src/shared/components/FormikCheckBoxGroup'
import { FormSchema } from '../../model'
import { Props } from './model'
import useStyles from './useStyles'

const RoleCheckBoxGroup: React.FC<Props> = ({ menuBtns, ...restProps }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const formikContext = useFormikContext()

  return (
    <div>
      {menuBtns && (formikContext.values as FormSchema).role_type && menuBtns.length > 0 && (
        <div className={classes.checkBoxContainer}>
          {menuBtns.map((menu) =>
            menu.sub_menu
              ? menu.sub_menu.map((submenu) => (
                  <CheckBoxGroup
                    name={restProps.name}
                    id={submenu.id}
                    key={submenu.id}
                    checkButtons={submenu.buttons}
                    title={submenu.menu_name}
                    label={t('role.selectAll')}
                    disabled={!!restProps.disabled}
                  />
                ))
              : menu.buttons && (
                  <CheckBoxGroup
                    name={restProps.name}
                    disabled={!!restProps.disabled}
                    id={menu.id}
                    key={menu.id}
                    checkButtons={menu.buttons}
                    title={menu.menu_name}
                    label={t('role.selectAll')}
                  />
                ),
          )}
        </div>
      )}
      {menuBtns &&
        (formikContext.values as FormSchema).role_type &&
        menuBtns.length > 0 &&
        (formikContext.errors as FormikErrors<FormSchema>)[restProps.name] && (
          <FormHelperText className={`${classes.errorMessage} `}>{(formikContext.errors as FormikErrors<FormSchema>)[restProps.name]}</FormHelperText>
        )}
    </div>
  )
}

export default RoleCheckBoxGroup
