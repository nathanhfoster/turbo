import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import FileDropper from "./index";

const meta = {
  title: "atoms/FileDropper",
  component: FileDropper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "error",
        "success",
        "warning",
        "info",
        "white",
        "black",
        "gray",
        "inherit",
      ],
    },
    size: {
      control: "select",
      options: [
        "inherit",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl",
      ],
    },
    multiple: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    showDropZone: {
      control: "boolean",
    },
    accept: {
      control: "text",
    },
    maxSize: {
      control: "number",
    },
    label: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    errorMessage: {
      control: "text",
    },
    dropZoneText: {
      control: "text",
    },
    loading: {
      control: "boolean",
    },
    loadingText: {
      control: "text",
    },
  },
  args: {
    onFilesSelected: fn(),
  },
} satisfies Meta<typeof FileDropper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dropZoneText: "Drop files here or click to browse",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Upload Document",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Upload Document",
    helperText: "Please upload a PDF file (max 10MB)",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const WithAcceptTypes: Story = {
  args: {
    label: "Upload Image",
    accept: "image/*",
    helperText: "Accepted formats: JPG, PNG, GIF",
    dropZoneText: "Drop images here or click to browse",
  },
};

export const MultipleFiles: Story = {
  args: {
    label: "Upload Multiple Files",
    multiple: true,
    helperText: "You can select multiple files at once",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const WithMaxSize: Story = {
  args: {
    label: "Upload File",
    maxSize: 5 * 1024 * 1024, // 5MB
    helperText: "Maximum file size: 5MB",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Upload Document",
    error: true,
    errorMessage: "Please select a valid file",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const Disabled: Story = {
  args: {
    label: "Upload Document",
    disabled: true,
    dropZoneText: "Drop files here or click to browse",
  },
};

export const CustomColor: Story = {
  args: {
    label: "Upload Document",
    color: "secondary",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const CustomDropZoneText: Story = {
  args: {
    label: "Upload Document",
    dropZoneText: "Click here to upload your files",
    helperText: "Drag and drop is also supported",
  },
};

export const WithoutDropZone: Story = {
  args: {
    label: "Upload Document",
    showDropZone: false,
    dropZoneText: "Click to browse files",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Upload Document",
    size: "sm",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Upload Document",
    size: "lg",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const Loading: Story = {
  args: {
    label: "Upload Document",
    loading: true,
    loadingText: "Processing files...",
    dropZoneText: "Drop files here or click to browse",
  },
};

export const LoadingWithCustomText: Story = {
  args: {
    label: "Upload Resume",
    loading: true,
    loadingText: "Parsing resume file...",
    dropZoneText: "Drop files here or click to browse",
  },
};
