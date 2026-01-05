// Valid tone options
export type BlogTone = 'informative' | 'creative' | 'technical' | 'casual';

export interface BlogPromptParams {
  topic: string;
  tone?: BlogTone;
  targetAudience?: string;
  category?: string;
}

export interface ManifestConfig {
  url: string;
  name: string;
  description: string;
  categories: string[];
}

// Enhanced diversity scoring system
export interface DiversityMetrics {
  categoryBalance: number;
  audienceBalance: number;
  toneVariety: number;
  temporalSpread: number;
  overallDiversity: number;
}

// Blog generation configuration
export interface BlogGenerationConfig {
  useCache?: boolean;
  maxRetries?: number;
  temperature?: number;
  maxTokens?: number;
  validateContent?: boolean;
}

// Blog content validation result
export interface BlogValidationResult {
  isValid: boolean;
  wordCount: number;
  hasProperStructure: boolean;
  hasCallToAction: boolean;
  issues: string[];
}

// Blog generation result
export interface BlogGenerationResult {
  success: boolean;
  content?: string;
  metadata?: {
    topic: string;
    category: string;
    audience: string;
    tone: BlogTone;
    wordCount: number;
    generatedAt: Date;
  };
  error?: string;
}

