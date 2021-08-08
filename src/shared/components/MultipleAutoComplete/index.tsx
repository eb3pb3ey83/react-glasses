import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import ListBox from './components/ListBox'
import { Props } from './model'

const MultipleAutoComplete: React.FC<Props> = ({ options, placeholder, onChange, ...restProps }) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, selectedList: Props['options']) => {
    onChange(selectedList.map((value) => value.id))
  }

  return (
    <Autocomplete
      {...restProps}
      multiple
      onChange={handleChange}
      popupIcon={<></>}
      options={options}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      ListboxComponent={ListBox}
      renderInput={(params) => <TextField {...params} variant='outlined' placeholder={placeholder} />}
    />
  )
}

export default MultipleAutoComplete
