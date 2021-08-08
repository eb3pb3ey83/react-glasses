import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom'
import ProductType from './Router/ProductType'

const ProductList = lazy(() => import('./Router/ProductList'))

const Product = () => {
  const basePath = useRouteMatch().path
  return (
    <Router>
      <Switch>
        <Route path={`${basePath}/:product_id`}>
          <ProductList />
        </Route>
        <Route path={basePath}>
          <ProductType />
        </Route>
      </Switch>
    </Router>
  )
}

export default Product
