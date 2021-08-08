import React from 'react'
import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import BlueTable from 'src/shared/components/BlueTable'
import { SortTableItemInfo } from './model'
import dndIcon from 'src/assets/icon/sort-dnd-icon.svg'

const DropItem: React.ComponentClass<SortTableItemInfo & SortableElementProps, unknown> = SortableElement((props: SortTableItemInfo) => {
  return (
    <BlueTable.ContentRow index={props.index} onClick={props.onClick}>
      <BlueTable.BodyCell scope='row' width='calc(100% * (20 / 914))'>
        <img src={dndIcon} />
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (144 / 914))'>
        <div
          style={{
            width: '36px',
            height: '34px',
            backgroundImage: `url(${props.value.banner_content.ban_web_img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (330 / 914))'>
        {props.value.banner_content.ban_title}
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (210 / 914))'>
        {props.value.updated_user.user_name_ch}
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (210 / 914))'>
        {props.value.updated_time}
      </BlueTable.BodyCell>
    </BlueTable.ContentRow>
  )
})

export default DropItem
