import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './mobile-layout-fix.css'
import './final-nav.css'
import App from './App.tsx'
import { AppProvider } from './store/AppProvider.tsx'

// Mobile Chrome does not allow a site to enter fullscreen purely because the
// device was rotated. The first user gesture in landscape can, however, enter
// the Fullscreen API; this gives the installed/PWA-like experience when the
// browser permits it. The orientation handler also retries when activation is
// still available.
const tryLandscapeFullscreen = () => {
  if (!window.matchMedia('(pointer: coarse) and (orientation: landscape)').matches) return
  if (document.fullscreenElement) return

  const root = document.documentElement as HTMLElement & {
    requestFullscreen?: () => Promise<void>
  }

  root.requestFullscreen?.().catch(() => {
    // Browser policy can reject fullscreen without a user activation.
  })
}

document.addEventListener('pointerdown', tryLandscapeFullscreen, { passive: true })
window.addEventListener('orientationchange', tryLandscapeFullscreen)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)

