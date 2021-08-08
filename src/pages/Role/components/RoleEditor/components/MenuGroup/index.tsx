import React from 'react'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import CheckBoxGroup from 'src/shared/components/CheckBoxGroup'
import { FormToolsContext } from '../../context'
import MenuButtonsGroup from '../MenuButtonsGroup'
import { Props } from './model'

const MenuGroup: React.FC<Props> = ({ menuItem }) => {
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)

  return (
    <CheckBoxGroup
      disabled={!context?.hasUpdatePermission}
      isSelectAll={context?.checkIsSelectAll(menuItem.buttons)}
      isIndeterminate={context?.checkIsIndeterminate(menuItem.buttons)}
      handleSelectAll={() => context?.handleSelectAll(menuItem.buttons)}
      title={isChinese ? menuItem.menu_name_ch : menuItem.menu_name_en}
    >
      <MenuButtonsGroup menuButtons={menuItem.buttons} />
    </CheckBoxGroup>
  )
}

export default MenuGroup
