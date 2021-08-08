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
  const { t } = useTranslation()
  const isCh = language === 'zh-TW'

  const openDrawer = (id: number) => {
    history.push(`/pages/pagemanagement/otherpage/edit/${id}`)
  }

  return (
    <TableBody className={classes.container}>
      {!isLoading
        ? list && list.length > 0
          ? list.map(({ id, title, country_type, updated_user, updated_time }) => (
              <BlueTable.ContentRow key={id} onClick={() => openDrawer(id)}>
                <BlueTable.BodyCell scope='row' width='calc(100% * (310 / 914))'>
                  {title[0]}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (120 / 914))'>
                  {country_type === '1' ? t('select.national') : t('select.international')}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (240 / 914))'>
                  {isCh ? updated_user.user_name_ch : updated_user.user_name_en}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (260 / 914))'>
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
