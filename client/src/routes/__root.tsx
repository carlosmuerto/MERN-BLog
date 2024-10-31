import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <div>Hello "__root H"!</div>
      <Outlet />
      <div>Hello "__root F"!</div>
    </React.Fragment>
  ),
})
