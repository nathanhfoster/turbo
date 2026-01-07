import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import WysiwygEditor from "./index";
import type { JSONContent } from "novel";
import Box from "../../atoms/Box";
import Typography from "../../atoms/Typography";

const meta = {
  title: "organisms/WysiwygEditor",
  component: WysiwygEditor,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "interactive"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when editor is empty",
    },
    editable: {
      control: "boolean",
      description: "Whether the editor is editable",
    },
    showToolbar: {
      control: "boolean",
      description: "Whether to show the toolbar",
    },
    defaultValue: {
      control: "text",
      description: "Initial HTML content (uncontrolled)",
    },
    value: {
      control: "text",
      description: "Current HTML content (controlled)",
    },
    onChange: { action: "content changed" },
    onUpdate: { action: "editor updated" },
  },
  args: {
    onChange: fn(),
    onUpdate: fn(),
  },
} satisfies Meta<typeof WysiwygEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic default story
export const Default: Story = {
  args: {
    placeholder: "Start typing...",
    editable: true,
    showToolbar: true,
  },
};

// Story with initial HTML content
export const WithInitialContent: Story = {
  args: {
    defaultValue: "<p>This is <strong>initial</strong> HTML content with <em>formatting</em>.</p><p>You can edit this content using the toolbar above.</p>",
    placeholder: "Start typing...",
    editable: true,
    showToolbar: true,
  },
};

// Story with rich HTML content
export const WithRichContent: Story = {
  args: {
    defaultValue: `
      <h1>Resume Example</h1>
      <h2>John Doe</h2>
      <p><strong>Software Engineer</strong></p>
      <h3>Experience</h3>
      <ul>
        <li>Senior Developer at Company A (2020-2024)</li>
        <li>Junior Developer at Company B (2018-2020)</li>
      </ul>
      <h3>Skills</h3>
      <p>JavaScript, TypeScript, React, Node.js</p>
    `,
    placeholder: "Start typing...",
    editable: true,
    showToolbar: true,
  },
};

// Controlled mode story
export const Controlled: Story = {
  render: (args) => {
    const [content, setContent] = useState(
      "<p>This is controlled content. Try editing it!</p>"
    );

    return (
      <Box className="space-y-4">
        <Typography variant="p" size="text-sm" className="text-gray-600">
          Content (HTML): {content.substring(0, 100)}...
        </Typography>
        <WysiwygEditor
          {...args}
          value={content}
          onChange={(html) => {
            setContent(html);
            args.onChange?.(html, {} as JSONContent);
          }}
        />
      </Box>
    );
  },
  args: {
    placeholder: "Start typing...",
    editable: true,
    showToolbar: true,
  },
};

// Read-only mode
export const ReadOnly: Story = {
  args: {
    defaultValue: "<p>This content is <strong>read-only</strong>. You cannot edit it.</p><p>The editor is disabled and the toolbar is hidden.</p>",
    editable: false,
    showToolbar: false,
  },
};

// Without toolbar
export const WithoutToolbar: Story = {
  args: {
    defaultValue: "<p>This editor doesn't show the toolbar. You can still edit, but formatting options are not available.</p>",
    placeholder: "Start typing...",
    editable: true,
    showToolbar: false,
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Enter your resume content here...",
    editable: true,
    showToolbar: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    placeholder: "Start writing your story...",
    editable: true,
    showToolbar: true,
  },
};

// Full example with all features
export const FullExample: Story = {
  render: (args) => {
    const [content, setContent] = useState("");
    const [changeCount, setChangeCount] = useState(0);

    return (
      <Box className="space-y-4">
        <Box className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Typography variant="p" size="text-sm" className="mb-2">
            <strong>Change count:</strong> {changeCount}
          </Typography>
          <Typography variant="p" size="text-xs" className="text-gray-600 dark:text-gray-400">
            Content length: {content.length} characters
          </Typography>
        </Box>
        <WysiwygEditor
          {...args}
          value={content}
          onChange={(html, json) => {
            setContent(html);
            setChangeCount((prev) => prev + 1);
            args.onChange?.(html, json);
          }}
          onUpdate={(props) => {
            args.onUpdate?.(props);
          }}
        />
      </Box>
    );
  },
  args: {
    placeholder: "Start typing your content here...",
    editable: true,
    showToolbar: true,
  },
};

