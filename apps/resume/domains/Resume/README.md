# Resume Domain

The Resume domain handles all resume-related business logic, including creation, editing, AI-powered improvements, and persistence.

## Purpose

This domain manages the complete resume lifecycle:
- Resume creation and editing
- File upload and parsing
- AI-powered resume improvement
- Job-specific tailoring
- IndexedDB persistence
- Export functionality

## Structure

```
Resume/
├── index.tsx              # Domain container (ResumeBuilder)
├── api/                   # API integration (if needed)
├── model/                 # State management
│   ├── types.ts          # Domain types
│   ├── resumeSlice.ts    # Redux slice
│   ├── selectors.ts      # Memoized selectors
│   └── resumeContext.tsx # React context provider
├── lib/                   # Domain utilities
│   ├── export.ts         # Export functions (HTML, PDF, TXT)
│   ├── fileParser.ts     # File parsing utilities
│   └── constants.ts      # Domain constants
├── hooks/                 # Business logic hooks
│   ├── useResume.ts      # Main domain hook
│   ├── useResumeEditor.ts # Editor-specific logic
│   ├── useResumeAI.ts    # AI integration
│   ├── useResumeForm.ts  # Form management
│   └── useResumeActions.ts # Action handlers
└── ui/                    # Presentation components
    ├── ResumeEditor/     # Main editor component
    ├── ResumeViewer/     # Resume preview
    ├── ResumeSelector/   # Resume list/selector
    ├── LeftPane/         # Left sidebar
    └── RightPane/        # Right sidebar
```

## Key Concepts

### Resume Entity

```typescript
interface Resume {
  id: string;
  name: string;
  content: string;
  fileName?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Resume States

- **Current Resume** - The resume being edited
- **Resume List** - All available resumes
- **Dirty State** - Whether resume has unsaved changes
- **Loading State** - Async operation status
- **Error State** - Error messages

## Usage

### Domain Container

```typescript
import { ResumeBuilder } from '@/domains/Resume';

function ResumePage() {
  return (
    <ResumeContextProvider>
      <ResumeBuilder />
    </ResumeContextProvider>
  );
}
```

### Using Domain Hooks

```typescript
import { useResume } from '@/domains/Resume/hooks/useResume';
import { useResumeAI } from '@/domains/Resume/hooks/useResumeAI';

function MyComponent() {
  const {
    resumes,
    currentResume,
    createResume,
    updateResume,
    deleteResume,
  } = useResume();

  const { improveResume, tailorForJob } = useResumeAI();

  // Use hooks...
}
```

## Components

### ResumeBuilder (Container)

Main domain container component that orchestrates all resume functionality.

**Props:**
```typescript
interface ResumeProps {
  // Optional props for customization
}
```

**Features:**
- Resume management (create, update, delete)
- File upload and parsing
- Inline editing
- AI-powered improvements
- Export functionality

### ResumeEditor

Main editing interface with contentEditable support.

**Features:**
- Inline HTML editing
- Auto-save functionality
- Change tracking
- Formatting support

### ResumeViewer

Preview component for viewing resumes.

**Features:**
- Read-only display
- Export options
- Print support

### ResumeSelector

Component for selecting and managing multiple resumes.

**Features:**
- Resume list display
- Resume selection
- File upload
- Resume deletion

## Hooks

### useResume

Main domain hook for resume management.

```typescript
const {
  resumes,              // All resumes
  currentResume,        // Currently selected resume
  isLoading,           // Loading state
  error,               // Error state
  createResume,        // Create new resume
  updateResume,        // Update existing resume
  deleteResume,        // Delete resume
  setCurrentResume,    // Set active resume
  getResumeByFileName, // Find resume by filename
  createResumeFromFile, // Create from uploaded file
  removeFileFromResume, // Remove file association
  clearFilesFromResumes, // Clear all file associations
} = useResume();
```

### useResumeEditor

Hook for editor-specific functionality.

```typescript
const {
  content,           // Current content
  isDirty,          // Has unsaved changes
  handleContentChange, // Content change handler
  saveChanges,      // Save to IndexedDB
  resetChanges,     // Discard changes
} = useResumeEditor(currentResume);
```

### useResumeAI

Hook for AI-powered features.

```typescript
const {
  improveResume,      // Improve resume content
  tailorForJob,     // Tailor for job description
  generateSuggestions, // Generate improvement suggestions
  isGenerating,       // AI operation in progress
  error,              // AI operation error
} = useResumeAI();
```

### useResumeForm

Hook for form management.

```typescript
const {
  jobDescription,    // Job description input
  setJobDescription,  // Update job description
  showJobInput,       // Show/hide job input
  toggleJobInput,     // Toggle job input visibility
  // ... more form state
} = useResumeForm();
```

### useResumeActions

Hook for action handlers.

```typescript
const {
  handleFileSuccess,    // File upload success
  handleFileError,      // File upload error
  handleFileClick,      // File click handler
  handleSave,           // Save handler
  handleImprove,        // AI improve handler
  handleTailorForJob,   // AI tailor handler
  handleCreateVersion,  // Create version handler
} = useResumeActions(
  currentResume,
  createResume,
  updateResume,
  saveChanges,
  handleContentChange,
  improveResume,
  tailorForJob
);
```

## API

### File Upload

Supports multiple file formats:
- TXT - Plain text
- HTML - HTML format
- PDF - PDF documents
- DOC/DOCX - Word documents

Files are parsed and converted to HTML content.

### Export Functions

```typescript
import {
  exportResumeAsHTML,
  exportResumeAsText,
  exportResumeAsPDF,
  copyResumeToClipboard,
} from '@/domains/Resume/lib/export';

// Export as HTML
await exportResumeAsHTML(resume);

// Export as text
await exportResumeAsText(resume);

// Export as PDF
await exportResumeAsPDF(resume);

// Copy to clipboard
await copyResumeToClipboard(resume);
```

## Patterns

### Creating a Resume

```typescript
const { createResume } = useResume();

const newResume = await createResume(
  'My Resume',
  '<h1>My Resume</h1><p>Content...</p>'
);
```

### Improving Resume with AI

```typescript
const { improveResume } = useResumeAI();
const { currentResume } = useResume();

if (currentResume) {
  const improvedContent = await improveResume(
    currentResume,
    'Make it more professional'
  );
  
  if (improvedContent) {
    // Update resume with improved content
    await updateResume({
      ...currentResume,
      content: improvedContent,
    });
  }
}
```

### Tailoring Resume for Job

```typescript
const { tailorForJob } = useResumeAI();
const { currentResume, updateResume } = useResume();

const jobDescription = 'Software Engineer position...';

if (currentResume) {
  const tailoredContent = await tailorForJob(
    currentResume,
    jobDescription
  );
  
  if (tailoredContent) {
    // Create new version tailored for job
    await createResume(
      `${currentResume.name} - Software Engineer`,
      tailoredContent
    );
  }
}
```

## State Management

The domain uses:
- **Redux (Resurrection)** - For global state management
- **React Context** - For component tree state
- **IndexedDB** - For persistence

### State Structure

```typescript
interface ResumeState {
  resumes: Resume[];
  currentResumeId: string | null;
  isLoading: boolean;
  error: string | null;
}
```

## Persistence

Resumes are persisted to IndexedDB using `@nathanhfoster/indexeddb`:

- **Automatic Save** - Changes saved automatically
- **Offline Support** - Works offline
- **Version History** - Track resume versions

## Related

- `@nathanhfoster/indexeddb` - Persistence layer
- `@nathanhfoster/llm-adapter` - AI integration (LLM provider adapter)
- `@nathanhfoster/ui` - UI components

## Architecture

This domain follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../../../FRONTEND_ARCHITECTURE.md) principles:

- **Feature-Sliced Design** - Domain organization
- **Container/Presentation Pattern** - Separation of concerns
- **Top-Down Flow** - Dependencies flow correctly
