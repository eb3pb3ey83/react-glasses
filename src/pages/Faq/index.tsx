import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import FilterPanel from 'src/shared/components/FilterPanel'
import BlueTable from 'src/shared/components/BlueTable'
import Head from './components/Head'
import Body from './components/Body'
import Control from './components/Control'
import { FaqResponseModel } from './services/queryListFaq/model'
import { useFaqMachine } from './machineConfig/hooks'
import RouterOutlet from './components/RouterOutlet'
import useQueryListFaq from './services/queryListFaq/hooks'
import { useTableHeads } from './hooks'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import TableTitle from 'src/shared/components/TableTitle'
import authConfig from 'src/utils/authConfig'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { useTranslation } from 'react-i18next'
import { AlertUnauthContext } from '../model'

const hasAddPermission = authConfig.getPermissions('faq:add')

const Faq: React.FC = () => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()
  const { searchCountryType, context } = useFaqMachine()
  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: '/pages/pagemanagement/faq/create',
    editorUrl: '/pages/pagemanagement/faq',
    rootUrl: '/pages/pagemanagement/faq',
  })
  const { data, isFetched } = useQueryListFaq(context, openUnAuthAlert)
  const faqList = data?.data.result_data
  const { t } = useTranslation()
  const { tableHead } = useTableHeads()

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
      <TableTitle hasPermission={hasAddPermission} title={t('faq.title')} subTitle={t('title.drag')} onClick={openCreator} />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchCountryType={searchCountryType} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head headCells={tableHead} />
              <Body openEditor={openEditor} countryType={context.country_type} isFetched={isFetched} list={faqList as FaqResponseModel[]} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <RouterOutlet openToast={openToast} closeDrawer={closeDrawer} />
    </>
  )
}

export default Faq
