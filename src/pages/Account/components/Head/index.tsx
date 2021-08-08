import { TableHead } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BlueTable from 'src/shared/components/BlueTable'
import ItemWithSort from 'src/shared/components/ItemWithSort'
import { Props } from './model'

const Head: React.FC<Props> = ({ sortMethod }) => {
  const { t } = useTranslation()

  return (
    <TableHead>
      <BlueTable.HeadRow>
        <BlueTable.HeadCell width='11%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-user_name_ch' sortUp='user_name_ch'>
            {t('account.name')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='28%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-email' sortUp='email'>
            {t('account.email')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='28%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-created_time' sortUp='created_time'>
            {t('account.role')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='11%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-dept_id' sortUp='dept_id'>
            {t('account.dept')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='11%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-open_flag' sortUp='open_flag'>
            {t('account.status')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='11%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-created_time' sortUp='created_time'>
            {t('account.createDate')}
          </ItemWithSort>
        </BlueTable.HeadCell>
      </BlueTable.HeadRow>
    </TableHead>
  )
}

export default Head
