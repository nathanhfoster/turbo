/**
 * Entry domain types
 * Following FSD pattern - domain-level types
 */

export interface EntryFile {
  id: number;
  file_type: string;
  name: string;
  size: number;
  date_modified: string;
  entry_id: number;
  date_created: string;
  date_updated: string;
}

export interface Entry {
  // IndexedDB fields
  id: number;
  author: number;
  title: string;
  html: string;
  tags: string;
  people: string;
  address: string;
  latitude: string;
  longitude: string;
  date_created: string;
  date_updated: string;
  date_created_by_author: string;
  views: number;
  rating: number;
  EntryFiles: EntryFile[];
  is_public: boolean;
  size: number;
  // Frontend-only fields
  _size?: number;
  _shouldDelete?: boolean;
  _shouldPost?: boolean;
}

export interface EntryState {
  entries: Entry[];
  currentEntry: Entry | null;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
  isSaving: boolean;
}

export interface EntryProps {
  entryId?: number;
}

