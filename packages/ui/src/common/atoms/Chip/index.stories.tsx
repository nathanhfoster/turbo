import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Chip } from "./index";

const meta = {
  title: "atoms/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
  args: { onRemove: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Chip",
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    label: "Primary Chip",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Chip",
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    label: "Small Chip",
    size: "sm",
  },
};

export const WithRemove: Story = {
  args: {
    label: "Removable Chip",
    onRemove: fn(),
  },
};

export const WithoutRemove: Story = {
  args: {
    label: "Non-removable Chip",
  },
};
