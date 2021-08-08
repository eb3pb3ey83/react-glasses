import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import BlueTable from 'src/shared/components/BlueTable'
import FilterPanel from 'src/shared/components/FilterPanel'
import TableTitle from 'src/shared/components/TableTitle'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { HeadCells } from '../Components/Head/model'
import { useCompanyMachine } from '../machineConfig/hooks'
import useGetCompany from '../services/getCompany/hooks'
import Control from '../Control'
import Head from '../Components/Head'
import Body from '../Components/Body'
import { Resultdatum } from '../services/getCompany/model'
import PageController from '../PageController'
import TableProvider from 'src/shared/components/TableProvider'
import SortProvider from 'src/shared/components/SortProvider'
import SnackBar from 'src/shared/components/SnackBar'
import { CustomerUrl } from '../model'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import { CompanyEditorRouterOutlet } from '../Components/RouterOutlet'
import { Portal } from '@material-ui/core'
import authConfig from 'src/utils/authConfig'
import { useAccountToastMachine } from '../CompanyChild/machineConfig/hooks'
import { AlertUnauthContext } from 'src/pages/model'

const hasAddPermission = authConfig.getPermissions('company:add')

const Customer: React.FC = () => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  const headCells: HeadCells[] = React.useMemo(() => {
    return [
      {
        id: 'company_name',
        sort: 'company_name',
        label: t('company.companyName'),
        width: 'calc(100% * (300 / 914))',
      },
      {
        id: 'company_no',
        sort: 'company_no',
        label: t('company.companyNo'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'company_type',
        sort: 'company_type',
        label: t('company.companyType'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'open_flag',
        sort: 'open_flag',
        label: t('company.openFlag'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'user_name',
        sort: 'user_name',
        label: t('company.admin'),
        width: 'calc(100% * (194 / 914))',
      },
    ]
  }, [language])

  const { changePage, changeOrder, searchKeyword, searchCountryType, changeFlag, context } = useCompanyMachine()
  const otherParams = {
    open_flag: context.open_flag,
    order_by: context.order,
    company_model: '1',
    country_type: context.country_type as string,
    page_size: 10,
    page: context.page,
    company_name: context.keyword,
  }
  const { response, isLoading } = useGetCompany(otherParams, openUnAuthAlert)
  const totalPage = response?.data.pagination?.total_pages
  const companyList = response?.data.result_data

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

  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: CustomerUrl.companyCreatorUrl,
    rootUrl: CustomerUrl.rootUrl,
  })

  return (
    <TableProvider value={{ openToast, closeToast: closeAllToast, openCreator, openEditor, closeDrawer }}>
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

      <TableTitle
        onClick={openCreator}
        label={t('company.addCompanyBtn')}
        hasPermission={hasAddPermission}
        title={t('company.companyManagementTitle')}
      />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchKeyword={searchKeyword} searchCountryType={searchCountryType} changeFlag={changeFlag} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <SortProvider value={{ currentSort: context.order, initializePage: () => changePage(1) }}>
                <Head headCells={headCells} sortMethod={changeOrder} />
              </SortProvider>
              <Body list={companyList as Resultdatum[]} isLoading={isLoading} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.page} changePage={changePage} />
      <CompanyEditorRouterOutlet />
    </TableProvider>
  )
}

export default Customer
