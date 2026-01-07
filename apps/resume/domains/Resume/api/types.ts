/**
 * API layer types for Resume domain
 * Following FSD pattern - API integration layer types
 */

export interface ImproveResumeRequest {
  content: string;
  instructions?: string;
}

export interface TailorResumeRequest {
  content: string;
  jobDescription: string;
}

export interface GenerateSuggestionsRequest {
  content: string;
  section?: string;
}

export interface AIApiResponse {
  success: boolean;
  content?: string;
  error?: {
    message: string;
    code?: string;
  };
}
