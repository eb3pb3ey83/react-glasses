import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import BlueTable from 'src/shared/components/BlueTable'
import { SortTableItemInfo } from './model'
import dndIcon from 'src/assets/icon/sort-dnd-icon.svg'

function DropItem<T>() {
  return SortableElement((props: SortTableItemInfo<T>) => {
    return (
      <BlueTable.ContentRow index={props.index} onClick={props.onClick}>
        {props.bodyItem?.map((item) => {
          return !item.content ? (
            <BlueTable.BodyCell key={item.id} scope='row' width={item.width}>
              <img src={dndIcon} style={{ width: '20px' }} />
            </BlueTable.BodyCell>
          ) : (
            <BlueTable.BodyCell key={item.id} scope='row' width={item.width}>
              {item.content}
            </BlueTable.BodyCell>
          )
        })}

        {/* <BlueTable.BodyCell scope='row' width='calc(100% * (20 / 914))'>
          <img src={dndIcon} />
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='100%'>
          {props.value.type_name}{' '}
          {props.value.is_show === '0' && (
            <span>
              <Info />
              {t('product.productTypeNotShow')}
            </span>
          )}
        </BlueTable.BodyCell> */}
      </BlueTable.ContentRow>
    )
  })
}

export default DropItem()
