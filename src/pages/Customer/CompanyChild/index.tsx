import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import TableContainer from '@material-ui/core/TableContainer'
import BlueTable from 'src/shared/components/BlueTable'
import BTab from 'src/shared/components/BlueTabs'
import Head from '../Components/Head'
import FilterPanel from 'src/shared/components/FilterPanel'
import TableTitle from 'src/shared/components/TableTitle'
import PencilIcon from 'src/assets/icon/pencil-icon.svg'
import Control from '../ControlCustomer'
import useGetCustomer from '../services/getCustomer/hooks'
import { useAccountToastMachine, useCustomerMachine, useDealerMachine } from './machineConfig/hooks'
import { useTableHeads } from '../headCellsCustomer'
import Body from '../Components/Body/indexCustomer'
import BodyDealer from '../Components/Body/indexDealer'
import PageController from '../PageController'
import NavCrumbs from 'src/shared/components/NavCrumbs'
import useGetDealer from '../services/getDealer/hooks'
import { ResultdatumDealer } from '../services/getDealer/model'
import { useTableHeads as useTableDealerHeads } from '../headCellsDealer'
import { useTranslation } from 'react-i18next'
import { CompanyEditorRouterOutlet } from '../Components/RouterOutlet'
import SnackBar from 'src/shared/components/SnackBar'
import TableProvider from 'src/shared/components/TableProvider'
import authConfig from 'src/utils/authConfig'
import { Portal } from '@material-ui/core'
import SortProvider from 'src/shared/components/SortProvider'
import useStyles from './useStyles'
import { AlertUnauthContext } from 'src/pages/model'

const hasAddPermission = authConfig.getPermissions('company:add')
const hasEditPermission = authConfig.getPermissions('company:upd')

const CompanyChild: React.FC = () => {
  const { pathname } = useLocation()
  const isCompany = pathname.includes('company')
  const { tableHead } = useTableHeads()
  const { tableHead: tableDealerHead } = useTableDealerHeads()
  const history = useHistory()
  const { t } = useTranslation()
  const classes = useStyles()
  const [tabId, setTabId] = React.useState(1)
  const { companyId } = useParams<{ companyId: string }>()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

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

  const { changePage, changeOrder, searchKeyword, changeRole, changeFlag, context } = useCustomerMachine()
  const {
    changePage: changeDealerPage,
    changeOrder: changeDealerOrder,
    searchKeyword: searchDealerKeyWord,
    changeFlag: changeDealerFlag,
    context: contextDealer,
  } = useDealerMachine()

  const otherParams = React.useMemo(() => {
    return {
      customer_id: companyId,
      open_flag: context.open_flag,
      order_by: context.order,
      role_type: context.role_type as string,
      page_size: 10,
      user_name: context.keyword as string,
      page: context.page,
    }
  }, [context, companyId])

  const dealerParams = React.useMemo(() => {
    return {
      company_model: '2',
      parent_id: companyId,
      open_flag: contextDealer.open_flag,
      order_by: contextDealer.order,
      page_size: 10,
      company_name: contextDealer.keyword as string,
      page: contextDealer.page,
    }
  }, [contextDealer])

  const { response, isLoading } = useGetCustomer(openUnAuthAlert, otherParams, tabId)
  const { response: responseDealer, isLoading: isLoadingDealer } = useGetDealer(openUnAuthAlert, dealerParams, tabId)
  const totalPage = response?.data.pagination?.total_pages
  const companyNo = response?.data.result_data.company_no
  const customerList = response?.data.result_data.data
  const title = response?.data.result_data.company_name
  const totalPageDealer = responseDealer?.data.pagination?.total_pages
  const dealerList = responseDealer?.data.result_data

  const tabChange = (val: number) => {
    setTabId(val)
  }

  const editCompany = () => {
    history.push(`/pages/customermanagement/company/${companyId}/edit`)
  }

  // const [isToastError, setIsToastError] = React.useState(false)

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
      <NavCrumbs textList={[{ label: t('company.backToCM'), link: '/pages/customermanagement' }]} />
      <TableTitle
        btnIsWhite={true}
        btnStyle={{ background: '#fff', color: '#2664DF', border: '1px solid #9DB6E7' }}
        label={t('company.editCompanyBtn')}
        startIcon={<img src={PencilIcon} />}
        hasPermission={hasEditPermission}
        title={title || ''}
        onClick={editCompany}
      />
      <FilterPanel.Container>
        <BTab.Tabs className={classes.childTabs} value={tabId} onChange={(_e: unknown, evalue: string | number) => tabChange(evalue as number)}>
          <BTab.Tab label={t('company.tabMember')} value={1} />
          <BTab.Tab label={t('company.tabDealer')} value={2} />
        </BTab.Tabs>
        <div className={classes.divider} />
        <FilterPanel.Control>
          {tabId === 1 ? (
            <Control
              hasAddPermission={hasAddPermission}
              control_type={isCompany ? 'lv1Customer' : 'lv2Customer'}
              searchKeyword={searchKeyword}
              changeRole={changeRole}
              changeFlag={changeFlag}
            />
          ) : (
            <Control hasAddPermission={hasAddPermission} control_type='lv1Dealer' searchKeyword={searchDealerKeyWord} changeFlag={changeDealerFlag} />
          )}
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              {tabId === 1 ? (
                <>
                  <SortProvider value={{ currentSort: context.order, initializePage: () => changePage(1) }}>
                    <Head headCells={tableHead} sortMethod={changeOrder} />
                  </SortProvider>
                  <Body baseUrl={`/pages/customermanagement/company/${companyId}/account/edit/`} list={customerList} isLoading={isLoading} />
                </>
              ) : (
                <>
                  <SortProvider value={{ currentSort: contextDealer.order, initializePage: () => changeDealerPage(1) }}>
                    <Head headCells={tableDealerHead} sortMethod={changeDealerOrder} />
                  </SortProvider>
                  <BodyDealer companyId={companyId} list={dealerList as ResultdatumDealer[]} isLoading={isLoadingDealer} />
                </>
              )}
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      {tabId === 1 ? (
        <PageController totalPage={totalPage as number} currentPage={context.page} changePage={changePage} />
      ) : (
        <PageController totalPage={totalPageDealer as number} currentPage={contextDealer.page} changePage={changeDealerPage} />
      )}
      <CompanyEditorRouterOutlet companyName={title} companyNo={companyNo} />
    </TableProvider>
  )
}

export default CompanyChild
