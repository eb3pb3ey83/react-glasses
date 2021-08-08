import { FormHelperText } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useGetERPCompany from 'src/pages/Customer/services/getERPCompany/hooks'
import { ERPOptions } from 'src/pages/Customer/services/getERPCompany/model'
import AutoComplete from 'src/shared/components/AutoComplete'
import { SelectItem } from 'src/shared/components/AutoComplete/model'
import { Props } from './model'
import useStyles from './useStyles'

const ERPSelector: React.FC<Props> = ({ country_type, isCreate, companyName }) => {
  const [page, setPage] = React.useState(1)
  const [inputValue, setInputValue] = React.useState(() => (!isCreate ? companyName : ''))
  const [currentOptions, setCurrentOptions] = React.useState<SelectItem[] | []>()
  const { t } = useTranslation()
  const dataType = '2' // 全部的公司
  const { selectorOptions, isFetched } = useGetERPCompany({ dataType, country_type, page, filter: inputValue })
  const { setFieldValue, errors, values } = useFormikContext<{ company_name: string }>()
  const isError = values.company_name === '' && Boolean(errors.company_name)
  const classes = useStyles()

  const onPageUpdated = ({ isInit }: { isInit: boolean }) => {
    isInit ? setPage(1) : setPage((oldPage) => oldPage + 1)
  }

  const onInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  const onValueSelected = (selectItem: ERPOptions) => {
    setFieldValue('company_name', selectItem.value.company_name)
    setFieldValue('company_no', selectItem.value.company_no)
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

    handleChangedOption()
  }, [isFetched, page])

  return (
    <>
      <AutoComplete<ERPOptions>
        isDisabled={!isCreate}
        isError={isError}
        onValueSelected={onValueSelected}
        placeholder={t('company.searchERPplaceholder')}
        options={currentOptions as SelectItem[]}
        onPageUpdated={onPageUpdated}
        onInputChange={onInputChange}
        noOptionsMessage={() => t('company.noOptions')}
        {...(!isCreate && { initialOption: selectorOptions[0] })}
      />
      {isError && <FormHelperText className={classes.errorMessage}>{errors.company_name}</FormHelperText>}
    </>
  )
}

export default ERPSelector
