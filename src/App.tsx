import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { HealthProvider } from './context/HealthContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HealthProvider>
          <AppRoutes />
        </HealthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
