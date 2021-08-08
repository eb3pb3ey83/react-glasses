import React from 'react'
import { TableHead } from '@material-ui/core'
import BlueTable from 'src/shared/components/BlueTable'
import ItemWithSort from 'src/shared/components/ItemWithSort'
import { Props } from './model'

const Head: React.FC<Props> = ({ sortMethod, headCells }) => {
  return (
    <TableHead>
      <BlueTable.HeadRow>
        {headCells.map((item) => {
          return (
            <BlueTable.HeadCell key={item.id} width={item.width}>
              <ItemWithSort sortMethod={sortMethod} sortDown={`-${item.sort}`} sortUp={item.sort} width='100%'>
                {item.label}
              </ItemWithSort>
            </BlueTable.HeadCell>
          )
        })}
      </BlueTable.HeadRow>
    </TableHead>
  )
}

export default Head
