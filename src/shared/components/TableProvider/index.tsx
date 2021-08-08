import React from 'react'
import { TableContext } from './model'
import { Props } from './model'

const TableProvider: React.FC<Props> = ({ children, value }) => {
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export default TableProvider
