import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import BubbleAI from "./index";
import { RING_THEMES, STATE_ANIMATIONS } from "./constants";
import type { BubbleAIState } from "./types";
import Box from "../Box";
import Typography from "../Typography";
import Button from "../Button";

const meta = {
  title: "atoms/BubbleAI",
  component: BubbleAI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "interactive", "animated"],
  argTypes: {
    size: {
      control: { type: "range", min: 100, max: 600, step: 10 },
      description: "Size of the BubbleAI component in pixels",
    },
    state: {
      control: "select",
      options: ["idle", "listening", "thinking", "speaking", "navigating"],
      description: "Current animation state",
    },
    quality: {
      control: "radio",
      options: ["low", "medium", "high"],
      description: "Quality setting affecting particle count and performance",
    },
    ringCount: {
      control: { type: "number", min: 1, max: 5, step: 1 },
      description: "Number of rings (1-5)",
    },
    particleCount: {
      control: { type: "range", min: 25, max: 500, step: 25 },
      description: "Number of particles (25-500)",
    },
    particleSize: {
      control: { type: "range", min: 0.5, max: 3, step: 0.1 },
      description: "Particle size multiplier",
    },
    particleSpeed: {
      control: { type: "range", min: 0.5, max: 2, step: 0.1 },
      description: "Particle speed multiplier",
    },
    opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Overall opacity",
    },
    respectReducedMotion: {
      control: "boolean",
      description: "Respect prefers-reduced-motion",
    },
    onClick: { action: "clicked" },
    onHover: { action: "hovered" },
  },
  args: {
    onClick: fn(),
    onHover: fn(),
  },
} satisfies Meta<typeof BubbleAI>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// INTRODUCTION STORIES
// ============================================

/**
 * **Default/Playground Story**
 *
 * This is where developers first meet BubbleAI. Experiment with the controls below to discover its personality and customize it for your needs.
 *
 * **Use Case:** Interactive exploration and customization
 *
 * **Tips:** Start with default settings, then adjust size and state to see how BubbleAI responds
 */
export const Playground: Story = {
  args: {
    size: 200,
    state: "idle",
    quality: "medium",
    ringCount: 3,
    particleCount: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          "BubbleAI is your nebulous AI companion. Experiment with the controls below to discover its personality and customize it for your needs.",
      },
    },
  },
};

/**
 * **Welcome Story**
 *
 * Present BubbleAI in its default, most beautiful configuration - the "hero shot" that showcases what it does best.
 *
 * **Use Case:** First impression, hero sections, landing pages
 */
export const Welcome: Story = {
  args: {
    size: 300,
    state: "idle",
    quality: "high",
    ringCount: 4,
    particleCount: 150,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "BubbleAI in its default, most beautiful configuration. This is the version that makes people say 'I want this in my app.'",
      },
    },
  },
};

// ============================================
// ANATOMY STORIES
// ============================================

/**
 * **Ring Configuration Explorer**
 *
 * Shows how different ring configurations change the character and perceived complexity of BubbleAI.
 *
 * **Use Case:** Understanding visual impact of ring count
 */
export const RingConfigurations: Story = {
  args: {
    quality: "high"
  },

  render: () => (
    <Box className="flex flex-wrap gap-8 items-center justify-center p-8">
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} ringCount={1} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">Single Ring (Minimalist)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} ringCount={2} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">Two Rings (Balanced)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} ringCount={3} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">Three Rings (Default/Optimal)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} ringCount={4} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">Four Rings (Complex)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} ringCount={5} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">Five Rings (Maximum Chaos)</Typography>
      </Box>
    </Box>
  ),

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Compare how adding or removing rings changes the character and perceived complexity of the entity.",
      },
    },
  }
};

/**
 * **Particle Density Comparison**
 *
 * Shows how particle count affects the nebulous quality and performance.
 *
 * **Use Case:** Performance vs. visual impact tradeoff decisions
 */
export const ParticleDensity: Story = {
  render: () => (
    <Box className="flex flex-wrap gap-8 items-center justify-center p-8">
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} particleCount={25} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">25 particles (Subtle, Elegant)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} particleCount={100} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">100 particles (Balanced, Default)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} particleCount={250} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">250 particles (Dense, Energetic)</Typography>
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <BubbleAI size={150} particleCount={500} state="idle" />
        <Typography variant="p" size="text-sm" color="gray">500 particles (Maximum Nebula Effect)</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Compare how different particle counts change the nebulous quality. Higher counts create more density but impact performance.",
      },
    },
  },
};

/**
 * **Size Scaling Demonstration**
 *
 * Shows BubbleAI at multiple sizes, demonstrating it remains visually coherent at all scales.
 *
 * **Use Case:** Understanding size flexibility for different UI contexts
 */
export const SizeScaling: Story = {
  render: () => (
    <Box className="flex flex-wrap gap-8 items-center justify-center p-8">
      {[100, 150, 200, 300, 400, 600].map((size) => (
        <Box key={size} className="flex flex-col items-center gap-2">
          <BubbleAI size={size} state="idle" />
          <Typography variant="p" size="text-sm" color="gray">{size}px</Typography>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "BubbleAI scales beautifully from small widgets to hero sections, maintaining visual coherence at all sizes.",
      },
    },
  },
};

// ============================================
// PERSONALITY STORIES
// ============================================

/**
 * **All States Showcase**
 *
 * Gallery view showing all five animation states simultaneously.
 *
 * **Use Case:** Understanding BubbleAI's behavioral range
 */
export const AllStates: Story = {
  render: () => (
    <Box className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8">
      {(
        [
          "idle",
          "listening",
          "thinking",
          "speaking",
          "navigating",
        ] as BubbleAIState[]
      ).map((state) => (
        <Box
          key={state}
          className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg"
        >
          <BubbleAI size={180} state={state} />
          <Box className="text-center">
            <Typography variant="h3" weight="font-semibold" className="capitalize mb-1">{state}</Typography>
            <Typography variant="p" size="text-sm" color="gray">
              {STATE_ANIMATIONS[state].description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "All five animation states displayed side-by-side. Each state has unique characteristics that communicate different AI behaviors.",
      },
    },
  },
};

/**
 * **State Transition Sequencer**
 *
 * Interactive story where you can cycle through states to see smooth transitions.
 *
 * **Use Case:** Understanding state transitions and when to use each state
 */
export const StateTransitions: Story = {
  render: () => {
    const states: BubbleAIState[] = [
      "idle",
      "listening",
      "thinking",
      "speaking",
      "idle",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentState = states[currentIndex];

    const nextState = () => {
      setCurrentIndex((prev) => (prev + 1) % states.length);
    };

    return (
      <Box className="flex flex-col items-center gap-6 p-8">
        <BubbleAI size={250} state={currentState} onClick={nextState} />
        <Box className="text-center">
          <Typography variant="h3" weight="font-semibold" size="text-lg" className="capitalize mb-2">
            {currentState}
          </Typography>
          <Typography variant="p" size="text-sm" color="gray" className="mb-4 max-w-md">
            {currentState && STATE_ANIMATIONS[currentState].description}
          </Typography>
          <Button
            onClick={nextState}
            color="primary"
          >
            Next State
          </Button>
          <Typography variant="p" size="text-xs" color="gray" className="mt-2">
            Click BubbleAI or the button to cycle through states
          </Typography>
        </Box>
      </Box>
    );
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Click to cycle through states and observe smooth transitions. This demonstrates how BubbleAI communicates different AI behaviors through animation.",
      },
    },
  },
};

// ============================================
// INTEGRATION STORIES
// ============================================

/**
 * **Chatbot Avatar Simulation**
 *
 * Realistic chat interface mockup showing BubbleAI in a conversation flow.
 *
 * **Use Case:** Chatbot integration, conversational UI
 */
export const ChatbotAvatar: Story = {
  render: () => {
    const [state, setState] = useState<BubbleAIState>("idle");
    const [messages, setMessages] = useState<string[]>([]);

    const simulateConversation = () => {
      setState("listening");
      setTimeout(() => {
        setState("thinking");
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            "Hello! How can I help you today?",
          ]);
          setState("speaking");
          setTimeout(() => {
            setState("idle");
          }, 2000);
        }, 1500);
      }, 1000);
    };

    return (
      <Box className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <Box className="flex items-center gap-3 mb-4 pb-4 border-b">
          <BubbleAI size={50} state={state} />
          <Box>
            <Typography variant="h3" weight="font-semibold">BubbleAI Assistant</Typography>
            <Typography variant="p" size="text-xs" color="gray">Online</Typography>
          </Box>
        </Box>
        <Box className="space-y-2 mb-4 min-h-[200px]">
          {messages.map((msg, i) => (
            <Box key={i} className="bg-blue-50 p-3 rounded-lg">
              <Typography variant="p" size="text-sm">{msg}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          onClick={simulateConversation}
          color="primary"
          className="w-full"
        >
          Simulate Conversation
        </Button>
      </Box>
    );
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "BubbleAI integrated into a chat interface. Watch how it transitions through states: idle → listening → thinking → speaking → idle.",
      },
    },
  },
};

/**
 * **Loading Indicator Context**
 *
 * Shows BubbleAI as a loading spinner in various UI contexts.
 *
 * **Use Case:** Replacing traditional spinners with personality
 */
export const LoadingIndicators: Story = {
  render: () => (
    <Box className="space-y-8 p-8 max-w-2xl mx-auto">
      <Box className="bg-white p-6 rounded-lg shadow border">
        <Typography variant="h3" weight="font-semibold" className="mb-2">Card Loading State</Typography>
        <Box className="flex items-center justify-center h-32 bg-gray-50 rounded">
          <BubbleAI size={80} state="thinking" />
        </Box>
      </Box>
      <Box className="bg-white p-6 rounded-lg shadow border">
        <Typography variant="h3" weight="font-semibold" className="mb-2">Form Submission</Typography>
        <Box className="flex items-center justify-center h-24 bg-gray-50 rounded">
          <BubbleAI size={60} state="thinking" />
          <Typography variant="span" className="ml-3" color="gray">Processing...</Typography>
        </Box>
      </Box>
      <Box className="bg-white p-6 rounded-lg shadow border">
        <Typography variant="h3" weight="font-semibold" className="mb-2">Data Fetching</Typography>
        <Box className="flex items-center justify-center h-40 bg-gray-50 rounded">
          <BubbleAI size={100} state="thinking" />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "BubbleAI replaces traditional loading spinners with personality. Use the 'thinking' state for loading indicators.",
      },
    },
  },
};

/**
 * **Navigation Guide Scenario**
 *
 * Multi-step form with BubbleAI guiding users through steps.
 *
 * **Use Case:** Wizards, onboarding flows, step-by-step processes
 */
export const NavigationGuide: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    return (
      <Box className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Box className="flex items-center justify-between mb-6">
          <BubbleAI size={60} state="navigating" />
          <Box className="flex-1 ml-4">
            <Box className="flex justify-between mb-2">
              <Typography variant="span" size="text-sm" weight="font-medium">Step {step} of {totalSteps}</Typography>
              <Typography variant="span" size="text-sm" color="gray">
                {Math.round((step / totalSteps) * 100)}%
              </Typography>
            </Box>
            <Box className="w-full bg-gray-200 rounded-full h-2">
              <Box
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </Box>
          </Box>
        </Box>
        <Box className="mb-6 p-4 bg-gray-50 rounded">
          <Typography variant="h3" weight="font-semibold" className="mb-2">Step {step}: {["Welcome", "Information", "Preferences", "Complete"][step - 1]}</Typography>
          <Typography variant="p" size="text-sm" color="gray">
            {step === 1 && "Welcome! Let's get started."}
            {step === 2 && "Please provide some basic information."}
            {step === 3 && "Tell us about your preferences."}
            {step === 4 && "All done! Review your information."}
          </Typography>
        </Box>
        <Box className="flex gap-2">
          <Button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            variant="outlined"
          >
            Previous
          </Button>
          <Button
            onClick={() => setStep(Math.min(totalSteps, step + 1))}
            disabled={step === totalSteps}
            color="primary"
          >
            Next
          </Button>
        </Box>
      </Box>
    );
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "BubbleAI in 'navigating' state guides users through a multi-step process, indicating progress and direction.",
      },
    },
  },
};

/**
 * **Corner Assistant**
 *
 * Application layout with BubbleAI floating in the bottom-right corner.
 *
 * **Use Case:** Floating assistant, help widget, persistent AI companion
 */
export const CornerAssistant: Story = {
  render: () => (
    <Box className="relative w-full h-screen bg-gray-100">
      <Box className="p-4">
        <Box className="bg-white rounded-lg shadow p-6 mb-4">
          <Typography variant="h2" size="text-xl" weight="font-bold" className="mb-2">Application Content</Typography>
          <Typography variant="p" color="gray">
            This is your main application interface. BubbleAI floats in the
            corner, ready to assist.
          </Typography>
        </Box>
      </Box>
      <Box className="fixed bottom-6 right-6">
        <BubbleAI
          size={80}
          state="idle"
          onClick={() => alert("BubbleAI clicked!")}
          className="cursor-pointer"
        />
      </Box>
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "BubbleAI positioned as a floating assistant in the bottom-right corner. Scale appropriately for UI chrome and ensure it remains non-intrusive yet accessible.",
      },
    },
  },
};

// ============================================
// THEME STORIES
// ============================================

/**
 * **Color Themes Gallery**
 *
 * Pre-configured color themes, each with a name and personality.
 *
 * **Use Case:** Brand integration, mood setting, visual identity
 */
export const ColorThemes: Story = {
  render: () => {
    const themes = Object.entries(RING_THEMES);

    return (
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {themes.map(([name, rings]) => (
          <Box
            key={name}
            className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow border"
          >
            <BubbleAI 
              size={150} 
              rings={Array.isArray(rings) ? [...rings] : [...rings.light]} 
              state="idle" 
            />
            <Box className="text-center">
              <Typography variant="h3" weight="font-semibold" className="capitalize mb-1">{name}</Typography>
              <Typography variant="p" size="text-xs" color="gray">
                {name === "nebula" && "Default - Mystical AI"}
                {name === "emerald" && "Nature - Organic Feel"}
                {name === "sunset" && "Warmth - Friendly Energy"}
                {name === "ocean" && "Calm - Professional"}
                {name === "royal" && "Premium - Elegant"}
                {name === "monochrome" && "Minimal - Clean"}
                {name === "cyber" && "Futuristic - Tech"}
                {name === "earth" && "Natural - Grounded"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Eight pre-configured color themes. Each theme tells a story and sets a mood. Choose the one that matches your brand or context.",
      },
    },
  },
};

/**
 * **Light vs Dark Mode**
 *
 * Shows how BubbleAI adapts to different backgrounds.
 *
 * **Use Case:** Understanding transparency and background adaptation
 */
export const LightDarkMode: Story = {
  render: () => (
    <Box className="space-y-8 p-8">
      <Box className="bg-white p-8 rounded-lg shadow">
        <Typography variant="h3" weight="font-semibold" className="mb-4">Light Background</Typography>
        <Box className="flex items-center justify-center h-64">
          <BubbleAI size={200} state="idle" />
        </Box>
      </Box>
      <Box className="bg-gray-900 p-8 rounded-lg shadow">
        <Typography variant="h3" weight="font-semibold" className="mb-4 text-white">Dark Background</Typography>
        <Box className="flex items-center justify-center h-64">
          <BubbleAI size={200} state="idle" />
        </Box>
      </Box>
      <Box
        className="p-8 rounded-lg shadow"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Typography variant="h3" weight="font-semibold" className="mb-4 text-white">Gradient Background</Typography>
        <Box className="flex items-center justify-center h-64">
          <BubbleAI size={200} state="idle" />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "BubbleAI works beautifully on any background. Its transparency and glow effects adapt naturally to light, dark, and gradient backgrounds.",
      },
    },
  },
};

// ============================================
// PERFORMANCE STORIES
// ============================================

/**
 * **Quality Level Comparison**
 *
 * Shows BubbleAI at different quality settings side-by-side.
 *
 * **Use Case:** Performance optimization decisions
 */
export const QualityLevels: Story = {
  args: {
    state: "thinking"
  },

  render: () => (
    <Box className="flex flex-wrap gap-8 items-center justify-center p-8">
      {(["low", "medium", "high"] as const).map((quality) => (
        <Box key={quality} className="flex flex-col items-center gap-4">
          <BubbleAI size={200} quality={quality} state="thinking" />
          <Box className="text-center">
            <Typography variant="h3" weight="font-semibold" className="capitalize mb-1">{quality} Quality</Typography>
            <Typography variant="p" size="text-xs" color="gray">
              {quality === "low" && "25 particles - Mobile optimized"}
              {quality === "medium" && "100 particles - Balanced (default)"}
              {quality === "high" && "250 particles - Desktop premium"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  ),

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Compare quality levels to understand the performance vs. visual impact tradeoff. Use low for mobile, medium for most cases, high for hero sections.",
      },
    },
  }
};

/**
 * **Multiple Instances**
 *
 * Grid of multiple BubbleAI instances running simultaneously.
 *
 * **Use Case:** Testing performance scalability
 */
export const MultipleInstances: Story = {
  render: () => {
    const states: BubbleAIState[] = [
      "idle",
      "listening",
      "thinking",
      "speaking",
      "navigating",
    ];

    return (
      <Box className="grid grid-cols-3 md:grid-cols-4 gap-4 p-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Box key={i} className="flex items-center justify-center">
            <BubbleAI
              size={120}
              state={states[i % states.length]}
              quality="medium"
            />
          </Box>
        ))}
      </Box>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Twelve BubbleAI instances running simultaneously at different states. This demonstrates performance scalability and helps you understand if multiple instances are feasible on a single page.",
      },
    },
  },
};

// ============================================
// TESTING STORIES
// ============================================

/**
 * **Edge Cases**
 *
 * Testing BubbleAI at extreme configurations.
 *
 * **Use Case:** Understanding component limits and edge case handling
 */
export const EdgeCases: Story = {
  render: () => (
    <Box className="space-y-8 p-8">
      <Box className="flex flex-wrap gap-8 items-center justify-center">
        <Box className="flex flex-col items-center gap-2">
          <BubbleAI size={50} state="idle" />
          <Typography variant="p" size="text-xs" color="gray">Minimum Size (50px)</Typography>
        </Box>
        <Box className="flex flex-col items-center gap-2">
          <BubbleAI size={800} state="idle" />
          <Typography variant="p" size="text-xs" color="gray">Maximum Size (800px)</Typography>
        </Box>
        <Box className="flex flex-col items-center gap-2">
          <BubbleAI size={150} particleCount={0} state="idle" />
          <Typography variant="p" size="text-xs" color="gray">No Particles (0 count)</Typography>
        </Box>
        <Box className="flex flex-col items-center gap-2">
          <BubbleAI size={150} particleCount={1000} quality="high" state="idle" />
          <Typography variant="p" size="text-xs" color="gray">Maximum Particles (1000+)</Typography>
        </Box>
        <Box className="flex flex-col items-center gap-2">
          <BubbleAI size={150} ringCount={1} state="idle" />
          <Typography variant="p" size="text-xs" color="gray">Single Ring</Typography>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Edge case testing: minimum/maximum sizes, no particles, maximum particles, and single ring configuration. These help understand component limits.",
      },
    },
  },
};

/**
 * **Accessibility Testing**
 *
 * Demonstrates accessibility features including reduced motion support.
 *
 * **Use Case:** Ensuring accessibility compliance
 */
export const Accessibility: Story = {
  render: () => (
    <Box className="space-y-8 p-8 max-w-2xl mx-auto">
      <Box className="bg-white p-6 rounded-lg shadow border">
        <Typography variant="h3" weight="font-semibold" className="mb-4">Reduced Motion</Typography>
        <Typography variant="p" size="text-sm" color="gray" className="mb-4">
          BubbleAI respects prefers-reduced-motion. Enable it in your system
          settings to see the difference.
        </Typography>
        <Box className="flex items-center justify-center h-48 bg-gray-50 rounded">
          <BubbleAI size={150} state="thinking" respectReducedMotion />
        </Box>
      </Box>
      <Box className="bg-white p-6 rounded-lg shadow border">
        <Typography variant="h3" weight="font-semibold" className="mb-4">Keyboard Navigation</Typography>
        <Typography variant="p" size="text-sm" color="gray" className="mb-4">
          BubbleAI with onClick handler is keyboard accessible. Tab to focus and
          press Enter or Space to activate.
        </Typography>
        <Box className="flex items-center justify-center h-48 bg-gray-50 rounded">
          <BubbleAI
            size={150}
            state="idle"
            onClick={() => alert("BubbleAI activated!")}
            aria-label="BubbleAI interactive element"
          />
        </Box>
      </Box>
      <Box className="bg-white p-6 rounded-lg shadow border">
        <Typography variant="h3" weight="font-semibold" className="mb-4">ARIA Labels</Typography>
        <Typography variant="p" size="text-sm" color="gray" className="mb-4">
          Always provide meaningful aria-label for screen readers.
        </Typography>
        <Box className="flex items-center justify-center h-48 bg-gray-50 rounded">
          <BubbleAI
            size={150}
            state="thinking"
            aria-label="AI assistant is processing your request"
          />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Accessibility features: reduced motion support, keyboard navigation, and ARIA labeling. BubbleAI is designed to be accessible to all users.",
      },
    },
  },
};

