export interface Props {
  searchKeyword: (cp: string) => void
  searchCountryType: (ct: 'all' | '1' | '2') => void
  changeFlag: (flag: 'all' | '1' | '2' | '0') => void
}
