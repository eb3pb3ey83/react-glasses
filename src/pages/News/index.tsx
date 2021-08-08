import React, { useContext } from 'react'
import TableTitle from 'src/shared/components/TableTitle'
import TableContainer from '@material-ui/core/TableContainer'
import FilterPanel from 'src/shared/components/FilterPanel'
import BlueTable from 'src/shared/components/BlueTable'
import Head from 'src/shared/components/BlueTable/Head'
import Body from './components/Body'
import RouterOutlet from './components/RouterOutlet'
import { useHistory } from 'react-router-dom'
import { HeadCells } from './model'
import { useNewsMachine } from './machineConfig/hooks'
import useGetNews from './services/getNews/hooks'
import { AlertUnauthContext, CountyRoleType } from '../model'
import Control from './Control'
import PageController from './PageController'
import authConfig from 'src/utils/authConfig'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { useTranslation } from 'react-i18next'
import { Resultdatum } from './services/getNews/model'
const hasAddPermission = authConfig.getPermissions('news:add')

const News: React.FC = () => {
  const openUnAuthAlert = useContext(AlertUnauthContext)
  const history = useHistory()
  const { language: userLang } = useLanguage()
  const { t } = useTranslation()
  const { roleType } = useContext(CountyRoleType)
  const { changePage, changeOrder, searchKeyword, context, changeIsPublic, searchRoleType } = useNewsMachine()
  const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()

  const headCells: HeadCells[] = React.useMemo(() => {
    return [
      {
        id: 'title',
        sort: 'newssection__section_content',
        label: t('news.newsTitle'),
        width: 'calc(100% * (234 / 914))',
      },
      {
        id: 'area',
        sort: 'country_type',
        label: t('area.area'),
        width: 'calc(100% * (120 / 914))',
      },
      {
        id: 'createdTime',
        sort: 'news_datestart',
        label: t('news.distributionPeriod'),
        width: 'calc(100% * (200 / 914))',
      },
      {
        id: 'updatedUser',
        sort: userLang === 'zh-TW' ? 'user_name_ch' : 'user_name_en',
        label: t('news.lastEditedBy'),
        width: 'calc(100% * (160 / 914))',
      },
      {
        id: 'updatedTime',
        sort: 'updated_time',
        label: t('news.lastEditTime'),
        width: 'calc(100% * (200 / 914))',
      },
    ]
  }, [userLang])

  const newsParams = {
    country_type: parseInt(context.role_type),
    open_flag: 1,
    order: context.order_by,
    ...context,
  }

  const { response, isLoading } = useGetNews(newsParams, openUnAuthAlert)
  const totalPage = response?.data.pagination?.total_pages
  const newsList = response?.data.result_data as Resultdatum[]
  const openCreator = () => {
    if (!hasAddPermission) return
    history.push('/pages/newsmanagement/create')
  }

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
      <TableTitle hasPermission={hasAddPermission} onClick={openCreator} title={t('news.title')} />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchRoleType={searchRoleType} searchKeyword={searchKeyword} roleType={roleType} changeIsPublic={changeIsPublic} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head sortMethod={changeOrder} headCells={headCells} />
              <Body list={newsList} isLoading={isLoading} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.currentPage} changePage={changePage} />
      <RouterOutlet openToast={openToast} />
    </>
  )
}

export default News
