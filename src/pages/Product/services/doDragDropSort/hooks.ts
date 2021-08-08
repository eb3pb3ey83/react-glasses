import React from 'react'
import { useMutation } from 'react-query'
import { AlertUnauthContext } from 'src/pages/model'
import { dragDropSort } from '.'
import { SortRequest } from './model'

export default function useDragDropSort() {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  return useMutation<unknown, unknown, SortRequest, unknown>((parm) => dragDropSort(parm, openUnAuthAlert))
}
