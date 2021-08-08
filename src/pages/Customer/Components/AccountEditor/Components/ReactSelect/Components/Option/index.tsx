import React from 'react'
import { components, GroupTypeBase, OptionProps, OptionTypeBase } from 'react-select'
import { ReactComponent as CheckIcon } from 'src/assets/icon/check-icon.svg'

const Option: React.FC<OptionProps<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>> = React.memo((props) => {
  return (
    <components.Option {...props}>
      {props.children}
      {props.isSelected && <CheckIcon />}
    </components.Option>
  )
})
Option.displayName = 'Option'
export default Option
