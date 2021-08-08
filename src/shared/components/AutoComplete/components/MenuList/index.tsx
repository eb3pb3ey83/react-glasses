import React from 'react'
import { GroupTypeBase, MenuListComponentProps, OptionTypeBase } from 'react-select'
import { components } from 'react-select'

const MenuList: React.FC<MenuListComponentProps<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>> = (props) => {
  return (
    <components.MenuList className='custom_scrollbar' {...props}>
      {props.children}
    </components.MenuList>
  )
}

export default MenuList
