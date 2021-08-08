import { FormHelperText } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AutoComplete from 'src/shared/components/AutoComplete'
import { SelectItem } from 'src/shared/components/AutoComplete/model'
import { RequestProps } from '../../services/createOtherProduct/model'
import useGetProductERP from '../../services/getProductErp/hooks'
import { ERPOptions } from '../../services/getProductErp/model'
import { Props } from './model'
import useStyles from './useStyles'

const ERPSelector: React.FC<Props> = ({ label, disabled = false, isCreate, placeholder }) => {
  const [page, setPage] = React.useState(1)
  const [inputValue, setInputValue] = React.useState('')
  const [currentOptions, setCurrentOptions] = React.useState<SelectItem[] | []>()
  const { t } = useTranslation()

  const { selectorOptions, isFetched } = useGetProductERP({
    filter: inputValue ? inputValue : null,
    page,
    page_size: 10,
  })

  const { setFieldValue, errors, values } = useFormikContext<RequestProps>()
  const isError = values.product_no === '' && Boolean(errors.product_no)
  const classes = useStyles()

  const onPageUpdated = ({ isInit }: { isInit: boolean }) => {
    isInit ? setPage(1) : setPage((oldPage) => oldPage + 1)
  }

  const onInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  const onValueSelected = (selectItem: ERPOptions) => {
    setInputValue(selectItem.label)
    setFieldValue('product_no', selectItem.value)
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
    <div style={{ marginBottom: '24px' }}>
      {label && <FormHelperText className={` ${classes.blueInputLabel}`}>{label}</FormHelperText>}
      <AutoComplete<ERPOptions>
        isDisabled={disabled}
        isError={isError}
        onValueSelected={onValueSelected}
        placeholder={placeholder}
        options={currentOptions as SelectItem[]}
        onPageUpdated={onPageUpdated}
        onInputChange={onInputChange}
        isLoading={!isFetched}
        noOptionsMessage={() => t('company.noOptions')}
        {...(!isCreate && { initialOption: selectorOptions[0] })}
      />
      {isError && <FormHelperText className={classes.errorMessage}>{errors.product_no}</FormHelperText>}
    </div>
  )
}

export default ERPSelector
