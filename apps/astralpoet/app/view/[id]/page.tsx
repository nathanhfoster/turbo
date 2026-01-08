"use client";

import { use } from "react";
import { EntryContextProvider } from "@/domains/Entry/model/entryContext";
import { EntryJournal } from "@/domains/Entry";

interface EntryViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EntryViewPage({ params }: EntryViewPageProps) {
  const { id } = use(params);
  const entryId = parseInt(id, 10);
  
  return (
    <EntryContextProvider>
      <EntryJournal entryId={entryId} />
    </EntryContextProvider>
  );
}

