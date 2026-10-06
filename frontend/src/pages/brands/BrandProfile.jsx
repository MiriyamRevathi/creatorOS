import React from 'react';
import CampaignCard from '../../components/marketplace/CampaignCard';

export default function BrandProfile({ brand, campaigns, onSelectCampaign, onBack }) {
  if (!brand) return null;

  const brandCampaigns = campaigns.filter(c => c.brandId === brand.id);

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '1.25rem', fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
      >
        ← Back to Marketplace
      </button>

      {/* Header Banner */}
      <div style={{
        height: '180px',
        borderRadius: '16px 16px 0 0',
        backgroundImage: `url(${brand.banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(65, 38, 83, 0.3) 0%, rgba(65, 38, 83, 0.7) 100%)',
          borderRadius: '16px 16px 0 0'
        }}></div>
      </div>

      {/* Main Profile Info Card */}
      <div className="card" style={{
        borderRadius: '0 0 16px 16px',
        padding: '0 2rem 2rem',
        marginTop: '-50px',
        position: 'relative',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end' }}>
            <img
              src={brand.logo}
              alt={brand.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '18px',
                objectFit: 'cover',
                border: '4px solid #FFFFFF',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#412653', margin: 0 }}>
                  {brand.name}
                </h1>
                {brand.verified && (
                  <span style={{
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    border: '1px solid #BFDBFE'
                  }}>
                    ✓ Verified Partner
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.95rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
                {brand.category} • {brand.location} • Founded {brand.foundedYear}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a
              href={brand.website}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Website ↗
            </a>
            <a
              href={`mailto:${brand.contactEmail}`}
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              Direct Partnership Inquiry
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          backgroundColor: '#F9FAFB',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Creator Rating</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#412653' }}>
              ★ {brand.rating} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6B7280' }}>({brand.totalReviews} reviews)</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Completed Collabs</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#412653' }}>
              {brand.collaborationsCount} deals
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Average Deal Size</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#412653' }}>
              {brand.avgPayout}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Escrow Release Speed</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981' }}>
              {brand.payoutSpeed}
            </div>
          </div>
        </div>

        {/* Bio & Guidelines */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#412653', marginBottom: '0.5rem' }}>
              About {brand.name}
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#374151', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {brand.bio}
            </p>

            <h3 style={{ fontSize: '1.15rem', color: '#412653', marginBottom: '0.5rem' }}>
              Creator Collaboration Guidelines
            </h3>
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FEF3C7',
              padding: '1rem',
              borderRadius: '10px',
              fontSize: '0.9rem',
              color: '#92400E',
              lineHeight: 1.5
            }}>
              📋 {brand.guidelines}
            </div>
          </div>

          {/* Social Channels & Platforms */}
          <div style={{
            backgroundColor: '#F9FAFB',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}>
            <h4 style={{ fontSize: '0.95rem', color: '#412653', marginBottom: '0.75rem' }}>
              Preferred Content Platforms
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {brand.preferredPlatforms.map((p, idx) => (
                <span key={idx} className="badge-creative">
                  {p}
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: '0.95rem', color: '#412653', marginBottom: '0.5rem' }}>
              Official Social Profiles
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#3F567F' }}>
              {Object.entries(brand.socialHandles || {}).map(([network, handle]) => (
                <div key={network} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ textTransform: 'capitalize' }}>{network}:</span>
                  <strong>{handle}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Brand Campaigns */}
      <div>
        <h2 style={{ fontSize: '1.4rem', color: '#412653', marginBottom: '1rem' }}>
          Open Sponsorship Deals from {brand.name} ({brandCampaigns.length})
        </h2>
        {brandCampaigns.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
            No public active campaigns at this moment. You can submit a general direct pitch above.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {brandCampaigns.map(camp => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                onSelect={onSelectCampaign}
                onApply={onSelectCampaign}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
