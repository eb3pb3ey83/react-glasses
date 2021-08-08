import { TableHead } from '@material-ui/core'
import React from 'react'
import BlueTable from 'src/shared/components/BlueTable'
import ItemWithSort from 'src/shared/components/ItemWithSort'
import { sortProps } from 'src/shared/components/ItemWithSort/model'
import { Props } from './model'

const Head: React.FC<Props> = ({ headCells }) => {
  return (
    <TableHead>
      <BlueTable.HeadRow>
        {headCells.map((item) => {
          return (
            <BlueTable.HeadCell key={item.id} width={item.width}>
              <ItemWithSort disabledSort sortDown={`-${item.sort}` as sortProps} sortUp={item.sort} width='100%'>
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
