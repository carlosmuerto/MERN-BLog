import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/profile')({
  component: () => <div>Hello /dashboard/profile!</div>,
})
