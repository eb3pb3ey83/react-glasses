export interface Props {
  searchKeyword: (keyword: string) => void
  searchRoleType: (role: '1' | '2') => void
  changeIsPublic: (pub: string) => void
  roleType: '0' | '1' | '2' | undefined
}
