/**
 * CreatorOS Brand Marketplace API Client Service
 * Interacts with FastAPI backend routes or synchronizes with reactive local persistence.
 */

const API_BASE = '/api';

// Initial Seed Fallback Data (Directly matching data/ persistence)
const INITIAL_BRANDS = [
  {
    id: "brand-apex-audio",
    name: "Apex Audio",
    tagline: "Studio-grade acoustics for the modern content creator",
    category: "Tech & Audio",
    logo: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80",
    website: "https://apexaudio.example.com",
    location: "San Francisco, CA",
    verified: true,
    rating: 4.9,
    totalReviews: 38,
    collaborationsCount: 64,
    avgPayout: "$2,850",
    payoutSpeed: "Within 48h of approval",
    bio: "Apex Audio designs cutting-edge dynamic microphones, closed-back monitoring headphones, and desktop audio interfaces engineered specifically for streamers, podcasters, and YouTube creators.",
    guidelines: "We value authentic, audio-focused demonstrations. Highlight sound isolation, plug-and-play USB-C connectivity, and low self-noise. No scripted word-for-word reads; share your real workflow.",
    preferredPlatforms: ["YouTube", "Twitch", "TikTok", "Instagram"],
    contactEmail: "partnerships@apexaudio.example.com",
    foundedYear: 2019,
    socialHandles: {
      youtube: "@apexaudio",
      instagram: "@apexaudio.official",
      twitter: "@apexaudioHQ"
    }
  },
  {
    id: "brand-lumina-skin",
    name: "Lumina Skincare",
    tagline: "Clean, microbiome-safe botanicals with clinical backing",
    category: "Beauty & Wellness",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80",
    website: "https://luminaskin.example.com",
    location: "New York, NY",
    verified: true,
    rating: 4.8,
    totalReviews: 52,
    collaborationsCount: 110,
    avgPayout: "$1,750",
    payoutSpeed: "Same-day on delivery",
    bio: "Lumina makes non-toxic, cruelty-free barrier repair serums and hydration mists designed to withstand long screen exposure and artificial lighting fatigue.",
    guidelines: "Natural lighting is essential. Show texture application on bare skin. Mention barrier repair peptides and SPF 50 mineral protection.",
    preferredPlatforms: ["Instagram", "TikTok", "YouTube Shorts"],
    contactEmail: "collabs@luminaskin.example.com",
    foundedYear: 2021,
    socialHandles: {
      instagram: "@luminaskincare",
      tiktok: "@luminaskin"
    }
  },
  {
    id: "brand-nexus-gear",
    name: "Nexus Ergonomics",
    tagline: "Architected workspace ergonomics for relentless focus",
    category: "Desk Setup & Productivity",
    logo: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&auto=format&fit=crop&q=80",
    website: "https://nexusgear.example.com",
    location: "Austin, TX",
    verified: true,
    rating: 4.95,
    totalReviews: 46,
    collaborationsCount: 85,
    avgPayout: "$3,200",
    payoutSpeed: "Within 24h",
    bio: "Creators of motorized dual-motor solid oak standing desks, magnetic cable organizers, and monitor arms built to elevate workspace aesthetics.",
    guidelines: "Clean desk b-roll, motorized height transitions, cable management showcase. Cinematic 4K B-roll preferred.",
    preferredPlatforms: ["YouTube", "Instagram", "Pinterest"],
    contactEmail: "creators@nexusgear.example.com",
    foundedYear: 2020,
    socialHandles: {
      youtube: "@nexusworkspaces",
      instagram: "@nexusgear"
    }
  },
  {
    id: "brand-pulse-energy",
    name: "Pulse Botanicals",
    tagline: "Nootropic brain hydration with zero sugar and zero crash",
    category: "Health & Fitness",
    logo: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=150&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    website: "https://pulsebotanicals.example.com",
    location: "Boulder, CO",
    verified: true,
    rating: 4.7,
    totalReviews: 29,
    collaborationsCount: 42,
    avgPayout: "$1,400",
    payoutSpeed: "Within 72h",
    bio: "Crafted with lion's mane mushroom, L-theanine, and pink Himalayan electrolytes to fuel deep creative sessions without caffeine jitters.",
    guidelines: "Drink in morning creative routine or mid-day editing block. Showcase dissolution in ice cold water.",
    preferredPlatforms: ["TikTok", "Instagram", "YouTube"],
    contactEmail: "community@pulsebotanicals.example.com",
    foundedYear: 2022,
    socialHandles: {
      instagram: "@pulseenergy",
      tiktok: "@pulsefuel"
    }
  }
];

const INITIAL_CAMPAIGNS = [
  {
    id: "camp-apex-pro-mic",
    brandId: "brand-apex-audio",
    brandName: "Apex Audio",
    title: "Apex Vox-7 Studio Microphone Launch Campaign",
    tagline: "Showcase ultra-crisp vocal clarity in your creative streaming & podcast workflow",
    category: "Tech & Audio",
    compensationType: "Paid + Free Product",
    budget: 3500,
    currency: "USD",
    deadline: "2026-11-15",
    status: "Active",
    platforms: ["YouTube", "Twitch"],
    deliverables: [
      {
        id: "deliv-vox7-1",
        title: "Dedicated YouTube Review or Integrated 90s Segment",
        format: "YouTube Video (1080p+)",
        quantity: 1,
        requiredSpecs: "Show unboxing, physical dial adjustments, and audio comparison with baseline audio."
      },
      {
        id: "deliv-vox7-2",
        title: "Twitch Stream Overlay & Verbal Shoutout",
        format: "Live Stream",
        quantity: 2,
        requiredSpecs: "Display Apex Vox logo in streamer sponsor bar and mention custom EQ presets."
      }
    ],
    requirements: {
      minFollowers: 25000,
      niches: ["Tech Reviews", "Gaming & Streaming", "Podcasting", "Audio Engineering"],
      creatorLocation: ["United States", "Canada", "United Kingdom", "Germany", "Global"],
      exclusivityDays: 30
    },
    description: "Apex Audio is releasing the Vox-7 dynamic broadcast microphone with dual analog XLR and lossless USB-C DSP processing. We are partnering with reputable creators to demonstrate real-world noise rejection and sound presence.",
    perks: [
      "Complimentary Vox-7 Broadcast Kit with boom arm & shock mount ($399 value)",
      "15% affiliate kickback on all trackable custom link conversions",
      "Priority VIP access to upcoming DAC & monitoring hardware drops"
    ],
    applicantCount: 14,
    selectedCount: 3,
    featured: true,
    createdAt: "2026-10-01T10:00:00Z"
  },
  {
    id: "camp-lumina-glow",
    brandId: "brand-lumina-skin",
    brandName: "Lumina Skincare",
    title: "Barrier Glow 3-Step Morning Routine Campaign",
    tagline: "Aesthetic morning routine showcasing skin barrier recovery & SPF shield",
    category: "Beauty & Wellness",
    compensationType: "Paid Fixed Fee",
    budget: 1800,
    currency: "USD",
    deadline: "2026-10-30",
    status: "Active",
    platforms: ["Instagram", "TikTok"],
    deliverables: [
      {
        id: "deliv-lum-1",
        title: "High-aesthetic 45-60s Reel / TikTok",
        format: "Vertical Video (9:16)",
        quantity: 2,
        requiredSpecs: "Clear skin macro shots, natural morning lighting, ASMR dropper sound effects."
      },
      {
        id: "deliv-lum-2",
        title: "Instagram Story Sequence with Link Sticker",
        format: "Story (3 frames)",
        quantity: 1,
        requiredSpecs: "Frame 1: Routine setup, Frame 2: Product texture, Frame 3: 20% creator promo link."
      }
    ],
    requirements: {
      minFollowers: 15000,
      niches: ["Skincare", "Beauty", "Morning Routines", "Wellness"],
      creatorLocation: ["United States", "United Kingdom", "Australia"],
      exclusivityDays: 14
    },
    description: "Lumina Skincare is highlighting our Triple Peptide Barrier Essence and Dew Barrier Sunscreen. We seek creators who champion authentic skin textures, clean ingredients, and mindful morning rituals.",
    perks: [
      "Full Lumina Barrier Repair Routine box ($180 value)",
      "Opportunity for long-term monthly ambassador retainer contract",
      "Paid whitelisting ad spend behind top performing creator reels"
    ],
    applicantCount: 27,
    selectedCount: 5,
    featured: true,
    createdAt: "2026-10-03T14:30:00Z"
  },
  {
    id: "camp-nexus-desk",
    brandId: "brand-nexus-gear",
    brandName: "Nexus Ergonomics",
    title: "Ultimate Creator Workspace 2026 Tour & Redesign",
    tagline: "Transform your creative studio desk with motorized solid walnut craftsmanship",
    category: "Desk Setup & Productivity",
    compensationType: "Paid + Free Product",
    budget: 4200,
    currency: "USD",
    deadline: "2026-11-20",
    status: "Active",
    platforms: ["YouTube", "Instagram"],
    deliverables: [
      {
        id: "deliv-nex-1",
        title: "Full Desk Setup / Studio Tour Feature",
        format: "YouTube Video (10+ mins)",
        quantity: 1,
        requiredSpecs: "Show desk assembly timelapse, motor noise test, cable management tray, and sit-to-stand transitions."
      },
      {
        id: "deliv-nex-2",
        title: "Desk Aesthetic Carousel Post",
        format: "Instagram Carousel (5+ slides)",
        quantity: 1,
        requiredSpecs: "Day vs Night lighting shots, close-up grain details, clean minimal setup."
      }
    ],
    requirements: {
      minFollowers: 50000,
      niches: ["Desk Setups", "Productivity", "Tech & Coding", "Creative Spaces"],
      creatorLocation: ["United States", "Canada", "Europe"],
      exclusivityDays: 45
    },
    description: "Nexus Ergonomics crafts heirloom-grade motorized standing desks and modular aluminum accessories. We are selecting high-caliber workspace and productivity creators to review our flagship Apex Oak Pro series.",
    perks: [
      "Flagship Nexus Solid Oak Motorized Desk + Dual Monitor Arm ($1,850 value)",
      "Custom branded discount code with 10% lifetime commission",
      "Featured spotlight in Nexus Creator Showcase gallery"
    ],
    applicantCount: 19,
    selectedCount: 2,
    featured: true,
    createdAt: "2026-09-28T09:15:00Z"
  },
  {
    id: "camp-pulse-flow",
    brandId: "brand-pulse-energy",
    brandName: "Pulse Botanicals",
    title: "Deep Work Flow State Challenge",
    tagline: "How creators sustain 6-hour deep focus blocks without crashing",
    category: "Health & Fitness",
    compensationType: "Paid Fixed Fee",
    budget: 1200,
    currency: "USD",
    deadline: "2026-10-25",
    status: "Active",
    platforms: ["TikTok", "YouTube Shorts"],
    deliverables: [
      {
        id: "deliv-pls-1",
        title: "Day in the Life Focus Session Video",
        format: "Short-Form Video (30-60s)",
        quantity: 2,
        requiredSpecs: "Demonstrate mixing Pulse Botanicals packet in ice shaker during morning prep."
      }
    ],
    requirements: {
      minFollowers: 10000,
      niches: ["Productivity", "Fitness", "Design & Video Editing", "Lifestyle"],
      creatorLocation: ["Global"],
      exclusivityDays: 7
    },
    description: "Pulse Botanicals is replacing synthetic energy drinks with botanical nootropics. We want creators to share their raw, realistic editing and creative workdays.",
    perks: [
      "3-Month supply of Pulse Nootropic Elixir sticks ($150 value)",
      "Branded stainless steel shaker thermos",
      "Fast payout upon video approval"
    ],
    applicantCount: 31,
    selectedCount: 6,
    featured: false,
    createdAt: "2026-10-04T12:00:00Z"
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: "app-001",
    campaignId: "camp-apex-pro-mic",
    campaignTitle: "Apex Vox-7 Studio Microphone Launch Campaign",
    brandId: "brand-apex-audio",
    brandName: "Apex Audio",
    creatorId: "creator-alex-rivera",
    creatorName: "Alex Rivera (Studio Craft)",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    creatorNiche: "Audio Tech & Podcasting",
    creatorFollowers: 82000,
    creatorPlatform: "YouTube",
    creatorChannelUrl: "https://youtube.com/@studiocraft",
    proposedRate: 3500,
    pitchMessage: "Hey Apex Audio team! I have been reviewing microphone hardware for 5 years on YouTube with an audience of podcasters and voice actors. I'd love to produce an in-depth, side-by-side frequency response and noise-cancellation test comparing the Vox-7 against industry standards.",
    portfolioLinks: [
      "https://youtube.com/watch?v=demo-audio-review-1",
      "https://youtube.com/watch?v=demo-mic-shootout-2"
    ],
    estimatedTurnaroundDays: 12,
    status: "Accepted",
    submittedAt: "2026-10-02T11:20:00Z",
    reviewedAt: "2026-10-03T15:45:00Z",
    brandNotes: "Excellent channel engagement and authentic production quality. Approved for dedicated segment."
  },
  {
    id: "app-002",
    campaignId: "camp-lumina-glow",
    campaignTitle: "Barrier Glow 3-Step Morning Routine Campaign",
    brandId: "brand-lumina-skin",
    brandName: "Lumina Skincare",
    creatorId: "creator-elena-chen",
    creatorName: "Elena Chen",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    creatorNiche: "Skincare & Morning Aesthetic",
    creatorFollowers: 45000,
    creatorPlatform: "Instagram",
    creatorChannelUrl: "https://instagram.com/elenaskinroutine",
    proposedRate: 1800,
    pitchMessage: "Hi Lumina! My audience loves barrier-first skincare routines. I plan to film a 4K 'get ready with me' reel focusing on the lightweight peptide barrier essence under everyday makeup with natural morning light.",
    portfolioLinks: [
      "https://instagram.com/reel/sample-skincare-glow",
      "https://tiktok.com/@elenachen/video/barrier-tips"
    ],
    estimatedTurnaroundDays: 8,
    status: "Shortlisted",
    submittedAt: "2026-10-04T09:10:00Z",
    reviewedAt: "2026-10-05T10:00:00Z",
    brandNotes: "Great aesthetic match. Reviewing reel cadence before final contract issuance."
  },
  {
    id: "app-003",
    campaignId: "camp-nexus-desk",
    campaignTitle: "Ultimate Creator Workspace 2026 Tour & Redesign",
    brandId: "brand-nexus-gear",
    brandName: "Nexus Ergonomics",
    creatorId: "creator-marcus-vance",
    creatorName: "Marcus Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    creatorNiche: "Desk Setup & Software Engineering",
    creatorFollowers: 120000,
    creatorPlatform: "YouTube",
    creatorChannelUrl: "https://youtube.com/@marcusvancecode",
    proposedRate: 4200,
    pitchMessage: "I am currently filming my 2026 Studio Overhaul episode. The Nexus solid walnut desk would be the centerpiece of the entire 18-minute video. I will showcase the dual motor lift, cable raceways, and custom headphone mount integration.",
    portfolioLinks: [
      "https://youtube.com/watch?v=workspace-tour-2025",
      "https://instagram.com/p/desk-minimal-shot"
    ],
    estimatedTurnaroundDays: 18,
    status: "Accepted",
    submittedAt: "2026-09-30T14:15:00Z",
    reviewedAt: "2026-10-01T16:00:00Z",
    brandNotes: "Top tier workspace creator. High production value. Approved immediately."
  },
  {
    id: "app-004",
    campaignId: "camp-pulse-flow",
    campaignTitle: "Deep Work Flow State Challenge",
    brandId: "brand-pulse-energy",
    brandName: "Pulse Botanicals",
    creatorId: "creator-sarah-jenkins",
    creatorName: "Sarah Jenkins",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    creatorNiche: "Design & Daily Vlog",
    creatorFollowers: 28000,
    creatorPlatform: "TikTok",
    creatorChannelUrl: "https://tiktok.com/@sarahcreates",
    proposedRate: 1200,
    pitchMessage: "As a motion designer pulling 8-hour rendering sprints, I have replaced coffee with adaptogens. I want to create a fun, fast-paced editing vlog featuring Pulse in my morning brew ritual.",
    portfolioLinks: [
      "https://tiktok.com/@sarahcreates/video/motion-designer-day"
    ],
    estimatedTurnaroundDays: 5,
    status: "Pending",
    submittedAt: "2026-10-05T08:30:00Z",
    reviewedAt: null,
    brandNotes: null
  }
];

const INITIAL_CONTRACTS = [
  {
    id: "ctr-001",
    applicationId: "app-001",
    campaignId: "camp-apex-pro-mic",
    campaignTitle: "Apex Vox-7 Studio Microphone Launch Campaign",
    brandId: "brand-apex-audio",
    brandName: "Apex Audio",
    creatorId: "creator-alex-rivera",
    creatorName: "Alex Rivera (Studio Craft)",
    creatorEmail: "alex@studiocraft.example.com",
    contractAmount: 3500,
    currency: "USD",
    paymentTerms: "50% upfront escrow funded, 50% upon final content sign-off",
    escrowStatus: "Funded in Escrow",
    creatorSigned: true,
    creatorSignedAt: "2026-10-03T16:10:00Z",
    brandSigned: true,
    brandSignedAt: "2026-10-03T16:00:00Z",
    status: "Active",
    effectiveDate: "2026-10-03",
    completionDeadline: "2026-10-25",
    terms: {
      ipRights: "Creator retains original copyright; Brand receives worldwide digital perpetual advertising and organic reposting license.",
      exclusivity: "Creator agrees not to promote competing dynamic broadcast microphones for 30 calendar days post-publication.",
      revisionsPolicy: "Includes up to two (2) rounds of minor brand editorial feedback before final public publishing.",
      cancellationFee: "25% kill fee applies if brand terminates after draft submission without cause."
    }
  },
  {
    id: "ctr-002",
    applicationId: "app-003",
    campaignId: "camp-nexus-desk",
    campaignTitle: "Ultimate Creator Workspace 2026 Tour & Redesign",
    brandId: "brand-nexus-gear",
    brandName: "Nexus Ergonomics",
    creatorId: "creator-marcus-vance",
    creatorName: "Marcus Vance",
    creatorEmail: "marcus@vancecode.example.com",
    contractAmount: 4200,
    currency: "USD",
    paymentTerms: "100% in Escrow; released automatically 24h after deliverable approval",
    escrowStatus: "Funded in Escrow",
    creatorSigned: true,
    creatorSignedAt: "2026-10-01T17:30:00Z",
    brandSigned: true,
    brandSignedAt: "2026-10-01T16:45:00Z",
    status: "In Progress",
    effectiveDate: "2026-10-01",
    completionDeadline: "2026-10-22",
    terms: {
      ipRights: "Brand granted 12-month paid social whitelisting and website gallery embed usage.",
      exclusivity: "No competing motorized standing desk partnerships for 45 days.",
      revisionsPolicy: "One draft cut review to verify product accuracy before going live.",
      cancellationFee: "50% kill fee once desk shipping manifest is generated."
    }
  }
];

const INITIAL_DELIVERABLES = [
  {
    id: "del-rec-001",
    contractId: "ctr-001",
    campaignId: "camp-apex-pro-mic",
    campaignTitle: "Apex Vox-7 Studio Microphone Launch Campaign",
    brandId: "brand-apex-audio",
    brandName: "Apex Audio",
    creatorId: "creator-alex-rivera",
    creatorName: "Alex Rivera (Studio Craft)",
    title: "Dedicated Vox-7 Unboxing & Sound Test Video",
    platform: "YouTube",
    format: "Long-form 4K Video",
    status: "In Review",
    submissionUrl: "https://youtube.com/watch?v=unlisted-vox7-draft-cut",
    previewThumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80",
    notes: "Draft cut is ready! Integrated frequency test starts at 04:12 and custom noise comparison at 08:30. Let me know if the discount code callout timing works for you.",
    dueDate: "2026-10-18",
    submittedAt: "2026-10-05T16:20:00Z",
    feedback: [
      {
        id: "fb-001",
        author: "Apex Audio Brand Manager",
        timestamp: "2026-10-06T09:15:00Z",
        message: "Audio quality is phenomenal Alex! Just one quick tweak: could you boost the on-screen graphic for the XLR vs USB-C switch by 2 seconds so viewers catch the spec table?"
      }
    ],
    revisionCount: 1,
    payoutAmount: 3500
  },
  {
    id: "del-rec-002",
    contractId: "ctr-002",
    campaignId: "camp-nexus-desk",
    campaignTitle: "Ultimate Creator Workspace 2026 Tour & Redesign",
    brandId: "brand-nexus-gear",
    brandName: "Nexus Ergonomics",
    creatorId: "creator-marcus-vance",
    creatorName: "Marcus Vance",
    title: "Minimalist Desk Tour & Motorized Lift Demo",
    platform: "YouTube",
    format: "Long-form 4K Video",
    status: "Approved",
    submissionUrl: "https://youtube.com/watch?v=marcus-desk-tour-2026",
    previewThumbnail: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80",
    notes: "Video is published live! First 24h metrics: 18,400 views with an 8.2% click-through rate on the Nexus promo link.",
    dueDate: "2026-10-10",
    submittedAt: "2026-10-02T18:00:00Z",
    feedback: [
      {
        id: "fb-002",
        author: "Nexus Brand Lead",
        timestamp: "2026-10-03T11:00:00Z",
        message: "Absolutely stunning b-roll and presentation Marcus. Approved without any changes! Escrow release scheduled."
      }
    ],
    revisionCount: 0,
    payoutAmount: 4200
  },
  {
    id: "del-rec-003",
    contractId: "ctr-001",
    campaignId: "camp-apex-pro-mic",
    campaignTitle: "Apex Vox-7 Studio Microphone Launch Campaign",
    brandId: "brand-apex-audio",
    brandName: "Apex Audio",
    creatorId: "creator-alex-rivera",
    creatorName: "Alex Rivera (Studio Craft)",
    title: "Twitch Stream Overlay & Live Audio Demo",
    platform: "Twitch",
    format: "Live Broadcast Segment",
    status: "Pending Submission",
    submissionUrl: "",
    previewThumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    notes: "Scheduled for live stream this coming Friday at 7 PM EST.",
    dueDate: "2026-10-24",
    submittedAt: null,
    feedback: [],
    revisionCount: 0,
    payoutAmount: 0
  }
];

class StorageManager {
  static get(key, fallback) {
    try {
      const stored = localStorage.getItem(`creatoros_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(`creatoros_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }
}

export const brandService = {
  // BRANDS
  async getBrands(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/brands?${qs}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    
    // Fallback local memory
    let brands = StorageManager.get('brands', INITIAL_BRANDS);
    if (params.category && params.category !== 'All') {
      brands = brands.filter(b => b.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      brands = brands.filter(b => b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q));
    }
    return brands;
  },

  async getBrandById(id) {
    try {
      const res = await fetch(`${API_BASE}/brands/${id}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    const brands = StorageManager.get('brands', INITIAL_BRANDS);
    return brands.find(b => b.id === id) || null;
  },

  // CAMPAIGNS
  async getCampaigns(filters = {}) {
    try {
      const qs = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/campaigns?${qs}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    let campaigns = StorageManager.get('campaigns', INITIAL_CAMPAIGNS);
    if (filters.category && filters.category !== 'All') {
      campaigns = campaigns.filter(c => c.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.platform && filters.platform !== 'All') {
      campaigns = campaigns.filter(c => c.platforms.some(p => p.toLowerCase().includes(filters.platform.toLowerCase())));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      campaigns = campaigns.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.tagline.toLowerCase().includes(q) || 
        c.brandName.toLowerCase().includes(q)
      );
    }
    return campaigns;
  },

  async getCampaignById(id) {
    try {
      const res = await fetch(`${API_BASE}/campaigns/${id}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    const campaigns = StorageManager.get('campaigns', INITIAL_CAMPAIGNS);
    return campaigns.find(c => c.id === id) || null;
  },

  async createCampaign(campaignData) {
    try {
      const res = await fetch(`${API_BASE}/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    const campaigns = StorageManager.get('campaigns', INITIAL_CAMPAIGNS);
    const newCamp = {
      ...campaignData,
      id: `camp-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      applicantCount: 0,
      selectedCount: 0,
      status: campaignData.status || 'Active'
    };
    campaigns.unshift(newCamp);
    StorageManager.set('campaigns', campaigns);
    return newCamp;
  },

  // APPLICATIONS
  async getApplications(filters = {}) {
    try {
      const qs = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/applications?${qs}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    let apps = StorageManager.get('applications', INITIAL_APPLICATIONS);
    if (filters.status && filters.status !== 'All') {
      apps = apps.filter(a => a.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.campaignId) {
      apps = apps.filter(a => a.campaignId === filters.campaignId);
    }
    return apps;
  },

  async submitApplication(applicationData) {
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    const apps = StorageManager.get('applications', INITIAL_APPLICATIONS);
    const newApp = {
      ...applicationData,
      id: `app-${Date.now().toString(36)}`,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };
    apps.unshift(newApp);
    StorageManager.set('applications', apps);

    // Increment campaign applicants count locally
    const campaigns = StorageManager.get('campaigns', INITIAL_CAMPAIGNS);
    const camp = campaigns.find(c => c.id === applicationData.campaignId);
    if (camp) {
      camp.applicantCount = (camp.applicantCount || 0) + 1;
      StorageManager.set('campaigns', campaigns);
    }

    return newApp;
  },

  async reviewApplication(appId, status, brandNotes = '') {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, brandNotes })
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    const apps = StorageManager.get('applications', INITIAL_APPLICATIONS);
    const app = apps.find(a => a.id === appId);
    if (app) {
      app.status = status;
      app.brandNotes = brandNotes;
      app.reviewedAt = new Date().toISOString();
      StorageManager.set('applications', apps);

      // Auto issue contract & deliverables if accepted
      if (status === 'Accepted') {
        const contracts = StorageManager.get('contracts', INITIAL_CONTRACTS);
        const contractId = `ctr-${Date.now().toString(36)}`;
        const newContract = {
          id: contractId,
          applicationId: app.id,
          campaignId: app.campaignId,
          campaignTitle: app.campaignTitle,
          brandId: app.brandId,
          brandName: app.brandName,
          creatorId: app.creatorId,
          creatorName: app.creatorName,
          creatorEmail: `${app.creatorId || 'creator'}@example.com`,
          contractAmount: app.proposedRate,
          currency: "USD",
          paymentTerms: "100% Escrow protected; released upon brand sign-off",
          escrowStatus: "Funded in Escrow",
          creatorSigned: false,
          brandSigned: true,
          brandSignedAt: new Date().toISOString(),
          status: "Active",
          effectiveDate: new Date().toISOString().split('T')[0],
          completionDeadline: "2026-11-30",
          terms: {
            ipRights: "Creator retains original copyright; Brand receives digital commercial license.",
            exclusivity: "Standard category exclusivity during active campaign.",
            revisionsPolicy: "Includes up to two minor feedback revisions before final publish.",
            cancellationFee: "25% kill fee applies if cancelled after contract sign-off."
          }
        };
        contracts.unshift(newContract);
        StorageManager.set('contracts', contracts);

        const deliverables = StorageManager.get('deliverables', INITIAL_DELIVERABLES);
        deliverables.unshift({
          id: `del-rec-${Date.now().toString(36)}`,
          contractId: contractId,
          campaignId: app.campaignId,
          campaignTitle: app.campaignTitle,
          brandId: app.brandId,
          brandName: app.brandName,
          creatorId: app.creatorId,
          creatorName: app.creatorName,
          title: "Primary Content Deliverable (Video/Reel)",
          platform: app.creatorPlatform || "YouTube",
          format: "Video Content",
          status: "Pending Submission",
          submissionUrl: "",
          dueDate: "2026-11-20",
          submittedAt: null,
          feedback: [],
          revisionCount: 0,
          payoutAmount: app.proposedRate
        });
        StorageManager.set('deliverables', deliverables);
      }
    }
    return app;
  },

  // CONTRACTS
  async getContracts(filters = {}) {
    try {
      const qs = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/contracts?${qs}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    let contracts = StorageManager.get('contracts', INITIAL_CONTRACTS);
    if (filters.status && filters.status !== 'All') {
      contracts = contracts.filter(c => c.status.toLowerCase() === filters.status.toLowerCase());
    }
    return contracts;
  },

  async signContract(contractId, role = 'creator') {
    try {
      const res = await fetch(`${API_BASE}/contracts/${contractId}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    const contracts = StorageManager.get('contracts', INITIAL_CONTRACTS);
    const contract = contracts.find(c => c.id === contractId);
    if (contract) {
      if (role === 'creator') {
        contract.creatorSigned = true;
        contract.creatorSignedAt = new Date().toISOString();
      }
      contract.status = 'Active';
      StorageManager.set('contracts', contracts);
    }
    return contract;
  },

  // DELIVERABLES
  async getDeliverables(filters = {}) {
    try {
      const qs = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE}/deliverables?${qs}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    let items = StorageManager.get('deliverables', INITIAL_DELIVERABLES);
    if (filters.status && filters.status !== 'All') {
      items = items.filter(d => d.status.toLowerCase() === filters.status.toLowerCase());
    }
    return items;
  },

  async submitDeliverableDraft(deliverableId, data) {
    try {
      const res = await fetch(`${API_BASE}/deliverables/${deliverableId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    const deliverables = StorageManager.get('deliverables', INITIAL_DELIVERABLES);
    const deliv = deliverables.find(d => d.id === deliverableId);
    if (deliv) {
      deliv.submissionUrl = data.submissionUrl;
      deliv.notes = data.notes || '';
      deliv.status = 'In Review';
      deliv.submittedAt = new Date().toISOString();
      StorageManager.set('deliverables', deliverables);
    }
    return deliv;
  },

  async reviewDeliverable(deliverableId, action, feedback, reviewerName = 'Brand Lead') {
    try {
      const res = await fetch(`${API_BASE}/deliverables/${deliverableId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, feedback, reviewerName })
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    const deliverables = StorageManager.get('deliverables', INITIAL_DELIVERABLES);
    const deliv = deliverables.find(d => d.id === deliverableId);
    if (deliv) {
      if (feedback) {
        deliv.feedback = deliv.feedback || [];
        deliv.feedback.push({
          id: `fb-${Date.now()}`,
          author: reviewerName,
          timestamp: new Date().toISOString(),
          message: feedback
        });
      }

      if (action === 'approve') {
        deliv.status = 'Approved';
        // Auto complete contract
        const contracts = StorageManager.get('contracts', INITIAL_CONTRACTS);
        const ctr = contracts.find(c => c.id === deliv.contractId);
        if (ctr) {
          ctr.status = 'Completed';
          ctr.escrowStatus = 'Released';
          StorageManager.set('contracts', contracts);
        }
      } else if (action === 'request_revision') {
        deliv.status = 'Revision Requested';
        deliv.revisionCount = (deliv.revisionCount || 0) + 1;
      } else if (action === 'reject') {
        deliv.status = 'Rejected';
      }
      StorageManager.set('deliverables', deliverables);
    }
    return deliv;
  }
};
