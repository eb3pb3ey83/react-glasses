import React, { useState } from 'react'
import Loading from 'src/shared/components/Loading'
import { Props } from './model'
import arrayMove from 'array-move'
import Drop from '../Drop'
import useStyles from './useStyles'
import { getPermission } from 'src/utils/getPermission'
import useDragDropSort from '../../services/doDragDropSort/hooks'
import { ListItem } from '../Drop/model'
import { SortRequest } from '../../services/doDragDropSort/model'
import NoResultsIcon from 'src/shared/components/BlueTable/NoResultsIcon'

const loading = (
  <tbody>
    <tr>
      <td>
        <Loading />
      </td>
    </tr>
  </tbody>
)
const empty = (
  <tr style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
    <td>
      <NoResultsIcon />
    </td>
  </tr>
)

const { hasUpdatePermission } = getPermission('product')

function Body<T>({ list, isLoading, itemOnClick, getHeadandBody, enabelDnd = true }: Props<T>) {
  const { mutate } = useDragDropSort()
  const classes = useStyles()
  const [getList, setList] = useState<T[]>()

  const onSortEndFtn = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return
    const moverArr = arrayMove(getList as T[], oldIndex, newIndex)
    setList(moverArr)
    if (moverArr && moverArr.length > 0) {
      const request: SortRequest = {
        type_id_list: moverArr.map((i) => (i as ListItem).id as number),
      }
      mutate(request)
    }
  }

  React.useEffect(() => {
    !!list && setList(list)
  }, [list])

  return !isLoading ? (
    list?.length === 0 ? (
      empty
    ) : (
      <Drop
        useWindowAsScrollContainer
        distance={2}
        list={getList}
        onSortEnd={({ oldIndex, newIndex }) => onSortEndFtn(oldIndex, newIndex)}
        itemOnClick={itemOnClick}
        helperClass={classes.sortStartBg}
        shouldCancelStart={() => !(hasUpdatePermission && enabelDnd)}
        getHeadandBody={getHeadandBody}
      />
    )
  ) : (
    loading
  )
}

export default Body
