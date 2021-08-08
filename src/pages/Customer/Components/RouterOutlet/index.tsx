import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CompanyEditorRouterProps, Props } from './model'
import { CustomerUrl } from '../../model'
import Loading from 'src/shared/components/Loading'

const pagesItem = [
  {
    path: CustomerUrl.companyCreatorUrl,
    lazy: lazy(() => import('../../Components/CompanyEditor')),
    componentProps: { isCreate: true },
    routerProps: {},
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.companyEditorUrl,
    lazy: lazy(() => import('../../Components/CompanyEditor')),
    componentProps: { isCreate: false },
    routerProps: {},
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.dealerCreateUrl,
    lazy: lazy(() => import('../../Components/DealerEditor')),
    componentProps: { isCreate: true },
    routerProps: { exact: true },
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.dealerEditUrl,
    lazy: lazy(() => import('../../Components/DealerEditor')),
    componentProps: { isCreate: false },
    routerProps: { exact: true },
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.lv1AccountCreatorUrl,
    lazy: lazy(() => import('../../Components/AccountEditor')),
    componentProps: { isCreate: true, isCompany: true },
    routerProps: { exact: true },
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.lv1AccountEditorUrl,
    lazy: lazy(() => import('../../Components/AccountEditor')),
    componentProps: { isCreate: false, isCompany: true },
    routerProps: { exact: true },
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.lv2AccountCreatorUrl,
    lazy: lazy(() => import('../../Components/AccountEditor')),
    componentProps: { isCreate: true, isCompany: false },
    routerProps: { exact: true },
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.lv2AccountEditorUrl,
    lazy: lazy(() => import('../../Components/AccountEditor')),
    componentProps: { isCreate: false, isCompany: false },
    routerProps: { exact: true },
    isDrawerUrl: true,
  },
  {
    path: CustomerUrl.dealerUrl,
    lazy: lazy(() => import('../../DealerChild')),
    componentProps: {},
    routerProps: { exact: false },
  },
  {
    path: CustomerUrl.companyChildUrl,
    lazy: lazy(() => import('../../CompanyChild')),
    componentProps: {},
    routerProps: { exact: false },
  },
]

const RouterOutlet: React.FC<Props> = ({ isDrawerUrl, companyName, companyNo }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {pagesItem
          .filter((item) => (isDrawerUrl ? item.isDrawerUrl : !item.isDrawerUrl))
          .map((item) => {
            return (
              <Route path={item.path} sensitive key={item.path} {...item.routerProps}>
                <item.lazy companyName={companyName} companyNo={companyNo} {...item.componentProps} />
              </Route>
            )
          })}
        <Redirect from={`${CustomerUrl.rootUrl}/*`} to={CustomerUrl.rootUrl} />
      </Switch>
    </Suspense>
  )
}

export const MainRouterOutlet: React.FC = () => <RouterOutlet isDrawerUrl={false} />
export const CompanyEditorRouterOutlet: React.FC<CompanyEditorRouterProps> = (props) => <RouterOutlet {...props} isDrawerUrl={true} />
