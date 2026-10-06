import React, { useState } from 'react';
import BrandCard from '../../components/marketplace/BrandCard';

export default function BrandDirectory({ brands, onSelectBrand }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Tech & Audio', 'Beauty & Wellness', 'Desk Setup & Productivity', 'Health & Fitness'];

  const filteredBrands = brands.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
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
            Verified Partner Brand Directory
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.2rem' }}>
            Discover and connect directly with vetted companies seeking creator sponsorships.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search verified brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.55rem 0.9rem',
            borderRadius: '8px',
            border: '1px solid #D1D5DB',
            fontSize: '0.85rem',
            width: '240px'
          }}
        />
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              backgroundColor: selectedCategory === cat ? '#412653' : '#FFFFFF',
              color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
              border: '1px solid #E5E7EB'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brands Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredBrands.map(brand => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onViewProfile={onSelectBrand}
          />
        ))}
      </div>
    </div>
  );
}
