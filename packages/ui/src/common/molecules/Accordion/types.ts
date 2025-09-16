import type { DataComponent } from '../../../types';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps extends DataComponent<AccordionItem> {
  allowMultiple?: boolean;
  className?: string;
}
