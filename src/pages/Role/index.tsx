import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import FilterPanel from 'src/shared/components/FilterPanel'
import BlueTable from 'src/shared/components/BlueTable'
import useRole from './services/role/hooks'
import Head from './components/Head'
import Body from './components/Body'
import Control from './components/Control'
import Title from './components/Title'
import { RoleResponseModel } from './services/role/model'
import { useRoleMachine } from './machineConfig/hooks'
import PageController from './components/PageController'
import RouterOutlet from './components/RouterOutlet'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'

const Role: React.FC = () => {
  const { changePage, changeOrder, searchKeyword, searchRoleType, context } = useRoleMachine()
  const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()
  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: '/pages/usermanagement/role/create',
    editorUrl: '/pages/usermanagement/role/edit',
    rootUrl: '/pages/usermanagement/role',
  })

  const { response, isRoleListFetched } = useRole(context)
  const roleList = response?.data.result_data
  const totalPage = response?.data.pagination.total_pages

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
      <Title openDrawer={openCreator} />
      <FilterPanel.Container>
        <FilterPanel.Control>
          <Control searchKeyword={searchKeyword} searchRoleType={searchRoleType} />
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer>
            <BlueTable.Table>
              <Head sortMethod={changeOrder} />
              <Body openEditor={openEditor} isFetched={isRoleListFetched} list={roleList as RoleResponseModel[]} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.currentPage} changePage={changePage} />
      <RouterOutlet openToast={openToast} closeDrawer={closeDrawer} />
    </>
  )
}

export default Role
