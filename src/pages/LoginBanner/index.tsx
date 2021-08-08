import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import FilterPanel from 'src/shared/components/FilterPanel'
import BlueTable from 'src/shared/components/BlueTable'
import Head from './components/Head'
import Body from './components/Body'
import RouterOutlet from './components/RouterOutlet'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import { Resultdata } from 'src/shared/services/getBanner/model'
import useLoginBanner from 'src/shared/services/getBanner/hooks'
import TableTitle from 'src/shared/components/TableTitle'
import authConfig from 'src/utils/authConfig'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { useTableHeads } from './hooks'
import { useTranslation } from 'react-i18next'

const hasAddPermission = authConfig.getPermissions('login:add')

const LoginBanner: React.FC = () => {
  const { tableHead } = useTableHeads()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { openToast, closeToast, isToastOpen, toastMessage } = useToastMachine()
  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: '/pages/pagemanagement/loginbanner/create',
    editorUrl: '/pages/pagemanagement/loginbanner/edit',
    rootUrl: '/pages/pagemanagement/loginbanner',
  })
  const { response, isFetched } = useLoginBanner({
    ban_type: '1',
  })
  const bannerList = response?.data.result_data as Resultdata[]
  const { t } = useTranslation()

  const doOpenCreator = () => {
    if (!bannerList) return
    if (bannerList.length === 5) {
      openAlert({
        title: t('alert.section7'),
        content: t('alert.section8'),
        isDicidedMode: true,
        onConfirm: () => {
          closeAlert()
        },
      })
      return
    }
    openCreator()
  }
  if (!bannerList) return null
  return (
    <>
      <SnackBar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={isToastOpen}
        onClose={closeToast}
        message={toastMessage}
        severity='success'
      />
      <Alert
        isDicidedMode={true}
        onConfirm={alertMessage.onConfirm}
        onClose={closeAlert}
        open={isAlertOpen}
        confirmBtnLabel={alertMessage.confirmBtnLabel}
        title={alertMessage.title}
        content={alertMessage.content}
      />
      <TableTitle hasPermission={hasAddPermission} title={t('loginBannerPages.pageTitle')} subTitle={t('title.drag')} onClick={doOpenCreator} />
      <FilterPanel.Container>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head headCells={tableHead} />
              <Body openEditor={openEditor} isFetched={isFetched} list={bannerList as Resultdata[]} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <RouterOutlet openToast={openToast} closeDrawer={closeDrawer} list={bannerList} />
    </>
  )
}

export default LoginBanner
