import React from 'react'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '../Button'
import plusIconSrc from 'src/assets/icon/plus.svg'
import SingleAutoComplete from '../SingleAutoComplete'
import { Props } from './model'
import Select from '../Select'

const Control = ({ autoComplete, selects, button }: Props) => {
  const keyWordFromStorage = window.localStorage.getItem(`${autoComplete?.key}Keywords`)

  const currentKeyWord = React.useMemo(() => {
    if (!keyWordFromStorage) return []
    return JSON.parse(keyWordFromStorage) as string[]
  }, [keyWordFromStorage])

  return (
    <Box display='flex' justifyContent={autoComplete ? 'space-between' : 'flex-end'}>
      {autoComplete && (
        <SingleAutoComplete
          pageKeywordName={autoComplete.key}
          placeholder={autoComplete.placeholder ? autoComplete.placeholder : ''}
          onSubmit={autoComplete.onSubmit}
          options={currentKeyWord}
        />
      )}
      <div>
        {selects?.map((select, index) => {
          return (
            select.isDisplay && (
              <Select
                key={index}
                defaultValue={select.defaultValue}
                inputProps={{ placeholder: select.placeholder, style: { color: 'transparent' } }}
                width={select.width ? select.width : 140}
                onChange={select.onChange}
                style={select.style}
              >
                {select.option.map((opt) => {
                  return (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  )
                })}
              </Select>
            )
          )
        })}
        {button?.hasPermission && (
          <Button
            style={button.style}
            width={button.width ? button.width : 115}
            height={button.height ? button.height : 40}
            onClick={button.onClick}
            fullWidth={false}
            type='button'
            startIcon={button.startIcon ? button.startIcon : <img src={plusIconSrc} alt='' />}
          >
            {button.label}
          </Button>
        )}
      </div>
    </Box>
  )
}

export default Control
