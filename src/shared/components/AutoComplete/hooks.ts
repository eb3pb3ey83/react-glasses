import React from 'react'
import { InputActionMeta } from 'react-select'
import { SelectItem, UseInputValueModel } from './model'

export const useSelectConfig = ({ initialOption, onInputChangeProps, onPageUpdated, determineDropUp }: UseInputValueModel) => {
  const [selectedOption, setSelectedOption] = React.useState<undefined | SelectItem | null>()
  const [inputValue, setInputValue] = React.useState('')
  const [optionValue, setOptionValue] = React.useState('')
  React.useEffect(() => {
    setSelectedOption(initialOption)
  }, [initialOption])

  React.useEffect(() => {
    const label = selectedOption?.label

    if (!label) return

    setInputValue(label)
    setOptionValue(label)
  }, [selectedOption])

  const handleInputEvent = (newValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue)
      determineDropUp && determineDropUp()
      onInputChangeProps && onInputChangeProps(newValue)
    } else if (actionMeta.action === 'set-value') {
      setOptionValue(inputValue)
      onInputChangeProps && onInputChangeProps(inputValue)
    }
  }

  const onInputValueEmpty = (newValue: string, actionMeta: InputActionMeta) => {
    onPageUpdated && onPageUpdated({ isInit: true })
    handleInputEvent(newValue, actionMeta)
  }

  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    const isValueEmpty = newValue.length === 0

    isValueEmpty ? onInputValueEmpty(newValue, actionMeta) : handleInputEvent(newValue, actionMeta)
  }

  const initializeOptions = () => {
    setInputValue('')
    setOptionValue('')
    setSelectedOption(null)
  }

  const handleOnBlur = () => {
    const hasValue = Boolean(optionValue)

    if (hasValue) {
      setInputValue(optionValue)
      onInputChangeProps && onInputChangeProps(optionValue)
    } else {
      setInputValue('')
    }
  }

  return { inputValue, handleInputChange, handleOnBlur, selectedOption, setSelectedOption, initializeOptions }
}
