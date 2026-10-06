import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const SecuritySettings = () => {
  const { token } = useAuth();
  const { addToast } = useNotification();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('Validation Error', 'New passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    try {
      await userService.changePassword(token, currentPassword, newPassword);
      addToast('Password Changed', 'Your account password has been updated.', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      addToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Account Security & Passwords" subtitle="Update authentication credentials and login rules">
      <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
        <Input
          label="Current Password"
          type="password"
          required
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        <Input
          label="New Password"
          type="password"
          required
          placeholder="At least 6 characters"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <Input
          label="Confirm New Password"
          type="password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="primary" size="sm" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </Card>
  );
};
