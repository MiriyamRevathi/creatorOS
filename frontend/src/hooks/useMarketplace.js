import { useState, useEffect, useCallback } from 'react';
import { brandService } from '../services/brandService';

export function useMarketplace() {
  const [brands, setBrands] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active user perspective ('creator' vs 'brand')
  const [userRole, setUserRole] = useState('creator');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetRange, setBudgetRange] = useState('all');

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [bData, cData, aData, ctrData, dData] = await Promise.all([
        brandService.getBrands({ category: selectedCategory, search: searchQuery }),
        brandService.getCampaigns({ category: selectedCategory, platform: selectedPlatform, search: searchQuery }),
        brandService.getApplications(),
        brandService.getContracts(),
        brandService.getDeliverables()
      ]);
      setBrands(bData || []);
      setCampaigns(cData || []);
      setApplications(aData || []);
      setContracts(ctrData || []);
      setDeliverables(dData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedPlatform, searchQuery]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Actions
  const handleCreateCampaign = async (campaignData) => {
    try {
      const created = await brandService.createCampaign(campaignData);
      showToast(`Campaign "${created.title}" published successfully!`);
      await loadData();
      return created;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleSubmitApplication = async (appData) => {
    try {
      const created = await brandService.submitApplication(appData);
      showToast(`Pitch submitted for "${created.campaignTitle}"!`);
      await loadData();
      return created;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleReviewApplication = async (appId, status, notes) => {
    try {
      await brandService.reviewApplication(appId, status, notes);
      showToast(`Proposal marked as ${status}. Contract initialized.`);
      await loadData();
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleSignContract = async (contractId, role) => {
    try {
      await brandService.signContract(contractId, role);
      showToast('Agreement digitally signed and sealed!');
      await loadData();
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleSubmitDraft = async (deliverableId, draftData) => {
    try {
      await brandService.submitDeliverableDraft(deliverableId, draftData);
      showToast('Content draft sent for brand review!');
      await loadData();
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleReviewDeliverable = async (deliverableId, action, feedback, reviewer) => {
    try {
      await brandService.reviewDeliverable(deliverableId, action, feedback, reviewer);
      showToast(action === 'approve' ? 'Deliverable approved & escrow payout triggered!' : 'Feedback sent to creator.');
      await loadData();
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  return {
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
    budgetRange,
    setBudgetRange,
    toast,
    showToast,
    refresh: loadData,
    handleCreateCampaign,
    handleSubmitApplication,
    handleReviewApplication,
    handleSignContract,
    handleSubmitDraft,
    handleReviewDeliverable
  };
}
