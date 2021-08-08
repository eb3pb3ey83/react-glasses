import React, { useState } from 'react'
import Loading from 'src/shared/components/Loading'
import { Props } from './model'
import arrayMove from 'array-move'
import Drop from '../Drop'
import { Resultdata } from 'src/shared/services/getBanner/model'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useDndSortLoginPageBanner from '../../services/dndSortLogin/hooks'
import { SortLoginPageBannerModel } from '../../services/dndSortLogin/model'
import useStyles from './useStyles'

const loading = (
  <tbody>
    <tr>
      <td>
        <Loading />
      </td>
    </tr>
  </tbody>
)

const Body: React.FC<Props> = ({ list, isFetched, openEditor }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  const isCh = language === 'zh-TW'
  const { mutate } = useDndSortLoginPageBanner()
  const [getList, setList] = useState<Resultdata[]>()
  //需補移動觸發編輯
  const onSortEndFtn = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return
    const moverArr = arrayMove(getList as Resultdata[], oldIndex, newIndex)
    setList(moverArr)
    if (getList && getList.length > 0) {
      const request: SortLoginPageBannerModel = {
        ban_type: '1',
        banner_id_list: moverArr?.map((i) => i.id),
      }
      mutate(request)
    }
  }

  React.useEffect(() => {
    isFetched && setList(list)
  }, [list])

  return (
    // <TableBody className={classes.container}>
    isFetched ? (
      <Drop
        useWindowAsScrollContainer
        distance={2}
        list={getList as Resultdata[]}
        isCh={isCh}
        onSortEnd={({ oldIndex, newIndex }) => onSortEndFtn(oldIndex, newIndex)}
        helperClass={classes.sortStartBg}
        openEditor={openEditor}
      />
    ) : (
      loading
    )
    // </TableBody>
  )
}

export default Body
