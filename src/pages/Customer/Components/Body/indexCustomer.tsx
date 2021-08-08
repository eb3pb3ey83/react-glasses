import React from 'react'
import { TableBody } from '@material-ui/core'
import BlueTable from 'src/shared/components/BlueTable'
import { customerProps } from './model'
import { useHistory } from 'react-router'
import { empty, loading } from '.'
import { OPEN_FLAG_COLORS } from 'src/shared/constants/openFlagColors'
import useStyles from './useStyles'

const Body: React.FC<customerProps> = ({ baseUrl, list, isLoading = false }) => {
  const classes = useStyles()
  const history = useHistory()

  const openDrawer = (id: number) => {
    history.push(`${baseUrl}${id}`)
  }

  return (
    <TableBody className={classes.container}>
      {!isLoading
        ? list && list.length > 0
          ? list.map(({ user_id, role_type_name, email, user_name_en, user_name_ch, open_flag, created_time }) => (
              <BlueTable.ContentRow key={user_id} onClick={() => openDrawer(user_id)}>
                <BlueTable.BodyCell scope='row' width='calc(100% * (194 / 914))'>
                  {user_name_en || user_name_ch}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (300 / 914))'>
                  {email}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {role_type_name}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell color={OPEN_FLAG_COLORS[Number(open_flag)]} scope='row' width='calc(100% * (140 / 914))'>
                  <span>{open_flag === '0' ? '停用' : open_flag === '1' ? '啟用' : '未開通'}</span>
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {created_time}
                </BlueTable.BodyCell>
              </BlueTable.ContentRow>
            ))
          : empty
        : loading}
    </TableBody>
  )
}

export default Body
