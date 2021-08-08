import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { ReactComponent as SearchIcon } from 'src/assets/icon/blue-search.svg'
import { ReactComponent as CloseIcon } from 'src/assets/icon/close-round.svg'
import Input from '../Input'
import ListBox from './components/ListBox'
import { InputExtendedProps, Props } from './model'
import useStyles from './useStyles'

const SingleAutoComplete: React.FC<Props> = ({ pageKeywordName, options, placeholder, onSubmit, width, ...restProps }) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState('')
  const { localStorage } = window

  const filterValue = (valueList: string[]) => {
    return valueList.filter((value: string) => value !== inputValue)
  }

  const saveKeyword = (valueList: string[]) => {
    inputValue && localStorage.setItem(pageKeywordName, JSON.stringify(valueList))
  }

  const onInputValueSubmit = (event: React.KeyboardEvent) => {
    const isEnter = event.key === 'Enter'
    if (!isEnter) return
    const keyWordFromStorage = localStorage.getItem(pageKeywordName)
    let currentKeyWord: string[] | []

    if (keyWordFromStorage) {
      currentKeyWord = filterValue(JSON.parse(keyWordFromStorage)) as string[]
      saveKeyword([...currentKeyWord, inputValue].slice(-5))
    } else {
      saveKeyword([inputValue])
    }

    isEnter && onSubmit && onSubmit(inputValue)
  }

  const onRemoveButtonClick = () => {
    setInputValue('')
    onSubmit('')
  }

  return (
    <Autocomplete
      {...restProps}
      value={inputValue}
      freeSolo
      options={options}
      ListboxComponent={ListBox}
      onChange={(_event, selectedValue) => onSubmit(selectedValue as string)}
      renderInput={({ inputProps, InputProps }) => {
        const props = inputProps as InputExtendedProps

        return (
          <div className={classes.container} ref={InputProps.ref}>
            <Input
              inputProps={{
                ...props,
                onChange: (event: React.ChangeEvent<{ value: string }>) => {
                  props.onChange && props.onChange(event)
                  setInputValue(event.target.value)
                },
                onKeyDown: onInputValueSubmit,
              }}
              placeholder={placeholder}
              startAdornment={<SearchIcon width={20} />}
              width={width}
              height={40}
            />
            {inputValue && (
              <button className={classes.closeIcon} onClick={onRemoveButtonClick}>
                <CloseIcon />
              </button>
            )}
          </div>
        )
      }}
    />
  )
}

export default SingleAutoComplete
