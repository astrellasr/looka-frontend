import { Routes, Route, Navigate } from 'react-router-dom'

import AppShell from './components/layout/AppShell'

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
      {/* Public — rendered without the app shell. */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Application routes. Auth guarding comes in a later task. */}
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

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
