import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import Header from '../components/header'
import FooterComp from '../components/footer'
import { AppRouteContext } from '../components/appRouterProvider'

export const Route = createRootRouteWithContext<AppRouteContext>()({
  component: () => (
    <React.Fragment>
      <Header />
      <Outlet />
      <FooterComp />
    </React.Fragment>
  ),
})
