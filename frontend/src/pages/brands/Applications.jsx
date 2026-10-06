import React, { useState } from 'react';
import ApplicationCard from '../../components/marketplace/ApplicationCard';

export default function Applications({
  applications,
  userRole,
  onReviewApplication
}) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredApps = applications.filter(app => {
    if (activeTab === 'All') return true;
    return app.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div>
      {/* Header */}
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
            Proposals & Applications
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.2rem' }}>
            {userRole === 'brand' 
              ? 'Review inbound creator pitches, assess audience metrics, and approve agreements.' 
              : 'Track the status of your submitted pitches and response from partner brands.'}
          </p>
        </div>

        {/* Role badge */}
        <div style={{
          backgroundColor: '#F3F4F6',
          padding: '0.4rem 0.85rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#3F567F',
          fontWeight: 600
        }}>
          Perspective: <strong>{userRole === 'brand' ? 'Brand Partner (Reviewer)' : 'Creator (Applicant)'}</strong>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid #E5E7EB',
        marginBottom: '1.5rem'
      }}>
        {['All', 'Pending', 'Shortlisted', 'Accepted'].map(tab => (
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
            {tab} ({tab === 'All' ? applications.length : applications.filter(a => a.status.toLowerCase() === tab.toLowerCase()).length})
          </button>
        ))}
      </div>

      {/* Application List */}
      {filteredApps.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <h3>No applications in "{activeTab}"</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {userRole === 'creator' 
              ? 'Explore open marketplace campaigns and submit your first creative pitch!' 
              : 'New creator submissions will appear here for review.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredApps.map(app => (
            <ApplicationCard
              key={app.id}
              application={app}
              userRole={userRole}
              onReview={onReviewApplication}
            />
          ))}
        </div>
      )}
    </div>
  );
}
