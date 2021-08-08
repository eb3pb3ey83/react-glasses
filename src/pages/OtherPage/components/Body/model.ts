export interface Props {
  list: listProps[] | undefined
  isLoading?: boolean
}

interface listProps {
  id: number
  title: string[]
  other_type: string
  country_type: string
  open_flag: string
  updated_time: string
  updated_user: Updateduser
}

interface Updateduser {
  user_name_ch: string
  user_name_en: string
}
