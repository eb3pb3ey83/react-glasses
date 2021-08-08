import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import { useTranslation } from 'react-i18next'
import BlueTable from 'src/shared/components/BlueTable'
import TableTitle from 'src/shared/components/TableTitle'
import Body from '../../components/Body'
import useGetProductType from '../../services/getProductType/hooks'
import Head from 'src/shared/components/BlueTable/Head'
import { useHistory, useRouteMatch } from 'react-router'
import { useProductHeadandBody } from '../../utils/SharedHooks'
import { ProductTypeResponse } from '../../services/getProductType/model'
// import ScrollToTopOnMount from 'src/shared/components/ScrollToTopOnMount'
// import { AxiosResponse } from 'axios'

const ProductType = () => {
  const { t } = useTranslation()
  const basePath = useRouteMatch().path
  const history = useHistory()
  const { getHeadandBody } = useProductHeadandBody('productType')
  const head = getHeadandBody()
  const { data, isLoading } = useGetProductType<ProductTypeResponse>()
  const productList = data?.data.result_data
  const doItemClick = (id?: number) => {
    if (!id) return
    history.push(`${basePath}/${id}`)
  }

  return (
    <div>
      {/* <ScrollToTopOnMount /> */}
      <TableTitle subTitle={t('product.landingSubTitle')} title={t('product.landingTitle')} />
      <TableContainer>
        <BlueTable.Table>
          <Head headCells={head} />
          <Body isLoading={isLoading} itemOnClick={doItemClick} list={productList} getHeadandBody={getHeadandBody} />
        </BlueTable.Table>
      </TableContainer>
    </div>
  )
}

export default ProductType
