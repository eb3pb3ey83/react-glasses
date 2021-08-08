import { useTranslation } from 'react-i18next'
import React from 'react'
import { HeadCells } from './components/Head/model'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'

export const useTableHeads = () => {
  const { language } = useLanguage()
  const { t } = useTranslation()

  const tableHead: HeadCells[] = React.useMemo(
    () => [
      {
        id: '',
        sort: 'role_name_ch',
        label: '',
        width: 'calc(100% * (20 / 914))',
      },
      {
        id: 'pic',
        sort: 'role_name_ch',
        label: t('title.desktopThumbnails'),
        width: 'calc(100% * (144 / 914))',
      },
      {
        id: 'title',
        sort: 'role_name_ch',
        label: t('title.title'),
        width: 'calc(100% * (330 / 914))',
      },
      {
        id: 'country_type',
        sort: 'role_name_ch',
        label: t('title.lastUpdatedUser'),
        width: 'calc(100% * (210 / 914))',
      },
      {
        id: 'updated_user',
        sort: 'role_name_ch',
        label: t('title.lastUpdatedTime'),
        width: 'calc(100% * (210 / 914))',
      },
    ],
    [language],
  )

  return { tableHead }
}
