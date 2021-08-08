import React from 'react'
import { TableBody } from '@material-ui/core'
import BlueTable from 'src/shared/components/BlueTable'
import Loading from 'src/shared/components/Loading'
import NoResultsIcon from 'src/shared/components/BlueTable/NoResultsIcon'
import { Props } from './model'
import { useHistory } from 'react-router'
import { ResultdatumDealer } from '../../services/getDealer/model'
import { OPEN_FLAG_COLORS } from 'src/shared/constants/openFlagColors'
import useStyles from './useStyles'

export const loading = (
  <tr>
    <td>
      <Loading />
    </td>
  </tr>
)

export const empty = (
  <tr style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
    <td>
      <NoResultsIcon />
    </td>
  </tr>
)

const Body: React.FC<Props> = ({ companyId, list, isLoading = 'false' }) => {
  const classes = useStyles()
  const history = useHistory()

  const goTo = (id: number) => {
    history.push(`/pages/customermanagement/company/${companyId}/dealer/${id}`)
  }

  return (
    <TableBody className={classes.container}>
      {!isLoading
        ? (list as ResultdatumDealer[] | undefined) && (list as ResultdatumDealer[]).length > 0
          ? (list as ResultdatumDealer[]).map(({ id, company_no, company_name, company_type_name, open_flag, user_name }) => (
              <BlueTable.ContentRow key={id} onClick={() => goTo(id)}>
                <BlueTable.BodyCell scope='row' width='calc(100% * (294 / 914))'>
                  {company_name}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {company_no}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
                  {company_type_name}
                </BlueTable.BodyCell>
                <BlueTable.BodyCell color={OPEN_FLAG_COLORS[Number(open_flag)]} scope='row' width='calc(100% * (140 / 914))'>
                  <span>{open_flag === '0' ? '停用' : open_flag === '1' ? '啟用' : '未開通'}</span>
                </BlueTable.BodyCell>
                <BlueTable.BodyCell scope='row' width='calc(100% * (200 / 914))'>
                  {user_name}
                </BlueTable.BodyCell>
              </BlueTable.ContentRow>
            ))
          : empty
        : loading}
    </TableBody>
  )
}

export default Body
