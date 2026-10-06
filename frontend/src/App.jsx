import React, { useState } from 'react';
import { useMarketplace } from './hooks/useMarketplace';
import Navbar from './components/marketplace/Navbar';
import BrandMarketplace from './pages/brands/BrandMarketplace';
import BrandProfile from './pages/brands/BrandProfile';
import Campaigns from './pages/brands/Campaigns';
import CampaignDetails from './pages/brands/CampaignDetails';
import Applications from './pages/brands/Applications';
import Contracts from './pages/brands/Contracts';
import Deliverables from './pages/brands/Deliverables';
import BrandDirectory from './pages/brands/BrandDirectory';

export default function App() {
  const [activePage, setActivePage] = useState('marketplace');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const {
    brands,
    campaigns,
    applications,
    contracts,
    deliverables,
    loading,
    error,
    userRole,
    setUserRole,
    selectedCategory,
    setSelectedCategory,
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
    toast,
    handleCreateCampaign,
    handleSubmitApplication,
    handleReviewApplication,
    handleSignContract,
    handleSubmitDraft,
    handleReviewDeliverable
  } = useMarketplace();

  // Navigation handlers
  const handleSelectCampaign = (camp) => {
    setSelectedCampaign(camp);
    setActivePage('campaign-details');
  };

  const handleSelectBrand = (b) => {
    const fullBrand = brands.find(item => item.id === b.id) || b;
    setSelectedBrand(fullBrand);
    setActivePage('brand-profile');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          backgroundColor: toast.type === 'error' ? '#EF4444' : '#412653',
          color: '#FFFFFF',
          padding: '0.85rem 1.4rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          animation: 'fadeIn 0.25s ease-out'
        }}>
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          if (page === 'campaigns') setSelectedCampaign(null);
          if (page === 'brands') setSelectedBrand(null);
        }}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenNewCampaign={() => {
          setActivePage('campaigns');
        }}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '1.75rem 1.5rem' }}>
        {loading && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
            Loading CreatorOS Marketplace...
          </div>
        )}

        {!loading && (
          <>
            {activePage === 'marketplace' && (
              <BrandMarketplace
                campaigns={campaigns}
                brands={brands}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectCampaign={handleSelectCampaign}
                onSelectBrand={handleSelectBrand}
                onSubmitApplication={handleSubmitApplication}
              />
            )}

            {activePage === 'campaign-details' && (
              <CampaignDetails
                campaign={selectedCampaign}
                brand={brands.find(b => b.id === selectedCampaign?.brandId)}
                userRole={userRole}
                onBack={() => setActivePage('marketplace')}
                onApply={handleSubmitApplication}
                onViewBrand={handleSelectBrand}
              />
            )}

            {activePage === 'brand-profile' && (
              <BrandProfile
                brand={selectedBrand}
                campaigns={campaigns}
                onSelectCampaign={handleSelectCampaign}
                onBack={() => setActivePage('marketplace')}
              />
            )}

            {activePage === 'campaigns' && (
              <Campaigns
                campaigns={campaigns}
                brands={brands}
                userRole={userRole}
                onSelectCampaign={handleSelectCampaign}
                onCreateCampaign={handleCreateCampaign}
              />
            )}

            {activePage === 'applications' && (
              <Applications
                applications={applications}
                userRole={userRole}
                onReviewApplication={handleReviewApplication}
              />
            )}

            {activePage === 'contracts' && (
              <Contracts
                contracts={contracts}
                userRole={userRole}
                onSignContract={handleSignContract}
              />
            )}

            {activePage === 'deliverables' && (
              <Deliverables
                deliverables={deliverables}
                userRole={userRole}
                onSubmitDraft={handleSubmitDraft}
                onReviewDeliverable={handleReviewDeliverable}
              />
            )}

            {activePage === 'brands' && (
              <BrandDirectory
                brands={brands}
                onSelectBrand={handleSelectBrand}
              />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        padding: '2rem 1.5rem',
        marginTop: '3rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#6B7280'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 800, color: '#412653' }}>CreatorOS</span>
            <span>• Unified Operating System for Content Creators</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Zero Database / File-based JSON Engine</span>
            <span>Locked Brand Palette</span>
            <span>Escrow Guaranteed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
