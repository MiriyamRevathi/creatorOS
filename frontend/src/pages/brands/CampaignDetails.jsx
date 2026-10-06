import React, { useState } from 'react';
import Modal from '../../components/marketplace/Modal';

export default function CampaignDetails({
  campaign,
  brand,
  userRole,
  onBack,
  onApply,
  onViewBrand
}) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [pitchForm, setPitchForm] = useState({
    creatorName: 'Alex Rivera (Studio Craft)',
    creatorPlatform: campaign?.platforms[0] || 'YouTube',
    creatorNiche: campaign?.category || 'Tech',
    creatorFollowers: 82000,
    proposedRate: campaign?.budget || 3000,
    pitchMessage: `Hello ${campaign?.brandName}! I have reviewed the campaign brief for "${campaign?.title}". I plan to produce a high-fidelity video showcasing real workflows and comparing key performance specs.`,
    portfolioLink: 'https://youtube.com/watch?v=sample-sponsor-review',
    estimatedTurnaroundDays: 12
  });

  if (!campaign) return null;

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    await onApply({
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      brandId: campaign.brandId,
      brandName: campaign.brandName,
      creatorName: pitchForm.creatorName,
      creatorPlatform: pitchForm.creatorPlatform,
      creatorNiche: pitchForm.creatorNiche,
      creatorFollowers: Number(pitchForm.creatorFollowers),
      proposedRate: Number(pitchForm.proposedRate),
      pitchMessage: pitchForm.pitchMessage,
      portfolioLinks: pitchForm.portfolioLink ? [pitchForm.portfolioLink] : [],
      estimatedTurnaroundDays: Number(pitchForm.estimatedTurnaroundDays)
    });
    setIsApplyModalOpen(false);
  };

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '1.25rem', fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
      >
        ← Back to Campaigns
      </button>

      {/* Main Campaign Header Hero */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <button
                onClick={() => onViewBrand(brand || { id: campaign.brandId, name: campaign.brandName })}
                style={{
                  background: 'transparent',
                  color: '#3F567F',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'underline'
                }}
              >
                {campaign.brandName} ↗
              </button>
              <span className="badge-creative">{campaign.category}</span>
              <span className="badge-active">● {campaign.status}</span>
            </div>

            <h1 style={{ fontSize: '2rem', color: '#412653', margin: 0, lineHeight: 1.2 }}>
              {campaign.title}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4B5563', marginTop: '0.5rem' }}>
              {campaign.tagline}
            </p>
          </div>

          <div style={{
            backgroundColor: '#F9FAFB',
            padding: '1.25rem 1.75rem',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Compensation Budget
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#412653' }}>
              ${Number(campaign.budget).toLocaleString()} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{campaign.currency}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600, marginTop: '0.2rem' }}>
              {campaign.compensationType}
            </div>
          </div>
        </div>

        {/* Platforms & Deadlines */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid #F3F4F6',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Target Platforms</span>
              <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>
                {campaign.platforms?.join(', ')}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Application Deadline</span>
              <span style={{ fontWeight: 600, color: '#E0563F', fontSize: '0.9rem' }}>
                📅 {campaign.deadline}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Applicants</span>
              <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>
                👥 {campaign.applicantCount} creators pitched
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="btn-action"
            style={{ fontSize: '0.95rem', padding: '0.65rem 1.5rem' }}
          >
            Submit Creator Pitch
          </button>
        </div>
      </div>

      {/* Grid: Description & Deliverables vs Requirements */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column: Brief & Deliverables */}
        <div>
          {/* Campaign Brief */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#412653', marginBottom: '0.75rem' }}>
              Campaign Brief & Objectives
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {campaign.description}
            </p>
          </div>

          {/* Deliverables Checklist */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#412653', marginBottom: '0.75rem' }}>
              Required Content Deliverables ({campaign.deliverables?.length || 0})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {campaign.deliverables?.map((deliv, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#412653', margin: 0 }}>
                      {idx + 1}. {deliv.title}
                    </h4>
                    <span style={{
                      backgroundColor: '#EFF6FF',
                      color: '#1D4ED8',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {deliv.format}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: 0 }}>
                    {deliv.requiredSpecs}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Perks & Bonuses */}
          {campaign.perks && campaign.perks.length > 0 && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#412653', marginBottom: '0.75rem' }}>
                Creator Perks & Performance Bonuses
              </h3>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#374151', fontSize: '0.9rem' }}>
                {campaign.perks.map((perk, idx) => (
                  <li key={idx}>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Requirements & Escrow Protection */}
        <div>
          {/* Creator Qualifications */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#412653', marginBottom: '1rem' }}>
              Creator Qualifications
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>Min Audience:</span>
                <strong>{Number(campaign.requirements?.minFollowers || 10000).toLocaleString()}+ followers</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>Eligible Niches:</span>
                <strong>{campaign.requirements?.niches?.join(', ') || 'All Creative'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>Exclusivity Period:</span>
                <strong>{campaign.requirements?.exclusivityDays || 14} days post-publish</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Creator Region:</span>
                <strong>{campaign.requirements?.creatorLocation?.join(', ') || 'Global'}</strong>
              </div>
            </div>
          </div>

          {/* Escrow Guarantee Box */}
          <div style={{
            backgroundColor: '#F8E8F8',
            border: '1px solid #D174D2',
            padding: '1.25rem',
            borderRadius: '12px'
          }}>
            <h4 style={{ fontSize: '0.95rem', color: '#412653', marginBottom: '0.5rem', fontWeight: 700 }}>
              🛡️ CreatorOS Escrow Shield
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#583570', lineHeight: 1.5, margin: 0 }}>
              When your application is accepted, 100% of the funds are locked in verified escrow. You create content with guaranteed payout upon meeting the brief specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Creator Pitch Form */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply for ${campaign.title}`}
        subtitle={`Brand: ${campaign.brandName} • Budget: $${campaign.budget}`}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>
                Creator / Channel Name
              </label>
              <input
                type="text"
                required
                value={pitchForm.creatorName}
                onChange={(e) => setPitchForm({ ...pitchForm, creatorName: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>
                Primary Platform & Audience Size
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  value={pitchForm.creatorPlatform}
                  onChange={(e) => setPitchForm({ ...pitchForm, creatorPlatform: e.target.value })}
                  style={{ padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitch">Twitch</option>
                </select>
                <input
                  type="number"
                  placeholder="Followers"
                  value={pitchForm.creatorFollowers}
                  onChange={(e) => setPitchForm({ ...pitchForm, creatorFollowers: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>
                Your Proposed Fee ($ USD)
              </label>
              <input
                type="number"
                required
                value={pitchForm.proposedRate}
                onChange={(e) => setPitchForm({ ...pitchForm, proposedRate: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>
                Delivery Timeframe (Days)
              </label>
              <input
                type="number"
                value={pitchForm.estimatedTurnaroundDays}
                onChange={(e) => setPitchForm({ ...pitchForm, estimatedTurnaroundDays: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>
              Your Creative Pitch & Concept
            </label>
            <textarea
              required
              rows={4}
              value={pitchForm.pitchMessage}
              onChange={(e) => setPitchForm({ ...pitchForm, pitchMessage: e.target.value })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>
              Portfolio / Previous Sponsor Example Link
            </label>
            <input
              type="url"
              value={pitchForm.portfolioLink}
              onChange={(e) => setPitchForm({ ...pitchForm, portfolioLink: e.target.value })}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-action"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
