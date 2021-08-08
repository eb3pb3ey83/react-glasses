import React from 'react'
import Select, { InputActionMeta, OptionsType, OptionTypeBase } from 'react-select'
import { Props } from './model'
import Control from '../ReactSelect/Components/Control'
import NoResultsIcon from 'src/shared/components/BlueTable/NoResultsIcon'
import Option from '../ReactSelect/Components/Option'
import MenuList from 'src/shared/components/AutoComplete/components/MenuList'
import { customStyles } from './customStyle'
import { useTranslation } from 'react-i18next'

function AutoComplete<OptionSchema>({ options, onPageUpdated, ...restProps }: Props<OptionSchema>) {
  const { t } = useTranslation()
  const handleInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    if (inputValue === restProps.inputValue) return
    if (actionMeta.action === 'input-change') {
      onPageUpdated(true)
      restProps.setInputValue(inputValue)
    }
  }

  const doPageUpdate = () => {
    onPageUpdated(false)
  }

  const onSelect = (value: OptionTypeBase | OptionsType<OptionTypeBase> | null) => {
    restProps.onSelect && restProps.onSelect(value)
  }

  return (
    <Select
      {...restProps}
      placeholder={t('company.inheritAccountSearchPlaceholder')}
      isLoading={restProps.isLoading as boolean}
      styles={customStyles(restProps.isLoading as boolean)}
      inputValue={restProps.inputValue}
      options={options}
      closeMenuOnSelect={false}
      menuIsOpen={true}
      filterOption={null}
      blurInputOnSelect={false}
      components={{ Option, Control, NoOptionsMessage: NoResultsIcon, MenuList }}
      onChange={onSelect}
      controlShouldRenderValue={false}
      onMenuScrollToBottom={doPageUpdate}
      captureMenuScroll={true}
      onInputChange={handleInputChange}
    />
  )
}

export default AutoComplete
