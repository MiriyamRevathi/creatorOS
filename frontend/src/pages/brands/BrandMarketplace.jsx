import React, { useState } from 'react';
import CampaignCard from '../../components/marketplace/CampaignCard';
import CampaignFilters from '../../components/marketplace/CampaignFilters';
import Modal from '../../components/marketplace/Modal';

export default function BrandMarketplace({
  campaigns,
  brands,
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  searchQuery,
  setSearchQuery,
  onSelectCampaign,
  onSelectBrand,
  onSubmitApplication
}) {
  const [activeApplyingCampaign, setActiveApplyingCampaign] = useState(null);
  const [pitchForm, setPitchForm] = useState({
    creatorName: '',
    creatorPlatform: 'YouTube',
    creatorNiche: '',
    creatorFollowers: 25000,
    proposedRate: '',
    pitchMessage: '',
    portfolioLink: '',
    estimatedTurnaroundDays: 10
  });

  const handleOpenApplyModal = (camp) => {
    setActiveApplyingCampaign(camp);
    setPitchForm({
      creatorName: 'Alex Rivera',
      creatorPlatform: camp.platforms[0] || 'YouTube',
      creatorNiche: camp.category,
      creatorFollowers: 48000,
      proposedRate: camp.budget,
      pitchMessage: `Hi ${camp.brandName} team! I create high-converting content in ${camp.category} and would love to produce a dedicated review tailored to my engaged community.`,
      portfolioLink: 'https://youtube.com/@studiocraft',
      estimatedTurnaroundDays: 10
    });
  };

  const handlePitchSubmit = async (e) => {
    e.preventDefault();
    if (!activeApplyingCampaign) return;

    await onSubmitApplication({
      campaignId: activeApplyingCampaign.id,
      campaignTitle: activeApplyingCampaign.title,
      brandId: activeApplyingCampaign.brandId,
      brandName: activeApplyingCampaign.brandName,
      creatorName: pitchForm.creatorName,
      creatorPlatform: pitchForm.creatorPlatform,
      creatorNiche: pitchForm.creatorNiche,
      creatorFollowers: Number(pitchForm.creatorFollowers),
      proposedRate: Number(pitchForm.proposedRate),
      pitchMessage: pitchForm.pitchMessage,
      portfolioLinks: pitchForm.portfolioLink ? [pitchForm.portfolioLink] : [],
      estimatedTurnaroundDays: Number(pitchForm.estimatedTurnaroundDays)
    });

    setActiveApplyingCampaign(null);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedPlatform('All');
    setSearchQuery('');
  };

  return (
    <div>
      {/* Hero Showcase Section */}
      <div style={{
        background: 'linear-gradient(135deg, #412653 0%, #2c1938 100%)',
        color: '#FFFFFF',
        padding: '3rem 1.5rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(209, 116, 210, 0.2)'
      }}>
        {/* Subtle Decorative SVG Accent */}
        <div style={{
          position: 'absolute',
          right: '-50px',
          top: '-50px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(209, 116, 210, 0.15) 0%, rgba(209, 116, 210, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(209, 116, 210, 0.15)',
            border: '1px solid rgba(209, 116, 210, 0.3)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            color: '#E9D5FF',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            <span>✨</span> 100% Escrow-Protected Creator Sponsorships
          </div>

          <h1 style={{ fontSize: '2.5rem', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Discover Verified Brand Partnerships & Paid Sponsorships
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Browse curated brand campaigns from high-growth companies. Submit tailored pitches, lock in terms with transparent agreements, and get paid directly upon deliverable sign-off.
          </p>

          {/* Quick Stats Strip */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D174D2' }}>$124,000+</div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Active Campaign Budgets</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E0563F' }}>48 Hours</div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Avg Brand Review Speed</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>0% Platform Cut</div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Direct Creator Retainers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Marketplace Discovery Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '2rem',
        alignItems: 'flex-start'
      }}>
        {/* Left Sidebar Filter Column */}
        <aside>
          <CampaignFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Right Deals Feed Column */}
        <main>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#412653', margin: 0 }}>
                Open Campaigns
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '0.2rem' }}>
                Showing {campaigns.length} curated collaboration opportunities
              </p>
            </div>

            {/* Quick Status Tag */}
            <span className="badge-active">
              ● All Live & Accepting Pitches
            </span>
          </div>

          {campaigns.length === 0 ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px dashed #D1D5DB',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.2rem', color: '#412653', marginBottom: '0.5rem' }}>
                No matching campaigns found
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1.25rem' }}>
                Try loosening your filters or search keywords.
              </p>
              <button onClick={handleResetFilters} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {campaigns.map((camp) => (
                <CampaignCard
                  key={camp.id}
                  campaign={camp}
                  onSelect={onSelectCampaign}
                  onApply={handleOpenApplyModal}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Creator Application & Pitch Modal */}
      <Modal
        isOpen={!!activeApplyingCampaign}
        onClose={() => setActiveApplyingCampaign(null)}
        title={`Apply to ${activeApplyingCampaign?.brandName}`}
        subtitle={`Campaign: "${activeApplyingCampaign?.title}" • Fixed Budget: $${activeApplyingCampaign?.budget}`}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handlePitchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                Estimated Delivery Turnaround (Days)
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
              placeholder="Explain how you will showcase the product, video concept, audio hook, or audience alignment..."
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
              placeholder="https://youtube.com/watch?v=..."
              value={pitchForm.portfolioLink}
              onChange={(e) => setPitchForm({ ...pitchForm, portfolioLink: e.target.value })}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{
            backgroundColor: '#EFF6FF',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#1E40AF',
            border: '1px solid #DBEAFE'
          }}>
            🛡️ <strong>CreatorOS Guarantee:</strong> Upon brand acceptance, your payment is placed into verified escrow before you produce any content.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveApplyingCampaign(null)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-action"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
