import React from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Props } from './model'
import { FormToolsContext } from 'src/pages/Role/components/RoleCreator/context'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'

const MenuButtonsGroup: React.FC<Props> = ({ menuButtons }) => {
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)

  return (
    <>
      {menuButtons.map((button) => {
        const isChecked = Boolean(context?.selectedList.find((id: number) => button.id === id))

        return (
          <Controller
            key={button.id}
            name='menus_buttons_id'
            render={(props) => (
              <FormControlLabel
                onChange={() => props.onChange(context?.handleCheck(button.id, menuButtons))}
                control={<Checkbox checked={isChecked} />}
                label={isChinese ? button.button_name_ch : button.button_name_en}
              />
            )}
            control={context?.control}
          />
        )
      })}
    </>
  )
}

export default MenuButtonsGroup
