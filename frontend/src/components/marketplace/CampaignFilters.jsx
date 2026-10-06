import React from 'react';

export default function CampaignFilters({
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  searchQuery,
  setSearchQuery,
  onReset
}) {
  const categories = [
    'All',
    'Tech & Audio',
    'Beauty & Wellness',
    'Desk Setup & Productivity',
    'Health & Fitness',
    'Gaming & Streaming',
    'Lifestyle & Fashion'
  ];

  const platforms = [
    'All',
    'YouTube',
    'Instagram',
    'TikTok',
    'Twitch',
    'Shorts'
  ];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '14px',
      border: '1px solid #E5E7EB',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      {/* Search Input */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#412653', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Search Deals & Brands
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by product, brand, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '0.875rem',
              backgroundColor: '#F9FAFB'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#412653', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Niche Category
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  textAlign: 'left',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? '#f8e8f8' : 'transparent',
                  color: isSelected ? '#412653' : '#4B5563',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{cat}</span>
                {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D174D2' }}></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Filter */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#412653', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Target Platform
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {platforms.map((plat) => {
            const isSelected = selectedPlatform.toLowerCase() === plat.toLowerCase();
            return (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                style={{
                  padding: '0.35rem 0.7rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? '#3F567F' : '#F3F4F6',
                  color: isSelected ? '#FFFFFF' : '#374151',
                  border: 'none'
                }}
              >
                {plat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      {(selectedCategory !== 'All' || selectedPlatform !== 'All' || searchQuery !== '') && (
        <button
          onClick={onReset}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.4rem' }}
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}
