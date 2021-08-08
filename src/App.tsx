import React, { lazy, Suspense } from 'react'
import { Box } from '@material-ui/core'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Loading from './shared/components/Loading'
import useSpreadsheet from './core/services/googleSpreadsheetToJson/hooks'
import PrivateRoute from './shared/components/PrivateRoute'

const Login = lazy(() => import('./login'))
const Reset = lazy(() => import('./reset'))
const Pages = lazy(() => import('./pages'))

const App: React.FC = () => {
  const { isFetched } = useSpreadsheet()
  const hasPermission = window.localStorage.getItem('ACCESS_TOKEN')

  return isFetched ? (
    <BrowserRouter>
      <Box height='100vh'>
        <Suspense fallback={<Loading />}>
          <Switch>
            {!hasPermission && (
              <Route strict sensitive path='/login'>
                <Login />
              </Route>
            )}
            <PrivateRoute strict sensitive path='/pages'>
              <Pages />
            </PrivateRoute>
            <Route strict sensitive path='/reset'>
              <Reset />
            </Route>
            <Redirect push from='/' to='/pages' />
          </Switch>
        </Suspense>
      </Box>
    </BrowserRouter>
  ) : (
    <Loading />
  )
}

export default App
