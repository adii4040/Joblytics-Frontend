import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import UpdateApplication from './pages/UpdateApplication'
import MapView from './pages/MapView'
import Analytics from './pages/Analytics'
import HeroDemo from './pages/HeroDemo'
import AnalyticsDemo from './pages/AnalyticsDemo'

import AuthLoader from './helper/AuthLoader'
import ProtectedRoutes from './helper/protectedRoute'

function App() {
  return (

    <AuthLoader>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hero" element={<HeroDemo />} />
        <Route path="/demo/analytics" element={<AnalyticsDemo />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/add-application" element={<AddApplication />} />
          <Route path="/update-application/:appId" element={<UpdateApplication />} />
          <Route path="/map-view" element={<MapView />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </AuthLoader>
  )
}

export default App
