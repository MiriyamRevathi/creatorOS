import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      setSubmitted(true);
      if (res.reset_token) {
        setResetToken(res.reset_token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Reset Password</h1>
          <p className="text-xs text-slate-500 text-center mt-1 mb-6">Enter your account email to receive instructions</p>

          {submitted ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
                Password reset instructions generated.
              </div>
              {resetToken && (
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg text-left text-xs font-mono break-all">
                  <p className="text-[10px] text-slate-500 font-sans mb-1">Demo Reset Link:</p>
                  <Link to={`/reset-password?token=${resetToken}`} className="text-brand-purple dark:text-brand-lavender underline">
                    /reset-password?token={resetToken}
                  </Link>
                </div>
              )}
              <Link to="/login">
                <Button variant="outline" className="w-full mt-4">Return to Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="creator@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
