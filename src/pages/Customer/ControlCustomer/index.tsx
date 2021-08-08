import { Box, MenuItem } from '@material-ui/core'
import React from 'react'
import Button from 'src/shared/components/Button'
import Select from 'src/shared/components/Select'
import SingleAutoComplete from 'src/shared/components/SingleAutoComplete'
import plusIconSrc from 'src/assets/icon/plus.svg'
import { Props } from './model'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

const Control: React.FC<Props> = ({ hasAddPermission = false, searchKeyword, changeRole, changeFlag, control_type }) => {
  const keywordName = `${control_type}Keywords`
  const keyWordFromStorage = window.localStorage.getItem(keywordName)
  const history = useHistory()
  const { companyId, dealerid } = useParams<{ companyId: string; dealerid: string }>()
  const { t } = useTranslation()

  const currentKeyWord = React.useMemo(() => {
    if (!keyWordFromStorage) return []
    return JSON.parse(keyWordFromStorage) as string[]
  }, [keyWordFromStorage])

  const onInputSearch = (keyword: string) => {
    searchKeyword(keyword)
  }

  const onRoleChange = (event: React.ChangeEvent<{ value: 'all' | '1' | '2' | '3' }>) => {
    changeRole && changeRole(event.target.value)
  }

  const onOpenFlagChange = (event: React.ChangeEvent<{ value: 'all' | '0' | '1' | '2' }>) => {
    changeFlag(event.target.value)
  }

  const doAdd = () => {
    let url = 'dealerModification'
    if (control_type === 'lv2Customer') {
      url = 'dealer'
      return history.push(`/pages/customermanagement/company/${companyId}/${url}/${dealerid}/create`)
    }
    if (control_type === 'lv1Customer') {
      url = 'account'
    }
    history.push(`/pages/customermanagement/company/${companyId}/${url}/create`)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <SingleAutoComplete
        pageKeywordName={keywordName}
        placeholder={control_type === 'lv1Dealer' ? t('company.searchBarDealer') : t('company.searchBarName')}
        onSubmit={onInputSearch}
        options={currentKeyWord}
      />
      <div>
        {control_type !== 'lv1Dealer' && changeRole && (
          <Select
            defaultValue=''
            inputProps={{ placeholder: t('select.customerAuthority'), style: { color: 'transparent' } }}
            width={180}
            onChange={onRoleChange}
            style={{ marginRight: '16px' }}
          >
            <MenuItem value='all'>{t('select.customerAuthorityAll')}</MenuItem>
            <MenuItem value='1'>{t('company.admin')}</MenuItem>
            <MenuItem value='2'>{t('select.customerAuthorityManager')}</MenuItem>
            <MenuItem value='3'>{t('select.customerAuthorityUser')}</MenuItem>
          </Select>
        )}
        <Select
          defaultValue=''
          inputProps={{ placeholder: t('select.section1'), style: { color: 'transparent' } }}
          width={180}
          onChange={onOpenFlagChange}
        >
          <MenuItem value='all'>{t('select.section2')}</MenuItem>
          <MenuItem value='1'>{t('select.enable')}</MenuItem>
          <MenuItem value='0'>{t('select.disable')}</MenuItem>
          <MenuItem value='2'>{t('select.section3')}</MenuItem>
        </Select>
        {hasAddPermission && (
          <Button
            style={{ padding: '12px 14px', height: '40px', marginLeft: '16px' }}
            width={115}
            height={40}
            onClick={doAdd}
            fullWidth={false}
            type='button'
            startIcon={<img src={plusIconSrc} alt='' />}
          >
            {control_type === 'lv1Dealer' ? t('company.addDealerBtn') : t('company.addAccountBtn')}
          </Button>
        )}
      </div>
    </Box>
  )
}

export default Control
