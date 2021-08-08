import { Box } from '@material-ui/core'
import React from 'react'
import CountryRoleTypeSelect from 'src/shared/components/CountryRoleTypeSelect'
import { Props } from './model'

const Control: React.FC<Props> = ({ searchCountryType }) => {
  const onSelectChange = (event: React.ChangeEvent<{ value: '1' | '2' }>) => {
    searchCountryType(event.target.value)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <CountryRoleTypeSelect onSelectChange={onSelectChange} />
    </Box>
  )
}

export default Control
