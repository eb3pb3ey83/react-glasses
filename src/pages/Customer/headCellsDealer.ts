import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'

interface HeadCells {
  id: string
  sort: string
  label: string
  width: string
}

export const useTableHeads = () => {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const tableHead: HeadCells[] = React.useMemo(
    () => [
      {
        id: 'company_name',
        sort: 'company_name',
        label: t('company.companyName'),
        width: 'calc(100% * (294 / 914))',
      },
      {
        id: 'company_no',
        sort: 'company_no',
        label: t('company.companyNo'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'company_type_name',
        sort: 'company_type_name',
        label: t('company.companyType'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'open_flag',
        sort: 'open_flag',
        label: t('company.openFlag'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'user_name',
        sort: 'user_name',
        label: t('company.dealerAdmin'),
        width: 'calc(100% * (200 / 914))',
      },
    ],
    [language],
  )

  return { tableHead }
}
