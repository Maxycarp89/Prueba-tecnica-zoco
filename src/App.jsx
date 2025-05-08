import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UsersPage from './pages/dashboard/UsersPage';
import UserDetailsPage from './pages/dashboard/UserDetailsPage';
import StudiesPage from './pages/dashboard/StudiesPage';
import AddressesPage from './pages/dashboard/AddressesPage';
import ProfilePage from './pages/dashboard/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/studies" element={<StudiesPage />} />
              <Route path="/addresses" element={<AddressesPage />} />
            </Route>
            
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:userId" element={<UserDetailsPage />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
