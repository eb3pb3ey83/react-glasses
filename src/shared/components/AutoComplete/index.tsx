/* eslint-disable react/react-in-jsx-scope */
import { SelectItem } from './model'
import Select from 'react-select'
import MenuList from './components/MenuList'
import { Props } from './model'
import selectStyles from './useStyles'
import { useSelectConfig } from './hooks'
import { useDropUp } from './useDropUp'

function AutoComplete<OptionSchema>({
  options,
  onPageUpdated,
  onValueSelected,
  isError,
  initialOption,
  isLoading,
  onInputChange: onInputChangeProps,
  ...restProps
}: Props<OptionSchema>) {
  const { determineDropUp } = useDropUp()

  const { inputValue, handleInputChange, handleOnBlur, selectedOption, setSelectedOption, initializeOptions } = useSelectConfig({
    initialOption,
    onInputChangeProps,
    onPageUpdated,
    determineDropUp,
  })

  return (
    <Select
      {...restProps}
      inputValue={inputValue}
      value={selectedOption}
      options={options}
      components={{ MenuList }}
      styles={selectStyles(isError, isLoading)}
      onChange={(newValue) => {
        setSelectedOption(newValue as SelectItem)
        onValueSelected && onValueSelected(newValue as OptionSchema, initializeOptions)
      }}
      onMenuOpen={determineDropUp}
      onMenuScrollToBottom={() => onPageUpdated({ isInit: false })}
      captureMenuScroll={true}
      onInputChange={handleInputChange}
      onBlur={handleOnBlur}
    />
  )
}

export default AutoComplete
