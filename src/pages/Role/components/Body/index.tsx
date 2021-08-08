import React from 'react'
import { TableBody } from '@material-ui/core'
import BlueTable from 'src/shared/components/BlueTable'
import Loading from 'src/shared/components/Loading'
import { Props } from './model'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import NoResultsIcon from 'src/shared/components/BlueTable/NoResultsIcon'
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

const Body: React.FC<Props> = ({ list, isFetched, openEditor }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'

  return (
    <TableBody className={classes.container}>
      {isFetched
        ? list?.length > 0
          ? list.map(({ id, role_name_ch, role_name_en, role_type, created_time }) => (
              <BlueTable.ContentRow key={id}>
                <BlueTable.BodyCell onClick={() => openEditor(id)} scope='row' width='33%'>
                  {isChinese ? role_name_ch : role_name_en}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell onClick={() => openEditor(id)} scope='row' width='33%'>
                  {role_type}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell onClick={() => openEditor(id)} scope='row' width='34%'>
                  {created_time.slice(0, 10)}
                </BlueTable.BodyCell>
              </BlueTable.ContentRow>
            ))
          : empty
        : loading}
    </TableBody>
  )
}

export default Body
