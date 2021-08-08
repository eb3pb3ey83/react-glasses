import React from 'react'
import Pagination from 'src/shared/components/Pagination'
import { Props } from './model'

const PageController: React.FC<Props> = ({ totalPage, currentPage, changePage }) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    changePage(value)
  }

  return <Pagination shape='rounded' count={totalPage} page={currentPage} onChange={handleChange} />
}

export default PageController
