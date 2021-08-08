import TableContainer from '@material-ui/core/TableContainer'
import React from 'react'
import Alert from 'src/shared/components/Alert'
import BlueTable from 'src/shared/components/BlueTable'
import FilterPanel from 'src/shared/components/FilterPanel'
import SnackBar from 'src/shared/components/SnackBar'
import TableTitle from 'src/shared/components/TableTitle'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import useLoginBanner from 'src/shared/services/getBanner/hooks'
import { Resultdata } from 'src/shared/services/getBanner/model'
import authConfig from 'src/utils/authConfig'
import Body from './components/Body'
import Control from './components/Control'
import Head from './components/Head'
import RouterOutlet from './components/RouterOutlet'
import { useHomePageBannerMachine } from './machineConfig/hooks'
import { useTableHeads } from './hooks'
import { useTranslation } from 'react-i18next'

const hasAddPermission = authConfig.getPermissions('main:add')

const HomePageBanner: React.FC = () => {
  const { tableHead } = useTableHeads()
  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: '/pages/pagemanagement/homebanner/create',
    editorUrl: '/pages/pagemanagement/homebanner/edit',
    rootUrl: '/pages/pagemanagement/homebanner',
  })
  const { openToast, closeToast, isToastOpen, toastMessage } = useToastMachine()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { searchCountryType, context } = useHomePageBannerMachine()
  const { response, isFetched } = useLoginBanner({
    country_type: context.country_type,
    ban_type: '2',
    open_flag: '1',
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
      <TableTitle hasPermission={hasAddPermission} onClick={doOpenCreator} title={t('homeBanner.title')} subTitle={t('title.drag')} />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchCountryType={searchCountryType} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head headCells={tableHead} />
              <Body openEditor={openEditor} isFetched={isFetched} list={bannerList as Resultdata[]} countryType={context.country_type} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <RouterOutlet openToast={openToast} list={bannerList} closeDrawer={closeDrawer} />
    </>
  )
}

export default HomePageBanner
