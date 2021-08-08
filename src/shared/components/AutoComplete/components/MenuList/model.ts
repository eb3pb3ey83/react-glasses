import { GroupTypeBase, MenuListComponentProps, OptionTypeBase } from 'react-select'

export interface Props {
  isLoading?: boolean
  menuListProps: React.PropsWithChildren<MenuListComponentProps<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>>
}
