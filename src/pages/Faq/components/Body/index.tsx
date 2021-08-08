import React, { useState } from 'react'
import Loading from 'src/shared/components/Loading'
import { Props } from './model'
import { FaqResponseModel } from '../../services/queryListFaq/model'
import arrayMove from 'array-move'
import Drop from '../Drop'
import useDndSortFaq from '../../services/dndSortFaq/hooks'
import { SortFaqModel } from '../../services/dndSortFaq/model'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useStyles from './useStyles'
import { AlertUnauthContext } from 'src/pages/model'

const loading = (
  <tbody>
    <tr>
      <td>
        <Loading />
      </td>
    </tr>
  </tbody>
)

const Body: React.FC<Props> = ({ list, isFetched, countryType, openEditor }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { mutate } = useDndSortFaq(openUnAuthAlert)
  const classes = useStyles()
  const { language } = useLanguage()
  const isCh = language === 'zh-TW'
  const [getList, setList] = useState<FaqResponseModel[]>()

  const onSortEndFtn = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return
    const moverArr = arrayMove(getList as FaqResponseModel[], oldIndex, newIndex)
    setList(moverArr)
    if (moverArr && moverArr.length > 0) {
      const request: SortFaqModel = {
        country_type: countryType.toString(),
        faq_id_list: moverArr.map((i) => i.id),
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
        list={getList as FaqResponseModel[]}
        isCh={isCh}
        onSortEnd={({ oldIndex, newIndex }) => onSortEndFtn(oldIndex, newIndex)}
        openEditor={openEditor}
        helperClass={classes.sortStartBg}
      />
    ) : (
      loading
    )
    // </TableBody>
  )
}

export default Body
