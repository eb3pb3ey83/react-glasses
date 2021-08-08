import React from 'react'
import { components, ControlProps, GroupTypeBase, OptionTypeBase } from 'react-select'
import { ReactComponent as SearchIcon } from 'src/assets/icon/blue-search.svg'

const Control: React.FC<ControlProps<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>> = React.memo(({ children, ...props }) => {
  return (
    <components.Control {...props}>
      <SearchIcon />
      {children}
    </components.Control>
  )
})
Control.displayName = 'Control'
export default Control
