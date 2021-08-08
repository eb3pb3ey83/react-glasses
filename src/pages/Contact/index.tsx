import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import BlueTable from 'src/shared/components/BlueTable'
import Head from './components/Head'
import FilterPanel from 'src/shared/components/FilterPanel'
import TableTitle from 'src/shared/components/TableTitle'
import { useContactMachine } from './machineConfig/hooks'
import { HeadCells } from './components/Head/model'
import Body from './components/Body'
import PageController from './PageController'
import RouterOutlet from './components/RouterOutlet'
import useGetContact from './services/getContactList/hooks'
import Control from './Control'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import authConfig from 'src/utils/authConfig'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { Resultdatum } from './services/getContactList/model'
import { useTranslation } from 'react-i18next'
import { AlertUnauthContext } from '../model'

const hasAddPermission = authConfig.getPermissions('contact:add')

const Contact: React.FC = () => {
  const { language: userLang } = useLanguage()
  const { t } = useTranslation()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const headCells: HeadCells[] = React.useMemo(() => {
    return [
      {
        id: 'infocontactsection__company_name',
        sort: 'infocontactsection__company_name',
        label: t('contact.companyName'),
        width: 'calc(100% * (260 / 914))',
      },
      {
        id: 'area',
        sort: 'country_type',
        label: t('title.area'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'type',
        sort: 'type',
        label: t('role.category'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'updatedUser',
        sort: userLang === 'zh-TW' ? 'updated_user_ch' : 'updated_user_en',
        label: t('news.lastEditedBy'),
        width: 'calc(100% * (140 / 914))',
      },
      {
        id: 'updatedTime',
        sort: 'updated_time',
        label: t('news.lastEditTime'),
        width: 'calc(100% * (234 / 914))',
      },
    ]
  }, [userLang])
  const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()
  const { changePage, changeOrder, searchKeyword, searchCountryType: searchRoleType, context } = useContactMachine()
  const { response, isLoading } = useGetContact(context, openUnAuthAlert)

  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: '/pages/pagemanagement/contact/create',
    editorUrl: '/pages/pagemanagement/contact',
    rootUrl: '/pages/pagemanagement/contact',
  })

  const totalPage = response?.data.pagination?.total_pages
  const contacts = response?.data.result_data as Resultdatum[]
  return (
    <>
      <SnackBar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={isToastOpen}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={autoHideDuration}
        severity='success'
      />
      <TableTitle hasPermission={hasAddPermission} title='聯絡我們管理' onClick={openCreator} />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchKeyword={searchKeyword} searchRoleType={searchRoleType} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head headCells={headCells} sortMethod={changeOrder} />
              <Body list={contacts} isLoading={isLoading} openEditor={openEditor} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.currentPage} changePage={changePage} />
      <RouterOutlet openToast={openToast} closeDrawer={closeDrawer} />
    </>
  )
}

export default Contact
