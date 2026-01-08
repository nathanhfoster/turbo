"use client";

import { use } from "react";
import { EntryContextProvider } from "@/domains/Entry/model/entryContext";
import { EntryJournal } from "@/domains/Entry";

interface EntryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EntryPage({ params }: EntryPageProps) {
  const { id } = use(params);
  const entryId = parseInt(id, 10);

  return (
    <EntryContextProvider>
      <EntryJournal entryId={entryId} />
    </EntryContextProvider>
  );
}

