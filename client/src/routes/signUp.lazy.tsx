import { createLazyFileRoute } from '@tanstack/react-router'
import SignUp from '../pages/signUp'

export const Route = createLazyFileRoute('/signUp')({
  component: SignUp,
})
  