import { Routes, Route, Navigate } from 'react-router-dom'

import AppShell from './components/layout/AppShell'
import {
  RequireAuth,
  RedirectIfAuthenticated,
} from './components/auth/RouteGuards'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Wardrobe from './pages/wardrobe/Wardrobe'
import AddClothing from './pages/wardrobe/AddClothing'
import EditClothing from './pages/wardrobe/EditClothing'
import Recommendation from './pages/recommendation/Recommendation'
import Lookbook from './pages/outfits/Lookbook'
import Calendar from './pages/outfits/Calendar'
import Profile from './pages/profile/Profile'

function App() {
  return (
    <Routes>
      {/* Public — signed-in visitors are sent on to the dashboard. */}
      <Route element={<RedirectIfAuthenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Authenticated application routes. */}
      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/wardrobe/add" element={<AddClothing />} />
          <Route path="/wardrobe/:id/edit" element={<EditClothing />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* First run is account creation; the guard forwards signed-in
          users straight to the dashboard. */}
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  )
}

export default App
