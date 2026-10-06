import React, { useState } from 'react';
import CampaignCard from '../../components/marketplace/CampaignCard';
import Modal from '../../components/marketplace/Modal';

export default function Campaigns({
  campaigns,
  brands,
  userRole,
  onSelectCampaign,
  onCreateCampaign
}) {
  const [activeTab, setActiveTab] = useState('Active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Campaign Form State
  const [formData, setFormData] = useState({
    brandId: brands[0]?.id || 'brand-apex-audio',
    title: '',
    tagline: '',
    category: 'Tech & Audio',
    compensationType: 'Paid Fixed Fee',
    budget: 2500,
    deadline: '2026-11-30',
    platforms: ['YouTube'],
    deliverableTitle: 'Full Review Video (1080p+)',
    deliverableFormat: 'YouTube Video',
    minFollowers: 10000,
    exclusivityDays: 14,
    description: '',
    perks: 'Complimentary hardware product shipped express ($350 value), 10% affiliate link commission'
  });

  const filteredCampaigns = campaigns.filter(c => {
    if (activeTab === 'All') return true;
    return c.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handlePlatformToggle = (plat) => {
    const exists = formData.platforms.includes(plat);
    const updated = exists 
      ? formData.platforms.filter(p => p !== plat)
      : [...formData.platforms, plat];
    setFormData({ ...formData, platforms: updated.length ? updated : ['YouTube'] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const brand = brands.find(b => b.id === formData.brandId) || brands[0];
    
    await onCreateCampaign({
      brandId: brand.id,
      brandName: brand.name,
      title: formData.title,
      tagline: formData.tagline,
      category: formData.category,
      compensationType: formData.compensationType,
      budget: Number(formData.budget),
      currency: 'USD',
      deadline: formData.deadline,
      status: 'Active',
      platforms: formData.platforms,
      deliverables: [
        {
          id: `deliv-${Date.now().toString(36)}`,
          title: formData.deliverableTitle,
          format: formData.deliverableFormat,
          quantity: 1,
          requiredSpecs: 'Include brand discount code link in pinned comment and first 3 lines of description.'
        }
      ],
      requirements: {
        minFollowers: Number(formData.minFollowers),
        niches: [formData.category],
        creatorLocation: ['Global'],
        exclusivityDays: Number(formData.exclusivityDays)
      },
      description: formData.description || formData.tagline,
      perks: formData.perks ? formData.perks.split(',').map(p => p.trim()) : [],
      featured: false
    });

    setIsCreateModalOpen(false);
  };

  return (
    <div>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: '#412653', margin: 0 }}>
            Campaign Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.2rem' }}>
            Monitor campaign lifecycles, publish new creator sponsorships, and track applicant pools.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-action"
        >
          + Launch New Campaign
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid #E5E7EB',
        marginBottom: '1.5rem'
      }}>
        {['Active', 'In Review', 'Draft', 'Completed', 'All'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? '#412653' : '#6B7280',
              borderBottom: activeTab === tab ? '2px solid #412653' : '2px solid transparent',
              background: 'transparent'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Campaign List */}
      {filteredCampaigns.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
          <h3>No {activeTab} campaigns found</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Click "Launch New Campaign" to post an opportunity to the CreatorOS marketplace.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredCampaigns.map(camp => (
            <CampaignCard
              key={camp.id}
              campaign={camp}
              onSelect={onSelectCampaign}
              onApply={onSelectCampaign}
            />
          ))}
        </div>
      )}

      {/* New Campaign Creation Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Launch a Creator Sponsorship Campaign"
        subtitle="Define campaign deliverables, required audience niches, and escrow budget."
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Brand & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
                Posting Brand Partner
              </label>
              <select
                value={formData.brandId}
                onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              >
                {brands.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
                Target Category Niche
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              >
                <option value="Tech & Audio">Tech & Audio</option>
                <option value="Beauty & Wellness">Beauty & Wellness</option>
                <option value="Desk Setup & Productivity">Desk Setup & Productivity</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Gaming & Streaming">Gaming & Streaming</option>
                <option value="Lifestyle & Fashion">Lifestyle & Fashion</option>
              </select>
            </div>
          </div>

          {/* Title & Tagline */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
              Campaign Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Flagship Noise-Canceling Microphone Launch"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
              Short Hook / Tagline
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Showcase crystal-clear audio clarity in your daily streaming setup"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
            />
          </div>

          {/* Budget & Deadlines */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
                Fixed Creator Fee ($ USD)
              </label>
              <input
                type="number"
                required
                min={100}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
                Compensation Model
              </label>
              <select
                value={formData.compensationType}
                onChange={(e) => setFormData({ ...formData, compensationType: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              >
                <option value="Paid Fixed Fee">Paid Fixed Fee</option>
                <option value="Paid + Free Product">Paid + Free Product</option>
                <option value="Retainer (Multi-Month)">Retainer (Multi-Month)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
                Submission Deadline
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
              Target Platforms
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['YouTube', 'Instagram', 'TikTok', 'Twitch'].map(p => {
                const active = formData.platforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePlatformToggle(p)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: active ? 700 : 500,
                      backgroundColor: active ? '#412653' : '#F3F4F6',
                      color: active ? '#FFFFFF' : '#374151',
                      border: 'none'
                    }}
                  >
                    {active ? '✓ ' : '+ '}{p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Deliverable Spec */}
          <div style={{
            backgroundColor: '#F9FAFB',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #E5E7EB'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: '#412653', marginBottom: '0.5rem' }}>
              Required Content Deliverable
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                  Deliverable Title & Description
                </label>
                <input
                  type="text"
                  value={formData.deliverableTitle}
                  onChange={(e) => setFormData({ ...formData, deliverableTitle: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                  Format
                </label>
                <select
                  value={formData.deliverableFormat}
                  onChange={(e) => setFormData({ ...formData, deliverableFormat: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                >
                  <option value="YouTube Video">YouTube Video (1080p+)</option>
                  <option value="Vertical Reel / TikTok">Vertical Reel / TikTok (9:16)</option>
                  <option value="Live Stream Segment">Live Stream Segment</option>
                  <option value="Photo / Carousel">Photo / Carousel Post</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-action"
            >
              Publish Campaign to Marketplace
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
