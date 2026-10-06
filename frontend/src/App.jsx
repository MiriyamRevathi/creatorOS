import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CreatorProvider } from './context/CreatorContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from './components/common/Toast';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Landing Pages (Contributor 1)
import { Home } from './pages/landing/Home';
import { Features } from './pages/landing/Features';
import { Pricing } from './pages/landing/Pricing';
import { About } from './pages/landing/About';
import { Contact } from './pages/landing/Contact';
import { FAQ } from './pages/landing/FAQ';

// Auth Pages (Contributor 1)
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyAccount } from './pages/auth/VerifyAccount';

// Creator Pages (Contributor 1)
import { CreatorProfile } from './pages/creator/CreatorProfile';
import { EditProfile } from './pages/creator/EditProfile';
import { Portfolio } from './pages/creator/Portfolio';
import { Preferences } from './pages/creator/Preferences';

// Dashboard Pages (Contributor 1)
import { Dashboard } from './pages/dashboard/Dashboard';
import { Activity } from './pages/dashboard/Activity';
import { Notifications } from './pages/dashboard/Notifications';

// Settings Pages (Contributor 1)
import { Settings } from './pages/settings/Settings';

// Contributor 2 Pages (Ideas, Content Studio & Content Library)
import { IdeasPage } from './pages/IdeasPage';
import { ContentStudioPage } from './pages/ContentStudioPage';
import { ContentLibraryPage } from './pages/ContentLibraryPage';

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

                {/* Contributor 2 — Ideas, Content Studio & Content Library Routes */}
                <Route path="/ideas" element={<ProtectedRoute><DashboardLayout><IdeasPage /></DashboardLayout></ProtectedRoute>} />
                <Route path="/dashboard/ideas" element={<ProtectedRoute><DashboardLayout><IdeasPage /></DashboardLayout></ProtectedRoute>} />
                
                <Route path="/studio" element={<ProtectedRoute><DashboardLayout><ContentStudioPage /></DashboardLayout></ProtectedRoute>} />
                <Route path="/content" element={<ProtectedRoute><DashboardLayout><ContentStudioPage /></DashboardLayout></ProtectedRoute>} />
                <Route path="/dashboard/studio" element={<ProtectedRoute><DashboardLayout><ContentStudioPage /></DashboardLayout></ProtectedRoute>} />

                <Route path="/library" element={<ProtectedRoute><DashboardLayout><ContentLibraryPage /></DashboardLayout></ProtectedRoute>} />
                <Route path="/dashboard/library" element={<ProtectedRoute><DashboardLayout><ContentLibraryPage /></DashboardLayout></ProtectedRoute>} />

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
