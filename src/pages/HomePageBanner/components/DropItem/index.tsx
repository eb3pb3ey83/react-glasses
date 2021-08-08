import React from 'react'
import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import BlueTable from 'src/shared/components/BlueTable'
import { SortTableItemInfo } from './model'
import dndIcon from 'src/assets/icon/sort-dnd-icon.svg'
import { useTranslation } from 'react-i18next'

const DropItem: React.ComponentClass<SortTableItemInfo & SortableElementProps> = SortableElement((props: SortTableItemInfo) => {
  const { t } = useTranslation()

  return (
    <div>
      <BlueTable.ContentRow index={props.index} onClick={props.onClick}>
        <BlueTable.BodyCell scope='row' width='calc(100% * (20 / 914))'>
          <img src={dndIcon} />
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='calc(100% * (150 / 914))'>
          <div
            style={{
              width: '133px',
              height: '34px',
              backgroundImage: `url(${props.value.banner_content.ban_web_img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='calc(100% * (90 / 914))'>
          <div
            style={{
              width: '40px',
              height: '34px',
              backgroundImage: `url(${props.value.banner_content.ban_mobile_img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='calc(100% * (200 / 914))'>
          {props.value.banner_content.ban_title}
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='calc(100% * (100 / 914))'>
          {props.value.country_type === '1' ? t('select.national') : t('select.international')}
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='calc(100% * (140 / 914))'>
          {props.value.country_type === '1' ? props.value.updated_user.user_name_ch : props.value.updated_user.user_name_en}
        </BlueTable.BodyCell>
        <BlueTable.BodyCell scope='row' width='calc(100% * (182 / 914))'>
          {props.value.updated_time}
        </BlueTable.BodyCell>
      </BlueTable.ContentRow>
    </div>
  )
})

export default DropItem
