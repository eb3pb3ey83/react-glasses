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
        <BlueTable.HeadCell width='33%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-role_name_ch' sortUp='role_name_ch'>
            {t('role.name')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='33%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-role_type' sortUp='role_type'>
            {t('role.area')}
          </ItemWithSort>
        </BlueTable.HeadCell>
        <BlueTable.HeadCell width='34%'>
          <ItemWithSort sortMethod={sortMethod} sortDown='-created_time' sortUp='created_time'>
            {t('role.date')}
          </ItemWithSort>
        </BlueTable.HeadCell>
      </BlueTable.HeadRow>
    </TableHead>
  )
}

export default Head
