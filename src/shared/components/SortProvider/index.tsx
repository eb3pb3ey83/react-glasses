import React from 'react'
import { SortContext } from './model'
import { Props } from './model'

const SortProvider: React.FC<Props> = ({ children, value }) => {
  return <SortContext.Provider value={value}>{children}</SortContext.Provider>
}

export default SortProvider
