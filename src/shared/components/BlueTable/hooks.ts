import { throttle } from 'lodash'
import React from 'react'
import { AccountResponseModel } from 'src/pages/Account/services/account/model'

interface Model {
  hasLabel?: boolean
  isFetched?: boolean
  widthWatcher?: (count: number) => void
  accountList?: AccountResponseModel[]
}

export const useLabelLimitedCount = ({ hasLabel, widthWatcher, isFetched, accountList }: Model) => {
  const cellRef = React.useRef<null | HTMLElement>(null)

  const calcIsOverFlow = React.useCallback(
    throttle(() => {
      if (!cellRef.current) {
        return
      }

      widthWatcher && widthWatcher(0)

      const margin = 10
      const tableCell = cellRef.current
      const tableCellPadding = 50
      const tableCellWidth = tableCell.clientWidth - tableCellPadding

      const childNodeWidths = [...cellRef.current.children].map((node) => ({
        width: node.clientWidth + margin,
        count: 0,
        hasOverFlow: false,
      }))

      const labelCalcResult = childNodeWidths.reduce(
        (accumulator, currentValue) => {
          const newResult = accumulator.width + currentValue.width
          const isOverFlow = newResult > tableCellWidth

          return {
            width: newResult,
            count: isOverFlow ? accumulator.count : accumulator.count + 1,
            hasOverFlow: isOverFlow ? true : false,
          }
        },
        { width: 0, count: 0, hasOverFlow: false },
      )

      if (labelCalcResult.hasOverFlow && widthWatcher) {
        widthWatcher(labelCalcResult.count)
      } else if (!labelCalcResult.hasOverFlow && widthWatcher) {
        widthWatcher(0)
      }
    }),
    [],
  )

  React.useLayoutEffect(() => {
    if (hasLabel && widthWatcher) {
      setTimeout(() => {
        calcIsOverFlow()
        window.addEventListener('resize', calcIsOverFlow)
      }, 200)
    }

    return () => window.removeEventListener('resize', calcIsOverFlow)
  }, [isFetched, hasLabel, accountList])

  return { cellRef }
}
