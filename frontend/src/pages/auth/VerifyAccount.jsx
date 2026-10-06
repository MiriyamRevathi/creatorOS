import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Spinner } from '../../components/common/Spinner';

export const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setMessage('Missing verification token.');
      return;
    }

    authService.verifyAccount(token)
      .then(res => {
        setSuccess(true);
        setMessage('Your account has been verified successfully!');
      })
      .catch(err => {
        setSuccess(false);
        setMessage(err.message || 'Account verification failed.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Account Verification</h1>

          {loading ? (
            <div className="py-8 flex flex-col items-center gap-3">
              <Spinner size="lg" />
              <p className="text-xs text-slate-500">Verifying your account credentials...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg text-xs font-semibold ${success ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                {message}
              </div>
              <Link to="/dashboard">
                <Button variant="primary" className="w-full">
                  {success ? 'Proceed to Dashboard' : 'Back to Home'}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
