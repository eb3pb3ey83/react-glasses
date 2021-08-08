export interface Props {
  searchKeyword: (cp: string) => void
  changeRole?: (role: 'all' | '1' | '2' | '3') => void
  changeFlag: (flag: 'all' | '1' | '2' | '0') => void
  control_type: 'lv1Customer' | 'lv1Dealer' | 'lv2Customer'
  hasAddPermission?: boolean
}
