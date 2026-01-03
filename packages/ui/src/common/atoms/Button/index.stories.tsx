import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import Button from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "atoms/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
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
      ],
    },
    variant: { control: "select", options: ["contained", "outlined", "text"] },
    size: {
      control: "select",
      options: [
        "text-sm",
        "text-md",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-xs",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
      ],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    color: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "text-lg",
    children: "Button",
    href: "/",
  },
};

export const Small: Story = {
  args: {
    size: "text-sm",
    children: "Button",
    href: "/",
  },
};
