import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
// import 'react-perfect-scrollbar/dist/css/styles.css'
// import PerfectScrollbar from 'react-perfect-scrollbar'
import Header from 'src/shared/components/Header'
import Menu from 'src/shared/components/Menu'
import useGetMenuList from 'src/core/services/menu/hooks'
import { AlertUnauthContext, CountyRoleType, ResetPasswordType } from './model'
import useSysLanguage from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/hooks'
import { AreaSysCode } from 'src/shared/components/RadioGroupWithLabel/model'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import ResetPassword from 'src/shared/components/ResetPassword'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import useStyles from './useStyles'
import { useTranslation } from 'react-i18next'
import ScrollToTopOnMount from 'src/shared/components/ScrollToTopOnMount'

const Home = lazy(() => import('./Home'))
const ErrorPage = lazy(() => import('./ErrorPage'))
const Role = lazy(() => import('./Role'))
const User = lazy(() => import('./Account'))
const Faq = lazy(() => import('./Faq'))
const LoginBanner = lazy(() => import('./LoginBanner'))
const HomePageBanner = lazy(() => import('./HomePageBanner'))
const News = lazy(() => import('./News'))
const OtherPage = lazy(() => import('./OtherPage'))
const Contact = lazy(() => import('./Contact'))
const MainBanner = lazy(() => import('./HomePageBanner'))
const Customer = lazy(() => import('./Customer'))
const Product = lazy(() => import('./Product'))

const Pages: React.FC = () => {
  const { t } = useTranslation()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const unAuthAlert = React.useMemo(() => {
    return () =>
      openAlert({
        title: t('alert.authOverDueTitle'),
        content: t('alert.authOverDueDesc'),
        isDicidedMode: false,
        confirmBtnLabel: t('alert.authOverDueBtn'),
      })
  }, [])
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isResetPasswordOpen, setIsPasswordOpen] = React.useState(false)
  const { path } = useRouteMatch()
  const classes = useStyles()
  const { data } = useGetMenuList(unAuthAlert)
  const { response: responseLocal } = useSysLanguage(
    {
      code_type: AreaSysCode[1],
      open_flag: '1',
    },
    unAuthAlert,
  )
  const { response: responseForign } = useSysLanguage(
    {
      code_type: AreaSysCode[2],
      open_flag: '1',
    },
    unAuthAlert,
  )
  const roleType = data?.data.result_data.role_type
  const langListLocal = responseLocal?.data.result_data as SysLanguageItem[]
  const langListForign = responseForign?.data.result_data as SysLanguageItem[]

  const closeUnAuthAlert = () => {
    closeAlert()
    window.location.href = '/'
  }

  return (
    <div className={classes.root}>
      <Alert
        isDicidedMode={alertMessage.isDicidedMode as boolean}
        onClose={closeUnAuthAlert}
        open={isAlertOpen}
        title={alertMessage.title}
        content={alertMessage.content}
      />
      <AlertUnauthContext.Provider value={unAuthAlert}>
        <ResetPasswordType.Provider value={{ setIsPasswordOpen }}>
          <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </ResetPasswordType.Provider>
        <ResetPassword
          open={isResetPasswordOpen}
          onClose={() => setIsPasswordOpen(false)}
          onBackdropClick={() => setIsPasswordOpen(false)}
          isModifiedMode
        />
        <Menu menuData={data?.data?.result_data} />
        <main className={classes.content}>
          <div className={`${classes.container} custom_scrollbar`}>
            <ScrollToTopOnMount />
            {/* <PerfectScrollbar> */}
            <div className={classes.pageContainer}>
              <Suspense fallback={<div>Loading...</div>}>
                <CountyRoleType.Provider value={{ roleType, langListLocal, langListForign }}>
                  <Switch>
                    <Route path={`${path}/home`} exact component={Home} />
                    <Route path={`${path}/productmanagement`} component={Product} />
                    <Route path={`${path}/customermanagement`} component={Customer} />
                    <Route path={`${path}/newsmanagement`} component={News} />
                    <Route path={`${path}/usermanagement/role`} component={Role} />
                    <Route path={`${path}/usermanagement/account`} component={User} />
                    <Route path={`${path}/pagemanagement/loginBanner`} component={LoginBanner} />
                    <Route path={`${path}/pagemanagement/homebanner`} component={MainBanner} />
                    <Route path={`${path}/pagemanagement/faq`} component={Faq} />
                    <Route path={`${path}/pagemanagement/otherpage`} component={OtherPage} />
                    <Route path={`${path}/pagemanagement/contact`} component={Contact} />
                    <Route path={`${path}/pagemanagement/homebanner`} component={HomePageBanner} />
                    <Redirect exact from={path} to={`${path}/home`} />
                    <Route path='*'>
                      <ErrorPage />
                    </Route>
                  </Switch>
                </CountyRoleType.Provider>
              </Suspense>
            </div>
            {/* </PerfectScrollbar> */}
          </div>
        </main>
      </AlertUnauthContext.Provider>
    </div>
  )
}

export default Pages
