import { MenuItem } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CountyRoleType } from 'src/pages/model'
import Select from '../Select'
import { Props } from './model'

const CountryRoleTypeSelect: React.FC<Props> = ({ onSelectChange }) => {
  const { roleType } = React.useContext(CountyRoleType)

  const hasAllroles = roleType === '0'
  const { t } = useTranslation()

  return (
    <>
      {hasAllroles && (
        <Select defaultValue='1' width={160} onChange={onSelectChange}>
          <MenuItem value='1'>{t('select.national')}</MenuItem>
          <MenuItem value='2'>{t('select.international')}</MenuItem>
        </Select>
      )}
    </>
  )
}

export default CountryRoleTypeSelect
