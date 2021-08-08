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
        id: 'user_name',
        sort: 'user_name',
        label: t('company.customerName'),
        width: 'calc(100% * (194 / 914))',
      },
      {
        id: 'email',
        sort: 'email',
        label: t('company.customerEmail'),
        width: 'calc(100% * (300 / 914))',
      },
      {
        id: 'role_type',
        sort: 'role_type',
        label: t('company.customerRole'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'open_flag',
        sort: 'open_flag',
        label: t('company.openFlag'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'created_time',
        sort: 'created_time',
        label: t('company.customerCreatedTime'),
        width: 'calc(100% * (140 / 914))',
      },
    ],
    [language],
  )

  return { tableHead }
}
