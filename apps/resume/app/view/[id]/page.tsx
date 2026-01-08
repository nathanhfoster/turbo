"use client";

import { use } from "react";
import { ResumeContextProvider } from "@/domains/Resume/model/resumeContext";
import { ResumeBuilder } from "@/domains/Resume";

interface ResumePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ResumePage({ params }: ResumePageProps) {
  const { id } = use(params);

  return (
    <ResumeContextProvider>
      <ResumeBuilder resumeId={id} />
    </ResumeContextProvider>
  );
}
