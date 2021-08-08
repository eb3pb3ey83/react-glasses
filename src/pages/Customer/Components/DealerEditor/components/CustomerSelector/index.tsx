import { useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useGetCustomerOptions } from 'src/pages/Customer/services/getCustomer/hooks'
import { AlertUnauthContext } from 'src/pages/model'
import AutoComplete from 'src/shared/components/AutoComplete'
import { SelectItem } from 'src/shared/components/AutoComplete/model'

const CustomerSelector: React.FC<{ disabled: boolean }> = ({ disabled = false }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const [role_type, setRoleType] = React.useState('1')
  const [page, setPage] = React.useState(1)
  const [initialOption, setInitialOption] = React.useState<undefined | SelectItem>()
  const [inputValue, setInputValue] = React.useState('')
  const [currentOptions, setCurrentOptions] = React.useState<SelectItem[] | []>()
  const { t } = useTranslation()
  const { dealerid } = useParams<{ dealerid: string }>()
  const isSearchSuperAdmin = role_type === '1'
  const open_flag = isSearchSuperAdmin ? 'all' : '1' // 已開通的帳號

  const { selectorOptions, isFetched } = useGetCustomerOptions(openUnAuthAlert, {
    customer_id: dealerid,
    filter: inputValue,
    open_flag,
    order_by: 'user_name',
    page,
    role_type,
  })

  const { setFieldValue } = useFormikContext<{ company_name: string }>()

  const onPageUpdated = ({ isInit }: { isInit: boolean }) => {
    isInit ? setPage(1) : setPage((oldPage) => oldPage + 1)
  }

  const onInputChange = (newValue: string) => {
    setInputValue(newValue)
    setRoleType('all')
  }

  const onValueSelected = (selectItem: SelectItem) => {
    if (!selectItem) return

    setFieldValue('user_id', selectItem.value)
  }

  const handleInitialOption = () => {
    const currentItem = selectorOptions[0]

    setInitialOption(currentItem)
    onValueSelected(currentItem)
  }

  const handleChangedOption = () => {
    if (page === 1) {
      setCurrentOptions(selectorOptions)
    } else {
      setCurrentOptions((oldOptions) => [...(oldOptions as SelectItem[]), ...selectorOptions])
    }
  }

  React.useEffect(() => {
    if (!isFetched) return

    isSearchSuperAdmin ? handleInitialOption() : handleChangedOption()
  }, [isFetched, page])

  return (
    <AutoComplete
      isDisabled={disabled}
      onValueSelected={onValueSelected}
      placeholder={t('company.searchERPplaceholder')}
      options={currentOptions as SelectItem[]}
      onPageUpdated={onPageUpdated}
      onInputChange={onInputChange}
      initialOption={initialOption}
    />
  )
}

export default CustomerSelector
