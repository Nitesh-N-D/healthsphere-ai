import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import ProtectedRoute from '../components/layout/ProtectedRoute'

// Public Pages
import Landing from '../pages/public/Landing'
import Encyclopedia from '../pages/public/Encyclopedia'
import DiseaseDetail from '../pages/public/DiseaseDetail'
import Pandemic from '../pages/public/Pandemic'
import DisclaimerPage from '../pages/public/Disclaimer'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Protected Pages
import Dashboard from '../pages/protected/Dashboard'
import Assistant from '../pages/protected/Assistant'
import BMICalculator from '../pages/protected/BMICalculator'
import HealthCharts from '../pages/protected/HealthCharts'
import RiskScore from '../pages/protected/RiskScore'
import Gamification from '../pages/protected/Gamification'
import HealthEntryForm from '../pages/protected/HealthEntryForm'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/add-entry': 'Add Health Entry',
  '/assistant': 'AI Health Assistant',
  '/calculators': 'Health Calculators',
  '/charts': 'Health Charts',
  '/risk-score': 'Risk Score',
  '/gamification': 'Achievements',
  '/encyclopedia': 'Disease Encyclopedia',
  '/pandemic': 'Pandemic Analytics',
  '/disclaimer': 'Disclaimer & References',
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isAuth = location.pathname === '/login' || location.pathname === '/register'

  if (isLanding || isAuth) {
    return <>{children}</>
  }

  const title = pageTitles[location.pathname]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title={title} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/encyclopedia/:id" element={<DiseaseDetail />} />
        <Route path="/pandemic" element={<Pandemic />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-entry" element={<ProtectedRoute><HealthEntryForm /></ProtectedRoute>} />
        <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
        <Route path="/calculators" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
        <Route path="/charts" element={<ProtectedRoute><HealthCharts /></ProtectedRoute>} />
        <Route path="/risk-score" element={<ProtectedRoute><RiskScore /></ProtectedRoute>} />
        <Route path="/gamification" element={<ProtectedRoute><Gamification /></ProtectedRoute>} />
      </Routes>
    </AppLayout>
  )
}