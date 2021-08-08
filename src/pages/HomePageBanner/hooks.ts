import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { HeadCells } from './model'

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
        id: 'desktopPic',
        sort: 'role_name_ch',
        label: t('title.desktopThumbnails'),
        width: 'calc(100% * (150 / 914))',
      },
      {
        id: 'mobilePic',
        sort: 'role_name_ch',
        label: t('homeBanner.mobileThumbnails'),
        width: 'calc(100% * (90 / 914))',
      },
      {
        id: 'title',
        sort: 'role_name_ch',
        label: t('title.title'),
        width: 'calc(100% * (200 / 914))',
      },
      {
        id: 'country_type',
        sort: 'role_name_ch',
        label: t('title.area'),
        width: 'calc(100% * (100 / 914))',
      },
      {
        id: 'updated_user',
        sort: 'role_name_ch',
        label: t('title.lastUpdatedUser'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'updated_time',
        sort: 'role_name_ch',
        label: t('title.lastUpdatedTime'),
        width: 'calc(100% * (182 / 914))',
      },
    ],
    [language],
  )

  return { tableHead }
}
