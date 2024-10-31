import { createLazyFileRoute } from '@tanstack/react-router'
import SignOut from '../pages/signOut'

export const Route = createLazyFileRoute('/signOut')({
  component: () => SignOut,
})
