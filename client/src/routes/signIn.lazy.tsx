import { createLazyFileRoute } from '@tanstack/react-router'
import SignIn from '../pages/signIn'

export const Route = createLazyFileRoute('/signIn')({
  component: SignIn,
})
