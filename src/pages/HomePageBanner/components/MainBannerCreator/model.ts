import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'

export interface Props {
  closeDrawer: () => void
  openToast: (message: string) => void
  roleType?: string
  langListLocal?: SysLanguageItem[]
  langListForign?: SysLanguageItem[]
}

export interface formBodyProps {
  ban_link: string
  ban_mobile_img_id: number
  ban_target: string
  ban_title: string
  ban_web_img_id: number
  language: string
}
