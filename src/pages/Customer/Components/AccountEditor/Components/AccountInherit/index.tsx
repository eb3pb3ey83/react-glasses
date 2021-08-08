import React from 'react'
import { Modal } from '@material-ui/core'
import { ReactComponent as CloseIcon } from 'src/assets/icon/sm-modalClose-icon.svg'
import AutoComplete from '../AutoComplete'
import { Props } from './model'
import useGetCustomer from 'src/pages/Customer/services/getCustomer/hooks'
import { SelectItem } from '../AutoComplete/model'
import Button from 'src/shared/components/Button'
import { OptionsType, OptionTypeBase } from 'react-select'
import { getCustomerDetail } from 'src/pages/Customer/services/getCustomerDetail'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { useTranslation } from 'react-i18next'
import { transformDataToCheckBox } from 'src/pages/Customer/utils/transformDataToCheckBox'
import { AlertUnauthContext } from 'src/pages/model'
import useStyles from './useStyles'

const AccountInherit: React.FC<Props> = ({ formValues, setFormValues, companyId, open, onClose }) => {
  const { language } = useLanguage()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { t } = useTranslation()
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState<undefined | string>('')
  const [page, setPage] = React.useState(1)
  const [oldAllPage, setOldAllPage] = React.useState(1)
  const [oldPage, setOldPage] = React.useState(1)
  const [selectValue, setSelectValue] = React.useState<OptionTypeBase | OptionsType<OptionTypeBase> | null>(null)
  const [updatedOptions, setUpdatedOptions] = React.useState<SelectItem[] | []>([])
  const [optionsAll, setOptionsAll] = React.useState<SelectItem[] | []>([])
  const [isMaxPage, setIsMaxPage] = React.useState(false)
  const [localParams, setLocalParams] = React.useState({
    customer_id: companyId,
    open_flag: '1',
    order_by: '-created_time',
    role_type: '99',
    page_size: 5,
    user_name: '',
    filter: inputValue ? inputValue : '',
    page: page,
  })
  const { response, isLoading } = useGetCustomer(openUnAuthAlert, localParams, 1, isMaxPage)
  const maxPage = response?.data.pagination?.total_pages || 0

  React.useEffect(() => {
    if (page === 1) {
      setIsMaxPage(false)
    } else {
      setIsMaxPage(page > maxPage)
    }
    setLocalParams({
      customer_id: companyId,
      open_flag: '1',
      order_by: 'user_name',
      role_type: '99',
      page_size: 5,
      user_name: '',
      filter: inputValue ? inputValue : '',
      page: page,
    })
  }, [page, maxPage, inputValue, companyId])

  const onPageUpdated = (isInit: boolean) => {
    if (isInit) {
      return setPage(1)
    }
    setPage((op) => {
      return op + 1
    })
  }

  React.useEffect(() => {
    if (response && response.data.result_data.data.length === 0) {
      setUpdatedOptions([])
    } else if (response && page === 1) {
      const selectOpts = response.data.result_data.data.map((item) => ({
        label: `${item.user_name_ch}${item.job_title ? '-' + item.job_title : ''}`,
        value: item.user_id,
      }))
      setUpdatedOptions(selectOpts)
      if (!inputValue && optionsAll.length === 0) {
        setOptionsAll(selectOpts)
      }
    } else if (response && page !== 1 && page !== oldPage) {
      const selectOpts = response.data.result_data.data.map((item) => ({
        label: `${item.user_name_ch}${item.job_title ? '-' + item.job_title : ''}`,
        value: item.user_id,
      }))
      setOldPage(page)
      setUpdatedOptions((oldOptions) => [...(oldOptions as SelectItem[]), ...selectOpts])
      if (!inputValue) {
        if (page > oldAllPage) {
          setOptionsAll((oldOptions) => [...(oldOptions as SelectItem[]), ...selectOpts])
          setOldAllPage(page)
        }
      }
    }
  }, [response])

  const doCloseModal = () => {
    setSelectValue(null)
    onClose()
  }

  const doInherit = () => {
    if (!selectValue) return doCloseModal()
    getCustomerDetail(String((selectValue as SelectItem).value), language).then((val) => {
      const accountData = val?.data.result_data
      if (accountData) {
        const { localRoles_all, localRolse } = transformDataToCheckBox(accountData)
        let localFormValues = { ...formValues }
        localFormValues.role_type = accountData.role_type as '2' | '3'
        localFormValues['roles2'] = localRolse
        localFormValues['roles3'] = localRolse
        localFormValues['roles2_all'] = localRoles_all
        localFormValues['roles3_all'] = localRoles_all
        setFormValues(localFormValues)
        doCloseModal()
      }
    })
  }

  return (
    <Modal open={open} onClose={doCloseModal}>
      <div className={classes.body}>
        <CloseIcon onClick={doCloseModal} />
        <div className={classes.title}>{t('company.inheritAccountModalTitle')}</div>
        <AutoComplete
          isLoading={isLoading}
          options={inputValue ? updatedOptions : optionsAll}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onPageUpdated={onPageUpdated}
          page={page}
          onSelect={setSelectValue}
        />
        <div className={classes.btns}>
          <Button onClick={doCloseModal} isWhiteButton height={40} width='137px' type='button'>
            {t('button.cancel')}
          </Button>
          <Button onClick={doInherit} width='137px' height={40} type='button'>
            {t('reset16')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AccountInherit
