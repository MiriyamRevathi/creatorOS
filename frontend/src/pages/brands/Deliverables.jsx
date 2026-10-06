import React, { useState } from 'react';
import DeliverableTracker from '../../components/marketplace/DeliverableTracker';

export default function Deliverables({
  deliverables,
  userRole,
  onSubmitDraft,
  onReviewDeliverable
}) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredDeliverables = deliverables.filter(d => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return d.status === 'Pending Submission';
    if (activeTab === 'In Review') return d.status === 'In Review';
    if (activeTab === 'Approved') return d.status === 'Approved';
    return true;
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
            Deliverable Tracker & Content Review
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.2rem' }}>
            Submit draft cuts for brand sign-off, iterate with timestamped revision feedback, and release escrow payouts.
          </p>
        </div>

        {/* Deliverables Stats */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#1D4ED8',
            fontWeight: 600
          }}>
            📋 {deliverables.length} Total Deliverables
          </div>
          <div style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#065F46',
            fontWeight: 600
          }}>
            ✓ {deliverables.filter(d => d.status === 'Approved').length} Approved & Paid
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid #E5E7EB',
        marginBottom: '1.5rem'
      }}>
        {['All', 'Pending', 'In Review', 'Approved'].map(tab => (
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

      {/* List of Deliverables */}
      {filteredDeliverables.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎬</div>
          <h3>No deliverables found in "{activeTab}"</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Deliverables are generated automatically when brand deals and contracts are accepted.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredDeliverables.map(deliv => (
            <DeliverableTracker
              key={deliv.id}
              deliverable={deliv}
              userRole={userRole}
              onSubmitDraft={onSubmitDraft}
              onReview={onReviewDeliverable}
            />
          ))}
        </div>
      )}
    </div>
  );
}
