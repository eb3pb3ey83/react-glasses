export interface Props {
  list: listProps[] | undefined
  isLoading?: boolean
  openEditor: (id: number) => void
}
interface listProps {
  id: number
  country_type: string
  updated_time: string
  companies: string[]
  updated_user_ch: string
  updated_user_en: string
  type_name: string
}
