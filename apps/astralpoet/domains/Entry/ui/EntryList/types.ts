export interface EntryListProps {
  onEntrySelect?: (entryId: number) => void;
  onDeleteEntry?: (entryId: number) => Promise<void>;
}

