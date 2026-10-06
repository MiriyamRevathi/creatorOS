import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const Register = () => {
  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, fullName, username);
      addToast('Account Created!', 'Welcome to CreatorOS! Let\'s set up your profile.', 'success');
      navigate('/creator/preferences');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Join CreatorOS</h1>
            <p className="text-xs text-slate-500 mt-1">Start your unified creator operating system</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 text-red-600 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="Jane Doe"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <Input
              label="Username"
              required
              placeholder="janedoe"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="jane@creator.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button type="submit" variant="primary" className="w-full mt-2" disabled={loading}>
              {loading ? 'Creating Account...' : 'Continue to Creator Setup'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-purple dark:text-brand-lavender font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
