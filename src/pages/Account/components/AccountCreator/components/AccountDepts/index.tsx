import { Box, FormHelperText, MenuItem } from '@material-ui/core'
import React from 'react'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { FormToolsContext } from 'src/pages/Account/components/AccountCreator/context'
import { DeptsResponseModel, SubDept } from 'src/pages/Account/services/depts/model'
import Select from 'src/shared/components/Select'
import { Props } from './model'
import useStyles from './useStyles'

const Depts: React.FC<Props> = ({ deptList }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isChinese = language === 'zh-TW'
  const [mainDept, setMainDept] = React.useState<null | DeptsResponseModel>(null)
  const [sub_dept, setSubDept] = React.useState<null | SubDept>(null)
  const context = React.useContext(FormToolsContext)

  const onMainDeptsChange = (selectedId: number, formProps: ControllerRenderProps<Record<string, unknown>>) => {
    const selectedDept = deptList.find((item) => item.id === selectedId)

    setSubDept(null)
    selectedDept ? setMainDept(selectedDept) : setMainDept(null)
    formProps.onChange(String(selectedId))
  }

  const onSubDeptsChange = (selectedId: number, formProps: ControllerRenderProps<Record<string, unknown>>) => {
    const selectedDept = mainDept?.sub_dept.find((item) => item.id === selectedId)

    selectedDept ? setSubDept(selectedDept) : setSubDept(null)
    formProps.onChange(String(selectedId))
  }

  return (
    <>
      <FormHelperText className={`${classes.label} ${classes.settingLabel}`}>{t('account.dept')}</FormHelperText>
      <Box display='grid' gridTemplateColumns={mainDept?.sub_dept ? '1fr 1fr' : '1fr'} gridColumnGap={mainDept?.sub_dept ? '16px' : '0'}>
        <Controller
          name='mainDeptId'
          render={(props) => (
            <div className={classes.selectContainer}>
              <Select
                value={mainDept ? mainDept.id : ''}
                placeholder={t('account.deptPlaceholder')}
                defaultValue=''
                isError={Boolean(context?.errors.mainDeptId)}
                errorMessage={context?.errors.mainDeptId?.message}
                onChange={(event: React.ChangeEvent<{ value: number }>) => onMainDeptsChange(event.target.value, props)}
              >
                {deptList.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {isChinese ? value.dept_name_ch : value.dept_name_en}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          control={context?.control}
        />

        {mainDept?.sub_dept && (
          <Controller
            name='sub_deptId'
            render={(props) => (
              <div className={classes.selectContainer}>
                <Select
                  value={sub_dept ? sub_dept.id : ''}
                  placeholder={t('account.subDeptPlaceholder')}
                  isError={Boolean(context?.errors.sub_deptId)}
                  errorMessage={context?.errors.sub_deptId?.message}
                  onChange={(event: React.ChangeEvent<{ value: number }>) => onSubDeptsChange(event.target.value, props)}
                >
                  {mainDept.sub_dept.map((value) => (
                    <MenuItem key={value.id} value={value.id}>
                      {isChinese ? value.dept_name_ch : value.dept_name_en}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
            control={context?.control}
          />
        )}
      </Box>
    </>
  )
}

export default Depts
