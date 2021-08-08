import React from 'react'
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'
import { FaqResponseModel } from '../../services/queryListFaq/model'
import { SortTableListInfo } from './model'
import DropItem from '../DropItem'
import { TableBody } from '@material-ui/core'

const Drop: React.ComponentClass<SortTableListInfo & SortableContainerProps, unknown> = SortableContainer((props: SortTableListInfo) => {
  return (
    <TableBody>
      {props.list &&
        props.list.map((item: FaqResponseModel, index) => {
          return <DropItem key={item.id} index={index} value={item} isCh={props.isCh} onClick={() => props.openEditor(item.id)} />
        })}
    </TableBody>
  )
})
export default Drop
