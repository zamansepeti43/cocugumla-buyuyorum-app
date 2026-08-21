import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ActivityDetailPage } from './pages/ActivityDetailPage'
import { CreateChildPage } from './pages/CreateChildPage'
import { EnglishPage } from './pages/EnglishPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { ProgressPage } from './pages/ProgressPage'
import { WorldsPage } from './pages/WorldsPage'
import { WorldDetailPage } from './pages/WorldDetailPage'
import { SectionPage } from './pages/SectionPage'
import { ContentPlayerPage } from './pages/ContentPlayerPage'
import { ParentPage } from './pages/ParentPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/child/new" element={<CreateChildPage />} />

      {/* Doğa Dünyası is a standalone full-screen app scene. It must not be wrapped by
          AppLayout or ProtectedRoute, otherwise the shell/hydration redirect can prevent
          the scene from opening correctly. The scene itself only reads app state. */}
      <Route path="/worlds/forest" element={<WorldDetailPage />} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/worlds" element={<WorldsPage />} />
        <Route path="/worlds/:worldId" element={<WorldDetailPage />} />
        <Route path="/worlds/:worldId/section/:sectionId" element={<SectionPage />} />
        <Route path="/worlds/content/:contentId" element={<ContentPlayerPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetailPage />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/parent" element={<ParentPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
