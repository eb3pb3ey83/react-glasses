import React from 'react'
import { TableBody } from '@material-ui/core'
import BlueTable from 'src/shared/components/BlueTable'
import Loading from 'src/shared/components/Loading'
import NoResultsIcon from 'src/shared/components/BlueTable/NoResultsIcon'
import { Props } from './model'
import { useHistory } from 'react-router'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const loading = (
  <tr>
    <td>
      <Loading />
    </td>
  </tr>
)

const empty = (
  <tr style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
    <td>
      <NoResultsIcon />
    </td>
  </tr>
)

const Body: React.FC<Props> = ({ list, isLoading = 'false' }) => {
  const classes = useStyles()
  const history = useHistory()
  const { language } = useLanguage()
  const isCh = language === 'zh-TW'
  const { t } = useTranslation()

  const openDrawer = (id: number) => {
    history.push(`/pages/newsmanagement/edit/${id}`)
  }

  return (
    <TableBody className={classes.container}>
      {!isLoading
        ? list && list.length > 0
          ? list
              .filter(({ news_sections }) => news_sections.length > 0)
              .map(({ id, news_sections, country_type, updated_user, news_datestart, news_dateend, updated_time }) => (
                <BlueTable.ContentRow key={id} onClick={() => openDrawer(id)}>
                  <BlueTable.BodyCell scope='row' width='calc(100% * (234 / 914))'>
                    {news_sections[0]?.section_content}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell scope='row' width='calc(100% * (120 / 914))'>
                    {country_type === '1' ? t('select.national') : t('select.international')}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell scope='row' width='calc(100% * (200 / 914))'>
                    {news_datestart.split(' ')[0]} - {news_dateend ? news_dateend.split(' ')[0] : '不限'}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell scope='row' width='calc(100% * (160 / 914))'>
                    {isCh ? updated_user.user_name_ch : updated_user.user_name_en}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell scope='row' width='calc(100% * (200 / 914))'>
                    {updated_time}
                  </BlueTable.BodyCell>
                </BlueTable.ContentRow>
              ))
          : empty
        : loading}
    </TableBody>
  )
}

export default Body
