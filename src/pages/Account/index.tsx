import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import FilterPanel from 'src/shared/components/FilterPanel'
import BlueTable from 'src/shared/components/BlueTable'
import useRole from './services/role/hooks'
import Head from './components/Head'
import Body from './components/Body'
import Control from './components/Control'
import Title from './components/Title'
import { useAccountMachine } from './machineConfig/hooks'
import PageController from './components/PageController'
import RouterOutlet from './components/RouterOutlet'
import useAccount from './services/account/hooks'
import { AccountResponseModel } from './services/account/model'
import useDept from './services/depts/hooks'
import { RoleResponseModel } from './services/role/model'
import { DeptsResponseModel } from './services/depts/model'
import { useDrawerMachine } from 'src/shared/machine/drawerMachine/hooks'
import SnackBar from 'src/shared/components/SnackBar'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { AlertUnauthContext } from '../model'
import useStyles from './useStyles'

const Account: React.FC = () => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { openCreator, openEditor, closeDrawer } = useDrawerMachine({
    creatorUrl: '/pages/usermanagement/account/create',
    editorUrl: '/pages/usermanagement/account/edit',
    rootUrl: '/pages/usermanagement/account/',
  })
  const { openToast, closeToast, isToastOpen, toastMessage, autoHideDuration } = useToastMachine()
  const { changePage, changeOrder, changeDepts, changeRoles, changeOpenFlag, searchKeyword, context } = useAccountMachine()

  const { roleResponse, isRoleFetched } = useRole(context, openUnAuthAlert)
  const { deptResponse, isDeptFetched } = useDept(openUnAuthAlert)
  const { accountResponse, isAccountFetched } = useAccount(context, openUnAuthAlert)

  const roleList = roleResponse?.data.result_data
  const deptList = deptResponse?.data.result_data

  const accountList = accountResponse?.data.result_data
  const totalPage = accountResponse?.data.pagination.total_pages
  const classes = useStyles()

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
          {isDeptFetched && isRoleFetched && (
            <Control
              roleList={roleList as RoleResponseModel[]}
              deptList={deptList as DeptsResponseModel[]}
              changeDepts={changeDepts}
              changeRoles={changeRoles}
              changeOpenFlag={changeOpenFlag}
              searchKeyword={searchKeyword}
            />
          )}
        </FilterPanel.Control>
        <FilterPanel.Info>
          <TableContainer className={classes.tableContainer}>
            <BlueTable.Table>
              <Head sortMethod={changeOrder} />
              <Body openEditor={openEditor} isFetched={isAccountFetched} list={accountList as AccountResponseModel[]} />
            </BlueTable.Table>
          </TableContainer>
        </FilterPanel.Info>
      </FilterPanel.Container>
      <PageController totalPage={totalPage as number} currentPage={context.currentPage} changePage={changePage} />
      {isDeptFetched && isRoleFetched && (
        <RouterOutlet
          openToast={openToast}
          roleList={roleList as RoleResponseModel[]}
          deptList={deptList as DeptsResponseModel[]}
          closeDrawer={closeDrawer}
        />
      )}
    </>
  )
}

export default Account
