"use client";

import { ResumeContextProvider } from "@/domains/Resume/model/resumeContext";
import { ResumeBuilder } from "@/domains/Resume";

export default function Home() {
  return (
    <ResumeContextProvider>
      <ResumeBuilder />
    </ResumeContextProvider>
  );
}

