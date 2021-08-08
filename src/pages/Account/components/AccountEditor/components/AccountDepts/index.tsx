import { Box, FormHelperText, MenuItem } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { FormToolsContext } from 'src/pages/Account/components/AccountEditor/context'
import Select from 'src/shared/components/Select'
import { useDeptList } from './hooks'
import { Props } from './model'
import useStyles from './useStyles'

const AccountDepts: React.FC<Props> = ({ deptList, disabled }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)
  const { onMainDeptsChange, onSubDeptsChange, mainDept, sub_dept } = useDeptList(deptList)

  return (
    <>
      <FormHelperText className={`${classes.label} ${classes.settingLabel}`}>{t('account.dept')}</FormHelperText>
      <Box
        display='grid'
        gridTemplateColumns={mainDept?.sub_dept ? '1fr 1fr' : '1fr'}
        gridColumnGap={mainDept?.sub_dept ? '16px' : '0'}
        marginBottom='20px'
      >
        <Controller
          name='mainDeptId'
          render={(props) => (
            <Select
              disabled={disabled}
              value={mainDept ? mainDept.id : ''}
              placeholder={t('account.deptPlaceholder')}
              defaultValue=''
              onChange={(event: React.ChangeEvent<{ value: number }>) => onMainDeptsChange(event.target.value, props)}
            >
              {deptList.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {isChinese ? value.dept_name_ch : value.dept_name_en}
                </MenuItem>
              ))}
            </Select>
          )}
          control={context?.control}
        />

        {mainDept?.sub_dept && (
          <Controller
            name='sub_deptId'
            render={(props) => (
              <Select
                disabled={disabled}
                value={sub_dept ? sub_dept.id : ''}
                placeholder={t('account.subDeptPlaceholder')}
                onChange={(event: React.ChangeEvent<{ value: number }>) => onSubDeptsChange(event.target.value, props)}
              >
                {mainDept.sub_dept.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {isChinese ? value.dept_name_ch : value.dept_name_en}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={context?.control}
          />
        )}
      </Box>
    </>
  )
}

export default AccountDepts
