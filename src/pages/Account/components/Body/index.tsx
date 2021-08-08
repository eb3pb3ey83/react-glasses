import { TableBody } from '@material-ui/core'
import React from 'react'
import BlueTable from 'src/shared/components/BlueTable'
import Loading from 'src/shared/components/Loading'
import { Props } from './model'
import Labels from 'src/shared/components/Labels'
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
  const [labelLimitedList, setLabelLimitedList] = React.useState<{ [id: number]: { count: number } }>({})
  const isLabelLoaded = Object.values(labelLimitedList).length > 0
  const { language } = useLanguage()
  const isCh = language === 'zh-TW'
  const openFlagColors = ['#F66363', '#0BCDA3', '#A6A9AD']

  return (
    <TableBody className={classes.container}>
      {isFetched
        ? list.length === 0
          ? empty
          : list.map(({ id, user_name_ch, user_name_en, email, roles, dept_name_ch, dept_name_en, open_flag, open_flag_name, created_time }) => {
              // 帳號啟用狀態
              const openFlagColor = openFlagColors[Number(open_flag)]

              return (
                <BlueTable.ContentRow key={id}>
                  <BlueTable.BodyCell onClick={() => openEditor(id)} scope='row' width='11%'>
                    {isCh ? user_name_ch : user_name_en}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell onClick={() => openEditor(id)} width='28%'>
                    {email}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell
                    onClick={() => openEditor(id)}
                    list={list}
                    accountList={list}
                    hasLabel
                    isLabelLoaded={isLabelLoaded}
                    isFetched={isFetched}
                    widthWatcher={(count) => setLabelLimitedList((oldList) => ({ ...oldList, [id]: { count } }))}
                    width='28%'
                  >
                    <Labels
                      limited={labelLimitedList[id]?.count > 0}
                      limitedLength={labelLimitedList[id]?.count}
                      selectedList={roles.map((value) => ({ name: isCh ? value.role_name_ch : value.role_name_en, id: value.id }))}
                    />
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell onClick={() => openEditor(id)} width='11%'>
                    {isCh ? dept_name_ch : dept_name_en}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell color={openFlagColor} onClick={() => openEditor(id)} width='11%'>
                    {open_flag_name}
                  </BlueTable.BodyCell>
                  <BlueTable.BodyCell onClick={() => openEditor(id)} width='11%'>
                    {created_time.slice(0, 10)}
                  </BlueTable.BodyCell>
                </BlueTable.ContentRow>
              )
            })
        : loading}
    </TableBody>
  )
}

export default Body
