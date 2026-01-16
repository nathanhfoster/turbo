// Enhanced topic pools based on manifest categories and description
export const TOPIC_CATEGORIES = {
  professional: [
    "How LocalScore transforms professional networking in local business ecosystems",
    "Professional development through blockchain-verified impact measurement",
    "Building professional credibility with transparent Local Impact Scores",
    "The future of professional services in Web3-enabled local economies",
    "Career advancement through measurable community impact contributions",
  ],
  social: [
    "Social impact measurement in the age of blockchain verification",
    "How LocalScore strengthens social connections through transparent business practices",
    "Building social capital through Local Impact Score participation",
    "Community social networks powered by verified business impact data",
    "Social responsibility meets blockchain: The LocalScore approach",
  ],
  local: [
    "Local economic development through blockchain-verified business impact",
    "How LocalScore empowers local community decision-making",
    "The multiplier effect of supporting high-LIS local businesses",
    "Local business discovery through AI-powered impact scoring",
    "Community resilience through transparent local business networks",
  ],
  business: [
    "Business transformation through Local Impact Score implementation",
    "How LocalScore helps businesses showcase authentic community contributions",
    "The competitive advantage of blockchain-verified business impact",
    "Business intelligence through LocalScore's bleeding-edge infrastructure",
    "Strategic business development using Local Impact Score insights",
  ],
  finance: [
    "Financial transparency through blockchain-verified impact scores",
    "How LocalScore creates new financial models for local business support",
    "Investment decision-making enhanced by Local Impact Score data",
    "Financial sustainability through measurable community impact",
    "The economics of blockchain-verified business scoring systems",
  ],
  community: [
    "Community empowerment through LocalScore's transparent impact measurement",
    "How LocalScore returns local impact measurement to the people",
    "Building stronger communities through verified business impact data",
    "Community-driven economic development with LocalScore",
    "The role of AI agents in strengthening local community connections",
  ],
  web3_innovation: [
    "Web3's role in revolutionizing local business transparency",
    "Smart contracts enabling verified local business impact measurement",
    "How LocalScore leverages blockchain for authentic community impact scoring",
    "The intersection of Web3 technology and local economic development",
    "Decentralized business impact verification through LocalScore",
  ],
  ai_revolution: [
    "AI agents transforming local business profile development",
    "How LocalScore's AI enhances human potential in community building",
    "The future of AI-powered local economic development",
    "Machine learning applications in Local Impact Score calculation",
    "AI-driven insights for local business and community growth",
  ],
};

// Enhanced trending angles based on manifest mission
export const TRENDING_ANGLES = [
  "2025 trends in blockchain-verified",
  "The future of AI-powered",
  "How LocalScore is revolutionizing",
  "Breaking barriers in local",
  "The untold impact of",
  "Why 2025 is the year for transparent",
  "Lessons from LocalScore's approach to",
  "The evolution of community-driven",
  "Debunking myths about Web3",
  "Hidden opportunities in local",
  "LocalScore's bleeding-edge approach to",
  "The vanguard of AI revolution in",
];

// Seasonal themes with LocalScore context
export const SEASONAL_THEMES = {
  spring: [
    "spring business renewal through LocalScore",
    "growth measurement via Local Impact Scores",
    "fresh community partnerships",
    "spring local economic development",
    "outdoor business impact showcasing",
  ],
  summer: [
    "summer local business discovery",
    "festival and event impact measurement",
    "outdoor market transparency",
    "seasonal business LIS optimization",
    "summer community engagement",
  ],
  fall: [
    "harvest season impact measurement",
    "year-end LIS preparation",
    "back-to-school community support",
    "fall business planning with LocalScore",
    "autumn community resilience",
  ],
  winter: [
    "winter community support networks",
    "holiday business impact transparency",
    "year-end LocalScore reporting",
    "winter local economic strategies",
    "community warmth through verified impact",
  ],
};

// Target audience based content angles
export const AUDIENCE_ANGLES = {
  "local businesses": [
    "how to optimize your Local Impact Score",
    "building authentic community connections",
    "showcasing measurable business impact",
    "leveraging AI agents for business growth",
  ],
  "economic developers": [
    "data-driven economic development strategies",
    "measuring and improving local economic health",
    "blockchain-verified development impact",
    "AI-powered economic insights",
  ],
  "city leaders": [
    "policy making with transparent impact data",
    "civic engagement through verified business scores",
    "building smarter cities with LocalScore",
    "leadership in the AI revolution",
  ],
  professionals: [
    "professional growth through community impact",
    "career advancement in Web3 era",
    "networking through LocalScore platform",
    "professional development with AI tools",
  ],
  "community members": [
    "making informed local business choices",
    "community empowerment through transparency",
    "supporting businesses that make measurable change",
    "participating in the local impact movement",
  ],
};

// Tone guidelines for different writing styles
export const TONE_GUIDELINES = {
  informative:
    "Write in a clear, objective, and educational tone, focusing on facts and explanations while maintaining engagement",
  creative:
    "Write in an engaging, imaginative tone with colorful descriptions, storytelling elements, and innovative perspectives",
  technical:
    "Write in a precise, detailed tone with technical accuracy, professional terminology, and deep analytical insights",
  casual:
    "Write in a friendly, conversational tone as if chatting with a knowledgeable friend while maintaining professionalism",
} as const;

// Enhanced audience-specific guidelines based on manifest target users
export const AUDIENCE_GUIDELINES = {
  "local businesses": {
    focus:
      "practical implementation, ROI, competitive advantage, operational efficiency",
    tone: "practical and actionable",
    keywords: [
      "business growth",
      "Local Impact Score",
      "competitive edge",
      "community trust",
      "measurable results",
    ],
    callToAction:
      "optimize your Local Impact Score and showcase your authentic community contributions",
  },
  "economic developers": {
    focus:
      "policy implications, regional impact, data-driven strategies, economic metrics",
    tone: "strategic and data-focused",
    keywords: [
      "economic development",
      "regional growth",
      "policy framework",
      "impact measurement",
      "strategic planning",
    ],
    callToAction:
      "leverage LocalScore data for informed economic development decisions",
  },
  "city leaders": {
    focus:
      "governance, civic engagement, policy making, public trust, transparency",
    tone: "authoritative yet accessible",
    keywords: [
      "civic engagement",
      "transparent governance",
      "public trust",
      "policy innovation",
      "community empowerment",
    ],
    callToAction:
      "implement LocalScore for transparent, data-driven civic decision-making",
  },
  professionals: {
    focus:
      "career advancement, networking, skill development, professional growth",
    tone: "aspirational and informative",
    keywords: [
      "professional development",
      "career growth",
      "networking",
      "skill enhancement",
      "thought leadership",
    ],
    callToAction:
      "advance your career through LocalScore's professional community network",
  },
  "community members": {
    focus:
      "personal empowerment, local impact, consumer choices, community participation",
    tone: "empowering and accessible",
    keywords: [
      "community empowerment",
      "informed choices",
      "local impact",
      "transparency",
      "participation",
    ],
    callToAction:
      "join the movement to support businesses making measurable community impact",
  },
} as const;

// Category-specific content frameworks based on manifest categories
export const CATEGORY_FRAMEWORKS = {
  professional: {
    themes: [
      "career advancement",
      "networking",
      "skill development",
      "thought leadership",
      "professional credibility",
    ],
    connections:
      "professional growth through verified community impact contributions",
    manifestAlignment: "building profiles and showcasing professional impact",
  },
  social: {
    themes: [
      "community building",
      "social responsibility",
      "relationship building",
      "social impact",
      "collective action",
    ],
    connections:
      "strengthening social connections through transparent business practices",
    manifestAlignment:
      "connecting communities with companies making measurable change",
  },
  local: {
    themes: [
      "local economy",
      "community development",
      "regional growth",
      "local pride",
      "economic resilience",
    ],
    connections:
      "empowering local economic development through verified impact measurement",
    manifestAlignment: "returning local impact measurement to the people",
  },
  business: {
    themes: [
      "business innovation",
      "competitive advantage",
      "operational excellence",
      "market positioning",
      "growth strategies",
    ],
    connections:
      "business transformation through blockchain-verified impact scores",
    manifestAlignment: "showcasing AI agents and becoming part of the platform",
  },
  finance: {
    themes: [
      "financial innovation",
      "investment strategies",
      "economic models",
      "financial transparency",
      "sustainable finance",
    ],
    connections:
      "creating new financial models through verified business impact data",
    manifestAlignment:
      "blockchain-verified business impact scores for financial decision-making",
  },
  community: {
    themes: [
      "community empowerment",
      "civic engagement",
      "collective impact",
      "social cohesion",
      "local governance",
    ],
    connections:
      "empowering communities through transparent, measurable impact data",
    manifestAlignment:
      "connecting communities with companies making measurable change",
  },
  web3_innovation: {
    themes: [
      "blockchain technology",
      "decentralization",
      "smart contracts",
      "digital transformation",
      "technological innovation",
    ],
    connections:
      "leveraging Web3 technology for authentic community impact verification",
    manifestAlignment:
      "built on bleeding-edge infrastructure and Web3 platform capabilities",
  },
  ai_revolution: {
    themes: [
      "artificial intelligence",
      "automation",
      "machine learning",
      "human-AI collaboration",
      "technological advancement",
    ],
    connections:
      "AI agents enhancing human potential in community and business development",
    manifestAlignment:
      "on the vanguard of the AI revolution—enhancing human potential, not replacing it",
  },
} as const;

// Mission-aligned content angles based on manifest description
export const MISSION_ANGLES = {
  blockchain_verification:
    "How blockchain technology ensures authenticity and trust in business impact measurement",
  local_impact_score:
    "The revolutionary Local Impact Score (LIS) system and its real-world applications",
  smart_contracts:
    "Smart contracts enabling transparent, automated impact verification",
  ai_enhancement:
    "AI agents that enhance human potential rather than replace human judgment",
  community_empowerment:
    "Returning local impact measurement power to communities and people",
  economic_development:
    "Transparent tools for local economic developers and city leaders",
  measurable_change:
    "Connecting communities with companies making verifiable, measurable impact",
  bleeding_edge:
    "Cutting-edge infrastructure and frontend technology leadership",
} as const;
