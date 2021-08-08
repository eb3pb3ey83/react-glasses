import React from 'react'
import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import BlueTable from 'src/shared/components/BlueTable'
import { SortTableItemInfo } from './model'
import dndIcon from 'src/assets/icon/sort-dnd-icon.svg'
import { useTranslation } from 'react-i18next'

const DropItem: React.ComponentClass<SortTableItemInfo & SortableElementProps, unknown> = SortableElement((props: SortTableItemInfo) => {
  const { t } = useTranslation()
  // const tableRow = classNames({
  //   [classes.tableRow]: true,
  //   [classes.clickStyle]: false,
  // })
  return (
    <BlueTable.ContentRow index={props.index} onClick={props.onClick}>
      <BlueTable.BodyCell scope='row' width='calc(100% * (20 / 914))'>
        <img src={dndIcon} />
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (394 / 914))'>
        {props.value.title}
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (100 / 914))'>
        {props.value.country_type === 'Abroad' ? t('select.international') : t('select.national')}
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (200 / 914))'>
        {props.isCh ? props.value.updated_user.user_name_ch : props.value.updated_user.user_name_en}
      </BlueTable.BodyCell>
      <BlueTable.BodyCell scope='row' width='calc(100% * (200 / 914))'>
        {props.value.updated_time}
      </BlueTable.BodyCell>
    </BlueTable.ContentRow>
  )
})

export default DropItem
