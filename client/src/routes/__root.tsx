import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/header'
import FooterComp from '../components/footer'

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Header />
      <Outlet />
      <FooterComp />
    </React.Fragment>
  ),
})
