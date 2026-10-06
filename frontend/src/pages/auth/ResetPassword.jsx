import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Set New Password</h1>

          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
                Password reset successfully!
              </div>
              <Link to="/login">
                <Button variant="primary" className="w-full">Sign In with New Password</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {error && <p className="text-xs text-red-500">{error}</p>}
              <Input
                label="New Password"
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                required
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Resetting...' : 'Update Password'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
