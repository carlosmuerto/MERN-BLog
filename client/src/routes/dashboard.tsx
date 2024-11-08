import { createFileRoute, redirect } from '@tanstack/react-router'
import Dashboard from '../pages/dashboard'


export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    console.log(context)
    if (!context.AuthState) {
      throw redirect({
        to: '/signIn',
      });
    }
  },
  component: Dashboard
})