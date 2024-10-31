import { createLazyFileRoute } from '@tanstack/react-router'
import Projects from '../pages/projects'

export const Route = createLazyFileRoute('/projects')({
  component: () => Projects,
})
