import React from 'react';

export default function Navbar({ activePage, setActivePage, userRole, setUserRole, onOpenNewCampaign }) {
  const navItems = [
    { id: 'marketplace', label: 'Explore Marketplace' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'applications', label: 'Proposals & Pitches' },
    { id: 'contracts', label: 'Agreements & Escrow' },
    { id: 'deliverables', label: 'Deliverable Tracker' },
    { id: 'brands', label: 'Brand Directory' },
  ];

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      {/* Top Banner with Brand Role Switcher */}
      <div style={{
        backgroundColor: '#412653',
        color: '#FFFFFF',
        padding: '0.4rem 1.5rem',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            backgroundColor: '#D174D2', 
            color: '#412653', 
            fontWeight: 800, 
            padding: '0.15rem 0.5rem', 
            borderRadius: '4px',
            fontSize: '0.7rem',
            letterSpacing: '0.05em'
          }}>
            CREATOROS
          </span>
          <span style={{ color: '#E9D5FF' }}>Creator-to-Brand Marketplace Module</span>
        </div>

        {/* Dynamic Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#E9D5FF', fontSize: '0.75rem' }}>Active Perspective:</span>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '2px',
            display: 'flex',
            gap: '2px'
          }}>
            <button
              onClick={() => setUserRole('creator')}
              style={{
                background: userRole === 'creator' ? '#D174D2' : 'transparent',
                color: userRole === 'creator' ? '#412653' : '#FFFFFF',
                fontWeight: userRole === 'creator' ? 700 : 500,
                fontSize: '0.75rem',
                padding: '0.2rem 0.75rem',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              Creator Mode
            </button>
            <button
              onClick={() => setUserRole('brand')}
              style={{
                background: userRole === 'brand' ? '#E0563F' : 'transparent',
                color: '#FFFFFF',
                fontWeight: userRole === 'brand' ? 700 : 500,
                fontSize: '0.75rem',
                padding: '0.2rem 0.75rem',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              Brand Partner Mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActivePage('marketplace')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#412653',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '1.1rem'
          }}>
            C
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#412653', lineHeight: 1 }}>
              Creator<span style={{ color: '#E0563F' }}>OS</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#3F567F', letterSpacing: '0.04em', fontWeight: 600 }}>
              BRAND MARKETPLACE
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  backgroundColor: isActive ? '#f8e8f8' : 'transparent',
                  color: isActive ? '#412653' : '#4B5563',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  borderBottom: isActive ? '2px solid #D174D2' : '2px solid transparent'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {userRole === 'brand' ? (
            <button
              onClick={onOpenNewCampaign}
              className="btn-action"
              style={{ fontSize: '0.85rem' }}
            >
              + Create Campaign
            </button>
          ) : (
            <button
              onClick={() => setActivePage('marketplace')}
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              Browse Open Deals
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
