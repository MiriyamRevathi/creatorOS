import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CreatorProvider } from './context/CreatorContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from './components/common/Toast';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Landing Pages
import { Home } from './pages/landing/Home';
import { Features } from './pages/landing/Features';
import { Pricing } from './pages/landing/Pricing';
import { About } from './pages/landing/About';
import { Contact } from './pages/landing/Contact';
import { FAQ } from './pages/landing/FAQ';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyAccount } from './pages/auth/VerifyAccount';

// Creator Pages
import { CreatorProfile } from './pages/creator/CreatorProfile';
import { EditProfile } from './pages/creator/EditProfile';
import { Portfolio } from './pages/creator/Portfolio';
import { Preferences } from './pages/creator/Preferences';

// Dashboard Pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { Activity } from './pages/dashboard/Activity';
import { Notifications } from './pages/dashboard/Notifications';

// Settings Pages
import { Settings } from './pages/settings/Settings';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <CreatorProvider>
            <div className="min-h-screen bg-white dark:bg-brand-darkBg font-sans text-slate-800 dark:text-slate-100">
              <Routes>
                {/* Landing Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-account" element={<VerifyAccount />} />

                {/* Protected Creator Profile Routes */}
                <Route path="/creator/profile" element={<ProtectedRoute><CreatorProfile /></ProtectedRoute>} />
                <Route path="/creator/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                <Route path="/creator/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
                <Route path="/creator/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
                <Route path="/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

                {/* Protected Settings Routes */}
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <ToastContainer />
            </div>
          </CreatorProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
