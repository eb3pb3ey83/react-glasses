import React from 'react'
import { useHistory, useParams } from 'react-router'
import TableContainer from '@material-ui/core/TableContainer'
import BlueTable from 'src/shared/components/BlueTable'
import Head from '../Components/Head'
import FilterPanel from 'src/shared/components/FilterPanel'
import TableTitle from 'src/shared/components/TableTitle'
import PencilIcon from 'src/assets/icon/pencil-icon.svg'
import authConfig from 'src/utils/authConfig'
import Control from '../ControlCustomer'
import useGetCustomer from '../services/getCustomer/hooks'
import { useAccountToastMachine, useCustomerMachine } from '../CompanyChild/machineConfig/hooks'
import { useTableHeads } from '../headCellsCustomer'
import Body from '../Components/Body/indexCustomer'
import PageController from '../PageController'
import NavCrumbs from 'src/shared/components/NavCrumbs'
import { useTranslation } from 'react-i18next'
import { CompanyEditorRouterOutlet } from '../Components/RouterOutlet'
import TableProvider from 'src/shared/components/TableProvider'
import { Portal } from '@material-ui/core'
import SnackBar from 'src/shared/components/SnackBar'
import SortProvider from 'src/shared/components/SortProvider'
import { AlertUnauthContext } from 'src/pages/model'

const hasAddPermission = authConfig.getPermissions('company:add')
const hasEditPermission = authConfig.getPermissions('company:upd')

const CompanyChild: React.FC = () => {
  const { tableHead } = useTableHeads()
  const { t } = useTranslation()
  // const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()
  const {
    openToast,
    closeAllToast,
    closeSuccessToast,
    closeEmailToast,
    isSuccessToastOpen,
    isEmailToastOpen,
    successToastMessage,
    autoHideDuration,
    emailToastMessage,
    isError,
    isEmailError,
  } = useAccountToastMachine()
  const { dealerid, companyId } = useParams<{ dealerid: string; companyId: string }>()
  const { changePage, changeOrder, searchKeyword, changeRole, changeFlag, context } = useCustomerMachine()
  const history = useHistory()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  const otherParams = React.useMemo(() => {
    return {
      customer_id: dealerid,
      open_flag: context.open_flag,
      order_by: context.order,
      role_type: context.role_type as string,
      page_size: 10,
      user_name: context.keyword as string,
      page: context.page,
    }
  }, [context, dealerid])

  const { response, isLoading } = useGetCustomer(openUnAuthAlert, otherParams, 1)
  const totalPage = response?.data.pagination.total_pages
  const customerList = response?.data.result_data.data
  const fatherTitle = response?.data.result_data.f_company_name
  const title = response?.data.result_data.company_name

  const onEditDealerBtnClick = () => {
    history.push(`/pages/customermanagement/company/${companyId}/dealer/${dealerid}/edit`)
  }

  return (
    <TableProvider value={{ openToast, closeToast: closeAllToast }}>
      <Portal>
        <SnackBar
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          open={isSuccessToastOpen}
          onClose={closeSuccessToast}
          message={successToastMessage}
          autoHideDuration={autoHideDuration}
          severity={isError ? 'error' : 'success'}
        />
        <SnackBar
          style={{ top: 74 }}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          open={isEmailToastOpen}
          onClose={closeEmailToast}
          message={emailToastMessage}
          autoHideDuration={autoHideDuration}
          severity={isEmailError ? 'error' : 'success'}
        />
      </Portal>
      <NavCrumbs textList={[{ label: t('back') + (fatherTitle as string) || '', link: `/pages/customermanagement/company/${companyId}` }]} />
      <TableTitle
        btnIsWhite={true}
        onClick={onEditDealerBtnClick}
        btnStyle={{ background: '#fff', color: '#2664DF', border: '1px solid #9DB6E7' }}
        label={t('company.editDealerBtn')}
        startIcon={<img src={PencilIcon} />}
        hasPermission={hasEditPermission}
        title={title || ''}
      />
      <FilterPanel.Container>
        <>
          <FilterPanel.Control>
            <Control
              hasAddPermission={hasAddPermission}
              control_type='lv2Customer'
              searchKeyword={searchKeyword}
              changeRole={changeRole}
              changeFlag={changeFlag}
            />
          </FilterPanel.Control>
          <FilterPanel.Info>
            <TableContainer>
              <BlueTable.Table>
                <SortProvider value={{ currentSort: context.order, initializePage: () => changePage(1) }}>
                  <Head headCells={tableHead} sortMethod={changeOrder} />
                </SortProvider>
                <Body baseUrl={`/pages/customermanagement/company/${companyId}/dealer/${dealerid}/edit/`} list={customerList} isLoading={isLoading} />
              </BlueTable.Table>
            </TableContainer>
          </FilterPanel.Info>
        </>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.page} changePage={changePage} />
      <CompanyEditorRouterOutlet />
    </TableProvider>
  )
}

export default CompanyChild
