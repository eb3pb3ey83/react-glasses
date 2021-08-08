import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import { useTranslation } from 'react-i18next'
import BlueTable from 'src/shared/components/BlueTable'
import TableTitle from 'src/shared/components/TableTitle'
import Body from '../../components/Body'
import { ReactComponent as PencilIcon } from 'src/assets/icon/pencil-icon.svg'
import useGetProductType from '../../services/getProductType/hooks'
import Head from 'src/shared/components/BlueTable/Head'
import { Route, Switch, useHistory, useParams } from 'react-router'
import NavCrumbs from 'src/shared/components/NavCrumbs'
import { useProductHeadandBody } from '../../utils/SharedHooks'
import FilterPanel from 'src/shared/components/FilterPanel'
import Control from 'src/shared/components/Control'
import { CountyRoleType } from 'src/pages/model'
import useGetProductList from '../../services/getProductList/hooks'
import ProductForm from '../../components/ProductForm'
import SortProvider from 'src/shared/components/SortProvider'
import PageController from 'src/shared/components/PageController'
import TableProvider from 'src/shared/components/TableProvider'
import Portal from '@material-ui/core/Portal'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { ProductTypeAndSubResponse } from '../../services/getProductType/model'
// import ScrollToTopOnMount from 'src/shared/components/ScrollToTopOnMount'
// import { AxiosResponse } from 'axios'

const ProductList = () => {
  const { roleType } = React.useContext(CountyRoleType)
  const { t } = useTranslation()
  const history = useHistory()
  const { isError, isToastOpen, toastMessage, autoHideDuration, closeToast, openToast: openToastSingle } = useToastMachine()
  const { product_id } = useParams<{ product_id?: string }>()
  const { data } = useGetProductType<ProductTypeAndSubResponse>({ type_id: product_id })
  const typeData = data?.data.result_data
  const [selectArea, setSelectArea] = React.useState('1')
  const [order, setOrder] = React.useState('product_info__product_name')
  const [page, setPage] = React.useState(1)

  const changeOrder = (cOrder: string) => {
    setOrder(cOrder)
  }

  const changePage = (toPage: number) => {
    setPage(toPage)
  }

  const productParams = {
    type_id: product_id ? parseInt(product_id) : undefined,
    country_type: roleType === '0' ? parseInt(selectArea) : roleType ? parseInt(roleType) : undefined,
    order,
    page,
    page_size: 10,
  }
  const { data: listData, isLoading: listLoading } = useGetProductList(productParams)
  const listArray = listData?.data.result_data
  const totalPage = listData?.data.pagination?.total_pages
  const { getHeadandBody } = useProductHeadandBody(typeData?.type_no)
  const head = getHeadandBody()

  //配件包不能drag and drop
  const isAccessory = typeData?.type_no === 'K'

  const doItemClick = (id?: number) => {
    if (!id) return
    // history.push(`${location.pathname}/${id}`)
    console.log(history)
  }

  const textList = [{ label: t('product.backToProductManage'), link: '/pages/productmanagement' }]
  const selectOption = [
    {
      defaultValue: '1',
      width: 180,
      onChange: setSelectArea,
      option: [
        { value: '1', label: t('select.national') },
        { value: '2', label: t('select.international') },
      ],
      style: { marginRight: '16px' },
      isDisplay: roleType === '0',
    },
  ]
  const buttonOption = {
    hasPermission: true,
    onClick: () => {
      history.push(`${product_id}/create-potion`)
    },
    label: t('product.btnCreateProduc'),
    style: { height: 40, width: 114, padding: '12px 14px' },
  }

  return (
    <div>
      <TableProvider value={{ openToastSingle, closeToast }}>
        <Portal>
          <SnackBar
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            open={isToastOpen}
            onClose={closeToast}
            message={toastMessage}
            autoHideDuration={autoHideDuration}
            severity={isError ? 'error' : 'success'}
          />
        </Portal>
        <NavCrumbs textList={textList} />
        {typeData && (
          <TableTitle
            btnIsWhite={true}
            onClick={() => null}
            hasPermission={true}
            label={t('product.buyingLimit')}
            startIcon={<PencilIcon />}
            subTitle={t('product.productListSubTitle')}
            title={typeData?.type_name}
          />
        )}
        <FilterPanel.Container>
          <FilterPanel.Control>
            <Control selects={selectOption} button={buttonOption} />
          </FilterPanel.Control>
          <FilterPanel.Info>
            <TableContainer>
              <BlueTable.Table>
                <SortProvider value={{ currentSort: order, initializePage: () => setPage(1) }}>
                  <Head headCells={head} sortMethod={changeOrder} />
                </SortProvider>
                <Body enabelDnd={!isAccessory} isLoading={listLoading} itemOnClick={doItemClick} list={listArray} getHeadandBody={getHeadandBody} />
              </BlueTable.Table>
            </TableContainer>
          </FilterPanel.Info>
        </FilterPanel.Container>
        {isAccessory && <PageController totalPage={totalPage as number} currentPage={page} changePage={changePage} />}

        <Switch>
          <Route path='/pages/productManagement/:product_id/create-potion'>
            <ProductForm isCreate={true} type_no={typeData?.type_no} />
          </Route>
        </Switch>
      </TableProvider>
    </div>
  )
}

export default ProductList
