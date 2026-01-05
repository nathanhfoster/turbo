import { createSlice, type Draft } from "@nathanhfoster/resurrection";
import type { ResumeState, Resume } from "./types";

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,
  isEditing: false,
  isSaving: false,
};

// Action reducers
const SetResumes = (state: Draft<ResumeState>, resumes: Resume[]) => {
  state.resumes = resumes;
};

const SetCurrentResume = (state: Draft<ResumeState>, resume: Resume | null) => {
  state.currentResume = resume;
};

const AddResume = (state: Draft<ResumeState>, resume: Resume) => {
  state.resumes.push(resume);
};

const UpdateResume = (state: Draft<ResumeState>, resume: Resume) => {
  const index = state.resumes.findIndex((r) => r.id === resume.id);
  if (index !== -1) {
    state.resumes[index] = resume;
  }
  if (state.currentResume?.id === resume.id) {
    state.currentResume = resume;
  }
};

const DeleteResume = (state: Draft<ResumeState>, resumeId: string) => {
  state.resumes = state.resumes.filter((r) => r.id !== resumeId);
  if (state.currentResume?.id === resumeId) {
    state.currentResume = null;
  }
};

const SetLoading = (state: Draft<ResumeState>, isLoading: boolean) => {
  state.isLoading = isLoading;
};

const SetError = (state: Draft<ResumeState>, error: string | null) => {
  state.error = error;
};

const SetEditing = (state: Draft<ResumeState>, isEditing: boolean) => {
  state.isEditing = isEditing;
};

const SetSaving = (state: Draft<ResumeState>, isSaving: boolean) => {
  state.isSaving = isSaving;
};

export const resumeSlice = createSlice({
  name: "Resume",
  initialState,
  actions: {
    SetResumes,
    SetCurrentResume,
    AddResume,
    UpdateResume,
    DeleteResume,
    SetLoading,
    SetError,
    SetEditing,
    SetSaving,
  },
});

