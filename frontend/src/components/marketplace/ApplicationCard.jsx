import React from 'react';

export default function ApplicationCard({ application, userRole, onReview }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="badge-active">Accepted & Contract Issued</span>;
      case 'Shortlisted':
        return <span style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>Shortlisted</span>;
      case 'Rejected':
        return <span style={{ backgroundColor: '#FEF2F2', color: '#991B1B', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>Not Selected</span>;
      default:
        return <span className="badge-pending">Pending Review</span>;
    }
  };

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <img
            src={application.creatorAvatar}
            alt={application.creatorName}
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#412653', margin: 0 }}>
              {application.creatorName}
            </h4>
            <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              {application.creatorNiche} • {Number(application.creatorFollowers).toLocaleString()} Followers ({application.creatorPlatform})
            </div>
          </div>
        </div>

        <div>
          {getStatusBadge(application.status)}
        </div>
      </div>

      {/* Campaign Reference */}
      <div style={{
        backgroundColor: '#F9FAFB',
        padding: '0.6rem 0.85rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.85rem',
        color: '#3F567F',
        fontWeight: 600
      }}>
        Campaign: <span style={{ color: '#412653' }}>{application.campaignTitle}</span>
      </div>

      {/* Pitch Message */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          Pitch Proposal
        </div>
        <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.5, backgroundColor: '#FFFFFF', border: '1px solid #F3F4F6', padding: '0.75rem', borderRadius: '8px' }}>
          "{application.pitchMessage}"
        </p>
      </div>

      {/* Portfolio Links */}
      {application.portfolioLinks && application.portfolioLinks.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            Portfolio Samples
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {application.portfolioLinks.map((link, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: '#3F567F',
                  textDecoration: 'underline',
                  backgroundColor: '#F3F4F6',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                Sample Link #{idx + 1} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Rate and Review Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '0.75rem',
        borderTop: '1px solid #F3F4F6'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Proposed Rate: </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#412653' }}>
            ${Number(application.proposedRate).toLocaleString()}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#6B7280', marginLeft: '0.5rem' }}>
            (~{application.estimatedTurnaroundDays} days delivery)
          </span>
        </div>

        {/* Brand Action Buttons */}
        {userRole === 'brand' && application.status === 'Pending' && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onReview(application.id, 'Shortlisted', 'Profile saved for final review')}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              Shortlist
            </button>
            <button
              onClick={() => onReview(application.id, 'Accepted', 'Welcome aboard! Escrow agreement issued.')}
              className="btn-action"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              Accept & Issue Deal
            </button>
          </div>
        )}

        {userRole === 'brand' && application.status === 'Shortlisted' && (
          <button
            onClick={() => onReview(application.id, 'Accepted', 'Shortlist approved! Escrow agreement issued.')}
            className="btn-action"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            Accept & Issue Deal
          </button>
        )}
      </div>
    </div>
  );
}
