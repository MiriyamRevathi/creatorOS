import React, { useState } from 'react';

export default function DeliverableTracker({ deliverable, userRole, onSubmitDraft, onReview }) {
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="badge-active">✓ Approved & Paid</span>;
      case 'In Review':
        return <span style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>Under Brand Review</span>;
      case 'Revision Requested':
        return <span className="badge-coral">Revision Requested</span>;
      default:
        return <span className="badge-pending">Pending Submission</span>;
    }
  };

  const handleDraftSubmit = async (e) => {
    e.preventDefault();
    if (!submissionUrl) return;
    await onSubmitDraft(deliverable.id, { submissionUrl, notes });
    setIsSubmitting(false);
  };

  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#3F567F', fontWeight: 600 }}>
            {deliverable.brandName} • {deliverable.campaignTitle}
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#412653', marginTop: '0.2rem' }}>
            {deliverable.title}
          </h4>
          <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
            Creator: <strong>{deliverable.creatorName}</strong> | Format: {deliverable.format} ({deliverable.platform})
          </div>
        </div>

        <div>
          {getStatusBadge(deliverable.status)}
        </div>
      </div>

      {/* Submission Link Display */}
      {deliverable.submissionUrl ? (
        <div style={{
          backgroundColor: '#F9FAFB',
          padding: '1rem',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          marginBottom: '1rem'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Submitted Draft / Asset Link
          </div>
          <a
            href={deliverable.submissionUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.9rem',
              color: '#3B82F6',
              wordBreak: 'break-all',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            {deliverable.submissionUrl} ↗
          </a>
          {deliverable.notes && (
            <p style={{ fontSize: '0.85rem', color: '#4B5563', marginTop: '0.5rem', fontStyle: 'italic' }}>
              Notes: "{deliverable.notes}"
            </p>
          )}
        </div>
      ) : (
        <div style={{
          backgroundColor: '#FFFBEB',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#92400E',
          marginBottom: '1rem'
        }}>
          ⏳ Awaiting creator submission. Due date: {deliverable.dueDate || 'Upon contract schedule'}.
        </div>
      )}

      {/* Revision History & Feedback Log */}
      {deliverable.feedback && deliverable.feedback.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#412653', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Review Feedback & Change Log
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {deliverable.feedback.map((fb, idx) => (
              <div key={idx} style={{
                backgroundColor: '#F8F9FA',
                borderLeft: '3px solid #D174D2',
                padding: '0.6rem 0.85rem',
                borderRadius: '0 6px 6px 0',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                  <strong>{fb.author}</strong>
                  <span>{new Date(fb.timestamp).toLocaleDateString()}</span>
                </div>
                <div style={{ color: '#1F2937' }}>{fb.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creator Submission Form */}
      {userRole === 'creator' && (deliverable.status === 'Pending Submission' || deliverable.status === 'Revision Requested') && (
        <div>
          {!isSubmitting ? (
            <button
              onClick={() => setIsSubmitting(true)}
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              {deliverable.status === 'Revision Requested' ? 'Submit Revised Draft' : 'Submit Content Draft URL'}
            </button>
          ) : (
            <form onSubmit={handleDraftSubmit} style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Draft Video / Content URL (Unlisted YouTube, Google Drive, Loom, Frame.io)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>
                  Creator Notes or Timestamps for the Brand
                </label>
                <textarea
                  placeholder="Mention any specific segment, audio preset, or tracking link placement..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" className="btn-action" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>
                  Send for Review
                </button>
                <button type="button" onClick={() => setIsSubmitting(false)} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Brand Review Actions */}
      {userRole === 'brand' && deliverable.status === 'In Review' && (
        <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB', marginTop: '0.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#412653', marginBottom: '0.5rem' }}>
            Brand Action: Review Submitted Content
          </div>
          <textarea
            placeholder="Add optional revision feedback or approval notes..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={2}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem', marginBottom: '0.75rem' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onReview(deliverable.id, 'approve', feedbackText || 'Approved without changes.')}
              className="btn-action"
              style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
            >
              ✓ Approve & Release Escrow (${deliverable.payoutAmount})
            </button>
            <button
              onClick={() => onReview(deliverable.id, 'request_revision', feedbackText || 'Minor revisions needed.')}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
            >
              Request Minor Revision
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
