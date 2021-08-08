export interface Props {
  isDrawerUrl: boolean
  companyName?: string
  companyNo?: string
  openToast?: (message: string) => void
}

export interface CompanyEditorRouterProps {
  companyName?: string
  companyNo?: string
}
