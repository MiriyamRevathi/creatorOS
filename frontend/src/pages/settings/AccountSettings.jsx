import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const AccountSettings = () => {
  const { user, token, updateUser } = useAuth();
  const { addToast } = useNotification();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await userService.updateAccount(token, { full_name: fullName, username });
      updateUser(updated);
      addToast('Account Settings Saved', 'Your account details have been updated.', 'success');
    } catch (err) {
      addToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Account Profile Settings" subtitle="Update your personal account details">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <Input
          label="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <Input
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          label="Email Address (Locked)"
          value={user?.email || ''}
          disabled
          helperText="Email address changes require re-verification."
        />
        <Button type="submit" variant="primary" size="sm" disabled={loading}>
          {loading ? 'Saving...' : 'Save Account Settings'}
        </Button>
      </form>
    </Card>
  );
};
