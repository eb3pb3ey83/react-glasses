import React from 'react'
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'
import { SortTableListInfo } from './model'
import DropItem from '../DropItem'
import { Resultdata } from 'src/shared/services/getBanner/model'
import { TableBody } from '@material-ui/core'

const Drop: React.ComponentClass<SortTableListInfo & SortableContainerProps, unknown> = SortableContainer((props: SortTableListInfo) => {
  return (
    <TableBody>
      {props.list &&
        props.list.map((item: Resultdata, index) => {
          return (
            <DropItem
              key={item.id}
              onClick={() => props.openEditor && props.openEditor(item.id)}
              index={index}
              value={item}
              isCh={props.isCh}
              id={item.id}
            />
          )
        })}
    </TableBody>
  )
})
export default Drop
