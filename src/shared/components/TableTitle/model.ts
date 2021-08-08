export interface Props {
  onClick?: () => void
  subTitle?: string | null
  title: string
  hasPermission?: boolean
  label?: string
  startIcon?: JSX.Element
  btnStyle?: React.CSSProperties
  btnIsWhite?: boolean
}
