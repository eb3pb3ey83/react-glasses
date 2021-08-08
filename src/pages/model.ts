import { createContext } from 'react'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'

export interface Menu {
  icon: string
  path: string
  name: string
  active: boolean
  key: string
}

export interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // eslint-disable-next-line react/require-default-props
  window?: () => Window
}

export interface contextProps {
  roleType?: '0' | '1' | '2'
  langListLocal?: SysLanguageItem[]
  langListForign?: SysLanguageItem[]
}

export interface resetPasswordProps {
  setIsPasswordOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const CountyRoleType = createContext<contextProps>({})

export const ResetPasswordType = createContext<resetPasswordProps>({})

export type AlertAuthProps = () => void

export const AlertUnauthContext = createContext<AlertAuthProps>(function () {
  return
})
