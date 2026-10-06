import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreator } from '../../context/CreatorContext';
import { useNotification } from '../../context/NotificationContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const EditProfile = () => {
  const { profile, updateProfile, loading } = useCreator();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [niche, setNiche] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    website: ''
  });

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setNiche(profile.niche || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
      setBannerUrl(profile.banner_url || '');
      setSocialLinks({
        youtube: profile.social_links?.youtube || '',
        instagram: profile.social_links?.instagram || '',
        twitter: profile.social_links?.twitter || '',
        linkedin: profile.social_links?.linkedin || '',
        tiktok: profile.social_links?.tiktok || '',
        website: profile.social_links?.website || ''
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        display_name: displayName,
        niche,
        bio,
        avatar_url: avatarUrl,
        banner_url: bannerUrl,
        social_links: socialLinks
      });
      addToast('Profile Updated', 'Your creator profile details have been saved.', 'success');
      navigate('/creator/profile');
    } catch (err) {
      addToast('Update Failed', err.message, 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Creator Profile</h1>
            <p className="text-xs text-slate-500 mt-1">Update your brand identity, avatar, and social links</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/creator/profile')}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card title="Basic Information">
            <div className="space-y-4">
              <Input
                label="Display Name"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
              <Input
                label="Primary Niche / Category"
                placeholder="e.g., Tech & Design, Fitness, Gaming, Lifestyle"
                required
                value={niche}
                onChange={e => setNiche(e.target.value)}
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Creator Bio</label>
                <textarea
                  rows="4"
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-purple"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card title="Visual Media URLs">
            <div className="space-y-4">
              <Input
                label="Avatar Image URL"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
              />
              <Input
                label="Banner Image URL"
                placeholder="https://images.unsplash.com/..."
                value={bannerUrl}
                onChange={e => setBannerUrl(e.target.value)}
              />
            </div>
          </Card>

          <Card title="Social Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="YouTube Channel URL"
                value={socialLinks.youtube}
                onChange={e => setSocialLinks({...socialLinks, youtube: e.target.value})}
              />
              <Input
                label="Instagram Profile"
                value={socialLinks.instagram}
                onChange={e => setSocialLinks({...socialLinks, instagram: e.target.value})}
              />
              <Input
                label="Twitter / X Profile"
                value={socialLinks.twitter}
                onChange={e => setSocialLinks({...socialLinks, twitter: e.target.value})}
              />
              <Input
                label="LinkedIn Profile"
                value={socialLinks.linkedin}
                onChange={e => setSocialLinks({...socialLinks, linkedin: e.target.value})}
              />
              <Input
                label="TikTok Profile"
                value={socialLinks.tiktok}
                onChange={e => setSocialLinks({...socialLinks, tiktok: e.target.value})}
              />
              <Input
                label="Personal Website"
                value={socialLinks.website}
                onChange={e => setSocialLinks({...socialLinks, website: e.target.value})}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => navigate('/creator/profile')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
