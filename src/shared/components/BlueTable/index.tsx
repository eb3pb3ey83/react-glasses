import React from 'react'
import { Table as TableComponent, TableCell, TableRow } from '@material-ui/core'
import { useLabelLimitedCount } from './hooks'
import { Props } from './model'
import useStyles from './useStyles'

const Table: React.FC<Props> = ({ children, className = '', ...restProps }) => {
  const classes = useStyles({})

  return (
    <>
      <TableComponent {...restProps} className={`${classes.table} ${className}`} aria-label='customized table'>
        {children}
      </TableComponent>
    </>
  )
}

const HeadRow: React.FC<Props> = ({ children, ...restProps }) => {
  const classes = useStyles({})

  return (
    <>
      <TableRow {...restProps} classes={{ root: classes.headTableRow }} aria-label='customized table'>
        {children}
      </TableRow>
    </>
  )
}

const ContentRow: React.FC<Props> = ({ children, ...restProps }) => {
  const classes = useStyles({})

  return (
    <>
      <TableRow {...restProps} classes={{ root: classes.contentTableRow }} aria-label='customized table'>
        {children}
      </TableRow>
    </>
  )
}

const HeadCell: React.FC<Props> = ({ children, width, ...restProps }) => {
  const classes = useStyles({})

  return (
    <>
      <TableCell {...restProps} style={{ width }} classes={{ head: classes.tableHead }} aria-label='customized table'>
        {children}
      </TableCell>
    </>
  )
}

const BodyCell: React.FC<Props> = ({
  style,
  children,
  color,
  width,
  widthWatcher,
  hasLabel,
  isFetched,
  isLabelLoaded,
  accountList,
  ...restProps
}) => {
  const classes = useStyles({ hasLabel, isLabelLoaded })
  const { cellRef } = useLabelLimitedCount({ hasLabel, widthWatcher, isFetched, accountList })

  return (
    <>
      <TableCell {...restProps} ref={cellRef} classes={{ body: classes.tableBody }} style={{ width, color, ...style }} aria-label='customized table'>
        {children}
      </TableCell>
    </>
  )
}

export default { Table, HeadRow, ContentRow, HeadCell, BodyCell }
