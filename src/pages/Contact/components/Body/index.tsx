import React from 'react'
import { TableBody } from '@material-ui/core'
import BlueTable from 'src/shared/components/BlueTable'
import Loading from 'src/shared/components/Loading'
import NoResultsIcon from 'src/shared/components/BlueTable/NoResultsIcon'
import { Props } from './model'
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

const Body: React.FC<Props> = ({ list, isLoading = 'false', openEditor }) => {
  const classes = useStyles()
  // const history = useHistory()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isCh = language === 'zh-TW'

  // const openDrawer = (id: number) => {
  //   history.push(`/pages/pagemanagement/contact/edit/${id}`)
  // }

  return (
    <TableBody className={classes.container}>
      {!isLoading
        ? list && list.length > 0
          ? list.map(({ id, companies, country_type, updated_user_ch, updated_user_en, updated_time, type_name }) => (
              <BlueTable.ContentRow key={id} onClick={() => openEditor(id)}>
                <BlueTable.BodyCell scope='row' width='calc(100% * (260 / 914))'>
                  {companies[0]}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {country_type === '1' ? t('select.national') : t('select.international')}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {type_name}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {isCh ? updated_user_ch : updated_user_en}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (234 / 914))'>
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
