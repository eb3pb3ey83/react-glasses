import React from 'react'
import { Box } from '@material-ui/core'
import { Props } from './model'
import CountryRoleTypeSelect from 'src/shared/components/CountryRoleTypeSelect'

const Control: React.FC<Props> = ({ searchRoleType }) => {
  const onSelectChange = (event: React.ChangeEvent<{ value: '1' | '2' }>) => {
    searchRoleType(event.target.value)
  }

  return (
    <Box display='flex'>
      <CountryRoleTypeSelect onSelectChange={onSelectChange} />
    </Box>
  )
}

export default Control
