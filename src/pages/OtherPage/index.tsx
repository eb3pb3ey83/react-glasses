import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import BlueTable from 'src/shared/components/BlueTable'
import Head from './components/Head'
import FilterPanel from 'src/shared/components/FilterPanel'
import TableTitle from 'src/shared/components/TableTitle'
import Control from './Control'
import { useOtherPageMachine } from './machineConfig/hooks'
import { HeadCells } from './components/Head/model'
import Body from './components/Body'
import useGetOthers from './services/getOthers/hooks'
import PageController from './PageController'
import RouterOutlet from './components/RouterOutlet'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { Resultdatum } from './services/getOthers/model'
import { useTranslation } from 'react-i18next'

const OtherPage: React.FC = () => {
  const { language: userLang } = useLanguage()
  const { t } = useTranslation()

  const headCells: HeadCells[] = React.useMemo(() => {
    return [
      {
        id: 'title',
        label: t('title.title'),
        width: 'calc(100% * (310 / 914))',
      },
      {
        id: 'area',
        label: t('title.area'),
        width: 'calc(100% * (120 / 914))',
      },

      {
        id: 'updatedUser',
        label: t('title.lastUpdatedUser'),
        width: 'calc(100% * (240 / 914))',
      },
      {
        id: 'updatedTime',
        label: t('title.lastUpdatedTime'),
        width: 'calc(100% * (260 / 914))',
      },
    ]
  }, [userLang])
  const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()
  const { changePage, context, searchRoleType } = useOtherPageMachine()
  const otherParams = {
    open_flag: '1',
    country_type: context.role_type,
    page_size: 10,
    page: context.currentPage,
  }
  const { response, isLoading } = useGetOthers(otherParams)
  const totalPage = response?.data.pagination?.total_pages
  const ohtersList = response?.data.result_data as Resultdatum[]
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
      <TableTitle hasPermission={false} title='說明相關頁管理' />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchRoleType={searchRoleType} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head headCells={headCells} />
              <Body list={ohtersList} isLoading={isLoading} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.currentPage} changePage={changePage} />
      <RouterOutlet openToast={openToast} />
    </>
  )
}

export default OtherPage
