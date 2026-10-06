import React from 'react';
import { Link } from 'react-router-dom';
import { useCreator } from '../../context/CreatorContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Spinner } from '../../components/common/Spinner';
import { Youtube, Instagram, Twitter, Linkedin, ExternalLink, Edit3, Sliders, Briefcase } from 'lucide-react';

export const CreatorProfile = () => {
  const { user } = useAuth();
  const { profile, loading } = useCreator();

  if (loading || !profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  const socialIcons = {
    youtube: <Youtube className="w-4 h-4 text-red-600" />,
    instagram: <Instagram className="w-4 h-4 text-pink-600" />,
    twitter: <Twitter className="w-4 h-4 text-sky-500" />,
    linkedin: <Linkedin className="w-4 h-4 text-blue-700" />
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-brand-darkCard border border-slate-200 dark:border-slate-800 shadow-sm">
          <div
            className="h-44 md:h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.banner_url})` }}
          />
          <div className="px-6 pb-6 pt-0 flex flex-col md:flex-row items-start md:items-end justify-between -mt-14 md:-mt-16 gap-4">
            <div className="flex items-end gap-4">
              <Avatar
                src={profile.avatar_url}
                name={profile.display_name || user?.full_name}
                size="xl"
                className="border-4 border-white dark:border-brand-darkCard shadow-md"
              />
              <div className="mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {profile.display_name || user?.full_name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  @{user?.username} • <Badge variant="purple" className="ml-1">{profile.niche}</Badge>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/creator/edit">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </Button>
              </Link>
              <Link to="/creator/preferences">
                <Button variant="secondary" size="sm" className="gap-2">
                  <Sliders className="w-4 h-4" /> Preferences
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">About Creator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {profile.bio || 'No bio specified yet.'}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Content Focus & Audience</h4>
              <div className="flex flex-wrap gap-2">
                {profile.preferences?.content_focus?.map((focus, idx) => (
                  <Badge key={idx} variant="slate">{focus}</Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Social Channels</h3>
            <div className="space-y-3">
              {Object.entries(profile.social_links || {}).map(([key, val]) => {
                if (!val) return null;
                return (
                  <a
                    key={key}
                    href={val.startsWith('http') ? val : `https://${val}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <div className="flex items-center gap-2.5 capitalize font-medium">
                      {socialIcons[key] || <ExternalLink className="w-4 h-4 text-slate-400" />}
                      {key}
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                );
              })}
            </div>
          </Card>
        </div>

        <Card
          title="Creator Portfolio & Case Studies"
          subtitle="Featured content items, brand collaborations, and showcases"
          headerAction={
            <Link to="/creator/portfolio">
              <Button variant="outline" size="sm" className="gap-2">
                <Briefcase className="w-4 h-4" /> Manage Portfolio
              </Button>
            </Link>
          }
        >
          {profile.portfolio_items?.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No portfolio items added yet</p>
              <p className="text-xs text-slate-500 mt-1">Showcase your best videos, blogs, and brand campaigns.</p>
              <Link to="/creator/portfolio">
                <Button variant="primary" size="sm" className="mt-4">
                  Add First Portfolio Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {profile.portfolio_items.map((item) => (
                <div key={item.id} className="group rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
                  <div className="h-36 overflow-hidden relative">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <Badge variant="purple" className="absolute top-2 right-2 text-[10px]">{item.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs text-brand-lavender font-semibold mt-3 hover:underline">
                        View Project <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
