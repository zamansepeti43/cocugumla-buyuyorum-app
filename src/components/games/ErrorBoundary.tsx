import { Component, type ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error) => ReactNode
  onError?: (error: Error) => void
  name?: string
}

export interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error) {
    const label = this.props.name ? `[${this.props.name}]` : '[ErrorBoundary]'
    console.error(`${label} Caught engine error:`, error)
    this.props.onError?.(error)
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error)
      }
      return (
        <div style={{ padding: '16px', background: '#2d211f', borderRadius: '8px', color: '#f28b6f' }}>
          <strong>Etkileşimli oyun yüklenemedi</strong>
          <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
            {this.state.error.message}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
