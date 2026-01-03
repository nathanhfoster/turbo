import type { ComponentColor } from './../../atoms/types';
import type { StepperItemStatus } from './types';

export const STEP_COLORS: Record<ComponentColor, StepperItemStatus> = {
  primary: {
    active: {
      text: 'text-primary',
      border: 'border-primary',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-primary',
    },
  },
  secondary: {
    active: {
      text: 'text-secondary',
      border: 'border-secondary',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-secondary',
    },
  },
  accent: {
    active: {
      text: 'text-accent',
      border: 'border-accent',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-accent',
    },
  },
  error: {
    active: {
      text: 'text-error',
      border: 'border-error',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-error',
    },
  },
  success: {
    active: {
      text: 'text-success',
      border: 'border-success',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-success',
    },
  },
  warning: {
    active: {
      text: 'text-warning',
      border: 'border-warning',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-warning',
    },
  },
  info: {
    active: {
      text: 'text-info',
      border: 'border-info',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-info',
    },
  },
  white: {
    active: {
      text: 'text-white',
      border: 'border-white',
      background: 'bg-transparent',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-white',
    },
  },
  inherit: {
    active: {
      text: 'text-inherit',
      border: 'border-inherit',
      background: 'bg-transparent',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-inherit',
      background: 'bg-inherit',
    },
  },
  black: {
    active: {
      text: 'text-black',
      border: 'border-black',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-black',
    },
  },
  gray: {
    active: {
      text: 'text-gray-500',
      border: 'border-gray-500',
      background: 'bg-white',
    },
    inactive: {
      text: 'text-gray-500',
      border: 'border-gray-300',
      background: 'bg-white',
    },
    completed: {
      text: 'text-white',
      background: 'bg-gray-500',
    },
  },
};
