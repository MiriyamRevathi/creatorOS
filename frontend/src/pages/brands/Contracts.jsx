import React, { useState } from 'react';
import Modal from '../../components/marketplace/Modal';

export default function Contracts({
  contracts,
  userRole,
  onSignContract
}) {
  const [selectedContract, setSelectedContract] = useState(null);
  const [signatureName, setSignatureName] = useState('');

  const handleSign = async (e) => {
    e.preventDefault();
    if (!selectedContract || !signatureName) return;
    await onSignContract(selectedContract.id, userRole);
    setSelectedContract(null);
    setSignatureName('');
  };

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
            Agreements & Escrow Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.2rem' }}>
            Legally binding digital sponsorship contracts, intellectual property rights, and secured escrow funds.
          </p>
        </div>

        {/* Total in Escrow Pill */}
        <div style={{
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          color: '#065F46',
          fontSize: '0.85rem',
          fontWeight: 700
        }}>
          🛡️ Total Protected in Escrow: ${contracts.reduce((sum, c) => sum + (c.contractAmount || 0), 0).toLocaleString()} USD
        </div>
      </div>

      {/* Contracts List */}
      {contracts.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📑</div>
          <h3>No active agreements found</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            When a brand accepts a proposal, an escrow contract is automatically generated here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {contracts.map(contract => {
            const isCreatorSignNeeded = userRole === 'creator' && !contract.creatorSigned;

            return (
              <div key={contract.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
                      Agreement #{contract.id} • Effective {contract.effectiveDate}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: '#412653', marginTop: '0.25rem' }}>
                      {contract.campaignTitle}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#3F567F', marginTop: '0.2rem' }}>
                      Brand: <strong>{contract.brandName}</strong> ↔ Creator: <strong>{contract.creatorName}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <span style={{
                      backgroundColor: contract.escrowStatus === 'Funded in Escrow' ? '#ECFDF5' : '#EFF6FF',
                      color: contract.escrowStatus === 'Funded in Escrow' ? '#065F46' : '#1D4ED8',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      border: '1px solid currentColor'
                    }}>
                      🔒 {contract.escrowStatus}
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#412653' }}>
                      ${Number(contract.contractAmount).toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {/* Terms Summary Grid */}
                <div style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                  border: '1px solid #E5E7EB'
                }}>
                  <div>
                    <strong style={{ color: '#412653', display: 'block', marginBottom: '0.2rem' }}>
                      Intellectual Property (IP)
                    </strong>
                    <span style={{ color: '#4B5563' }}>{contract.terms?.ipRights || 'Standard digital commercial license.'}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#412653', display: 'block', marginBottom: '0.2rem' }}>
                      Exclusivity Clause
                    </strong>
                    <span style={{ color: '#4B5563' }}>{contract.terms?.exclusivity || 'Standard category exclusivity.'}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#412653', display: 'block', marginBottom: '0.2rem' }}>
                      Revision Policy
                    </strong>
                    <span style={{ color: '#4B5563' }}>{contract.terms?.revisionsPolicy || 'Up to 2 rounds of minor feedback.'}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#412653', display: 'block', marginBottom: '0.2rem' }}>
                      Payment Release Terms
                    </strong>
                    <span style={{ color: '#4B5563' }}>{contract.paymentTerms}</span>
                  </div>
                </div>

                {/* Signatures & Action Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #F3F4F6',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ color: '#6B7280' }}>Brand Signature: </span>
                      {contract.brandSigned ? (
                        <strong style={{ color: '#10B981' }}>✓ Signed ({contract.brandName})</strong>
                      ) : (
                        <span style={{ color: '#F59E0B' }}>Pending Sign</span>
                      )}
                    </div>
                    <div>
                      <span style={{ color: '#6B7280' }}>Creator Signature: </span>
                      {contract.creatorSigned ? (
                        <strong style={{ color: '#10B981' }}>✓ Signed ({contract.creatorName})</strong>
                      ) : (
                        <strong style={{ color: '#E0563F' }}>⏳ Awaiting Signature</strong>
                      )}
                    </div>
                  </div>

                  <div>
                    {isCreatorSignNeeded ? (
                      <button
                        onClick={() => setSelectedContract(contract)}
                        className="btn-action"
                        style={{ fontSize: '0.85rem' }}
                      >
                        ✍️ Sign Agreement Now
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedContract(contract)}
                        className="btn-secondary"
                        style={{ fontSize: '0.85rem' }}
                      >
                        View Full Legal Agreement
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contract Details / Signature Modal */}
      <Modal
        isOpen={!!selectedContract}
        onClose={() => setSelectedContract(null)}
        title={`CreatorOS Agreement #${selectedContract?.id}`}
        subtitle={`${selectedContract?.campaignTitle} • ${selectedContract?.brandName} & ${selectedContract?.creatorName}`}
        maxWidth="max-w-3xl"
      >
        <div style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
          <div style={{
            backgroundColor: '#F9FAFB',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            marginBottom: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.8rem'
          }}>
            <strong>CONTRACT CLAUSES & ESCROW LOCK:</strong>
            <p style={{ marginTop: '0.5rem' }}>
              1. <strong>Compensation:</strong> Total consideration of ${selectedContract?.contractAmount} USD deposited into CreatorOS Escrow on {selectedContract?.effectiveDate}.
            </p>
            <p style={{ marginTop: '0.25rem' }}>
              2. <strong>Intellectual Property:</strong> {selectedContract?.terms?.ipRights}
            </p>
            <p style={{ marginTop: '0.25rem' }}>
              3. <strong>Exclusivity:</strong> {selectedContract?.terms?.exclusivity}
            </p>
            <p style={{ marginTop: '0.25rem' }}>
              4. <strong>Delivery Schedule:</strong> Final content deliverable must be submitted by {selectedContract?.completionDeadline}.
            </p>
          </div>

          {userRole === 'creator' && !selectedContract?.creatorSigned ? (
            <form onSubmit={handleSign} style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>
                Type Full Legal Name to Electronically Sign & Execute
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem', marginBottom: '1rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedContract(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-action"
                >
                  Execute & Sign Agreement
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setSelectedContract(null)}
                className="btn-primary"
              >
                Close View
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
