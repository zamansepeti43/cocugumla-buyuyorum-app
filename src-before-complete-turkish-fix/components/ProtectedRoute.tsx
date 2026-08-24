import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data } = useApp()
  return data.children.length > 0 ? children : <Navigate to="/child/new" replace />
}
