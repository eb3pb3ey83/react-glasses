import { FormHelperText } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useGetCustomerOptions } from 'src/pages/Customer/services/getCustomer/hooks'
import { AlertUnauthContext } from 'src/pages/model'
import AutoComplete from 'src/shared/components/AutoComplete'
import { SelectItem } from 'src/shared/components/AutoComplete/model'
import { Props } from './model'
import useStyles from './useStyles'

const CustomerSelector: React.FC<Props> = ({ onAdminNameFetched, disabled = false }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const [role_type, setRoleType] = React.useState('1')
  const [page, setPage] = React.useState(1)
  const [initialOption, setInitialOption] = React.useState<undefined | SelectItem>()
  const [inputValue, setInputValue] = React.useState('')
  const [currentOptions, setCurrentOptions] = React.useState<SelectItem[] | []>()
  const { t } = useTranslation()
  const { companyId } = useParams<{ companyId: string }>()
  const isSearchSuperAdmin = role_type === '1'
  const open_flag = isSearchSuperAdmin ? 'all' : '1' // 已開通的帳號

  const { selectorOptions, isFetched } = useGetCustomerOptions(openUnAuthAlert, {
    customer_id: companyId,
    filter: inputValue,
    open_flag,
    order_by: 'user_name',
    page,
    role_type,
  })

  const { setFieldValue, errors, values } = useFormikContext<{ company_name: string }>()
  const isError = values.company_name === '' && Boolean(errors.company_name)
  const classes = useStyles()

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
    if (selectorOptions.length === 0) {
      return
    }

    const currentItem = selectorOptions[0]

    const adminName = currentItem.label.split('-')[0].trim()

    setInitialOption(currentItem)
    onValueSelected(currentItem)
    onAdminNameFetched(adminName)
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
    <>
      <AutoComplete
        isDisabled={disabled}
        isError={isError}
        onValueSelected={onValueSelected}
        placeholder={t('company.searchERPplaceholder')}
        options={currentOptions as SelectItem[]}
        onPageUpdated={onPageUpdated}
        onInputChange={onInputChange}
        initialOption={initialOption}
        isLoading={!isFetched}
      />
      {isError && <FormHelperText className={classes.errorMessage}>{errors.company_name}</FormHelperText>}
    </>
  )
}

export default CustomerSelector
