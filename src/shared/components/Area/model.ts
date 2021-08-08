export interface Props {
  setAreaValue: React.Dispatch<React.SetStateAction<string | number>>
  areaValue: string | number
  setTypeValue?: React.Dispatch<React.SetStateAction<string | number>>
  typeValue?: string | number
  disabled?: boolean
  isCreatePage: boolean
}

export interface ErrorDetailList {
  type?: string
  lan?: string
  index?: number
}
