import type { BlogPromptParams } from "./types";
import {
  AUDIENCE_GUIDELINES,
  CATEGORY_FRAMEWORKS,
  MISSION_ANGLES,
  TONE_GUIDELINES,
  TOPIC_CATEGORIES,
  TRENDING_ANGLES,
} from "./constants";

export * from "./generator";
export * from "./constants";
export * from "./types";

export interface ManifestConfig {
  url: string;
  name: string;
  description: string;
  categories: string[];
}

/**
 * Generate a random blog topic based on category and current trends
 */
export const generateRandomTopic = (category: string = "business"): string => {
  const categoryTopics =
    TOPIC_CATEGORIES[category as keyof typeof TOPIC_CATEGORIES] ||
    TOPIC_CATEGORIES.business;
  const trendingAngle =
    TRENDING_ANGLES[Math.floor(Math.random() * TRENDING_ANGLES.length)];
  const baseTopic =
    categoryTopics[Math.floor(Math.random() * categoryTopics.length)];

  // 30% chance to add trending angle
  if (Math.random() < 0.3) {
    return `${trendingAngle} ${baseTopic.toLowerCase()}`;
  }

  return baseTopic;
};

/**
 * Generate blog prompt with enhanced customization
 */
export const getBlogPrompt = (
  {
    topic,
    tone = "informative",
    targetAudience = "local businesses",
    category = "business",
  }: BlogPromptParams,
  manifest: ManifestConfig,
) => {
  const url = manifest.url;
  const companyName = manifest.name;
  const description = manifest.description;
  const categories = manifest.categories;

  // Get audience-specific guidelines
  const audienceGuide =
    AUDIENCE_GUIDELINES[targetAudience as keyof typeof AUDIENCE_GUIDELINES] ||
    AUDIENCE_GUIDELINES["local businesses"];

  // Get category-specific framework
  const categoryFramework =
    CATEGORY_FRAMEWORKS[category as keyof typeof CATEGORY_FRAMEWORKS] ||
    CATEGORY_FRAMEWORKS["business"];

  // Select relevant mission angles with improved matching
  const relevantMissionAngles = Object.entries(MISSION_ANGLES)
    .filter(([key, _]) => {
      const keyWords = key.replace("_", " ").toLowerCase();
      const topicLower = topic.toLowerCase();
      const categoryLower = category.toLowerCase();
      const audienceLower = targetAudience.toLowerCase();

      return (
        topicLower.includes(keyWords) ||
        categoryLower.includes(key.split("_")[0]) ||
        audienceLower.includes(key.split("_")[0]) ||
        // Enhanced matching for related terms
        (key === "ai_enhancement" &&
          (topicLower.includes("ai") || topicLower.includes("artificial"))) ||
        (key === "blockchain_verification" &&
          (topicLower.includes("blockchain") ||
            topicLower.includes("verification"))) ||
        (key === "community_empowerment" && topicLower.includes("community"))
      );
    })
    .map(([_, value]) => value);

  return `
You are writing a sophisticated blog post for **${companyName}** (${url}), the pioneering digital impact platform that ${description}

### Strategic Context
**Company Mission**: ${description}

**Platform Categories**: ${categories.join(", ")}

**Target Audience**: ${targetAudience}
- **Focus Areas**: ${audienceGuide.focus}
- **Tone Approach**: ${audienceGuide.tone}
- **Key Concepts**: ${audienceGuide.keywords.join(", ")}

**Content Category**: ${category}
- **Core Themes**: ${categoryFramework.themes.join(", ")}
- **${companyName} Connection**: ${categoryFramework.connections}
- **Manifest Alignment**: ${categoryFramework.manifestAlignment}

### Content Topic
${topic}

### Writing Guidelines
**Tone**: ${TONE_GUIDELINES[tone]}

**Mission Integration**: Weave in these ${companyName} differentiators naturally:
${
  relevantMissionAngles.length > 0
    ? relevantMissionAngles.map((angle) => `- ${angle}`).join("\n")
    : `- Blockchain-verified business impact scoring through Local Impact Score (LIS)
- AI agents that enhance human potential in community building
- Smart contracts ensuring transparent, automated impact verification
- Bleeding-edge infrastructure on the vanguard of the AI revolution`
}

**Content Strategy**:
- **Diversity**: Explore ${category} topics from unique angles while maintaining clear connections to ${companyName}'s mission
- **Depth**: Provide comprehensive insights (1200–1800 words) that establish thought leadership
- **Practical Value**: Include actionable takeaways relevant to ${targetAudience}
- **Current Relevance**: Incorporate trending topics, seasonal themes, or timely developments
- **Authentic Integration**: Naturally connect tangential topics back to ${companyName}'s core value proposition

**Content Architecture**:
- **Introduction**: Hook readers with a compelling angle that bridges the topic to ${companyName}'s mission
- **Main Sections**: 3-4 substantial sections exploring different facets of the topic
- **Real-World Applications**: Concrete examples of how ${companyName} addresses the topic's challenges
- **Future Implications**: Vision for how ${companyName}'s approach shapes the future
- **Call to Action**: Specific next steps aligned with ${audienceGuide.callToAction}

### Technical Specifications
- **SEO Optimization**: Natural keyword integration focusing on ${audienceGuide.keywords.join(", ")}
- **Readability**: Break complex concepts into digestible sections with clear subheadings
- **Engagement**: Include compelling statistics, case studies, or thought-provoking questions
- **Authority**: Position ${companyName} as the innovative leader in transparent impact measurement

### HTML Structure Requirements
- **Container**: <article class="prose prose-lg mx-auto px-4 py-8 max-w-4xl">
- **Title**: <h1 class="text-4xl font-bold text-center mb-8 text-gray-900 leading-tight">
- **Introduction**: <p class="text-xl text-gray-700 mb-8 leading-relaxed">
- **Sections**: <section class="mb-12"> with <h2 class="text-2xl font-semibold mb-6 text-gray-800">
- **Subsections**: <h3 class="text-xl font-medium mb-4 text-purple-600">
- **Emphasis Blocks**: <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-8 border-l-4 border-purple-500">
- **Key Points**: <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
- **Lists**: <ul class="list-disc list-inside text-gray-700 space-y-3 mb-6">
- **Quotes/Highlights**: <blockquote class="border-l-4 border-blue-500 pl-6 italic text-gray-600 mb-6">
- **Statistics**: <div class="text-center p-4 bg-emerald-50 rounded-lg mb-6">
- **Call-to-Action**: <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 text-center mb-8">

### Styling Guidelines
- **Color Scheme**: Purple (#8B5CF6), Blue (#3B82F6), Emerald (#10B981), and Gray scale
- **Typography**: Consistent heading hierarchy with proper spacing (mb-4, mb-6, mb-8, mb-12)
- **Visual Elements**: Use shadow-lg for important cards, rounded-lg for modern feel
- **Responsive Design**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 patterns for multi-column layouts
- **Accessibility**: Proper contrast ratios and semantic HTML structure

### Final Output Requirements
- **Format**: Single-line HTML string without line breaks or explanations
- **Quality**: Professional, engaging, and authoritative content (minimum 1200 words)
- **Uniqueness**: Fresh perspective that differentiates ${companyName} from competitors
- **Value**: Readers should finish with clear understanding of how ${companyName} solves real problems
- **SEO**: Include meta-relevant keywords naturally throughout the content
- **Structure**: Proper semantic HTML with clear hierarchy and accessibility

### Content Validation
Ensure the content includes:
- At least 3 substantial sections with proper headings
- Concrete examples or case studies
- Clear connection to ${companyName}'s value proposition
- Actionable insights for the target audience
- Professional tone consistent with ${tone} style

Return only the complete HTML <article> element with all content.
`;
};
