import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { ListItem, ListParam, SortTableListInfo } from './model'
import DropItem from '../DropItem'
import { TableBody } from '@material-ui/core'

function Drop<T>() {
  return SortableContainer((props: SortTableListInfo<T>) => {
    return (
      <TableBody>
        {props.list &&
          props.list.map((item, index) => {
            return (
              <DropItem
                key={(item as ListItem).id as number}
                index={index}
                value={item as ListItem}
                bodyItem={props.getHeadandBody && props.getHeadandBody((item as unknown) as ListParam)}
                onClick={() => props.itemOnClick((item as ListItem).id as number)}
              />
            )
          })}
      </TableBody>
    )
  })
}
export default Drop()
