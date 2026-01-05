/**
 * Offline HTML template utilities
 * Provides templates for generating offline fallback pages
 */

export interface OfflineHTMLConfig {
  appName: string;
  primaryColor?: string;
  primaryColor600?: string;
  primaryColor700?: string;
  backgroundDefault?: string;
  backgroundElevated?: string;
  foregroundDefault?: string;
  foregroundMuted?: string;
}

/**
 * Generate offline HTML page
 */
export function generateOfflineHTML(config: OfflineHTMLConfig): string {
  const {
    appName,
    primaryColor = "#0077c5",
    primaryColor600 = "#0891b2",
    primaryColor700 = "#0e7490",
    backgroundDefault = "#020617",
    backgroundElevated = "#0f172a",
    foregroundDefault = "#f8fafc",
    foregroundMuted = "#cbd5e1",
  } = config;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Offline - ${appName}</title>
    <style>
      :root {
        /* Primary Colors */
        --color-primary: ${primaryColor};
        --color-primary-600: ${primaryColor600};
        --color-primary-700: ${primaryColor700};

        /* Background Colors */
        --color-background-DEFAULT: ${backgroundDefault};
        --color-background-elevated: ${backgroundElevated};
        --color-background-subtle: #1e293b;
        --color-background-muted: #334155;

        /* Foreground/Text Colors */
        --color-foreground-DEFAULT: ${foregroundDefault};
        --color-foreground-muted: ${foregroundMuted};
        --color-foreground-subtle: #94a3b8;

        /* Neutral Colors */
        --color-neutral-50: #f8fafc;
        --color-neutral-200: #e2e8f0;
        --color-neutral-300: #cbd5e1;
        --color-neutral-700: #334155;
        --color-neutral-800: #1e293b;
        --color-neutral-900: #0f172a;
        --color-neutral-950: #020617;

        /* Font Sizes */
        --font-size-base: 1rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;

        /* Line Heights */
        --font-size-base--line-height: 1.5rem;
        --font-size-xl--line-height: 1.75rem;
        --font-size-2xl--line-height: 2rem;

        /* Spacing Scale */
        --spacing-md: 1rem;
        --spacing-lg: 1.5rem;
        --spacing-xl: 2rem;

        /* Border Radius */
        --radius-xl: 0.75rem;
        --radius-2xl: 1rem;

        /* Shadows */
        --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        --shadow-primary: 0 20px 25px -5px rgb(0 119 197 / 0.2), 0 8px 10px -6px rgb(0 119 197 / 0.2);

        /* Transitions */
        --duration-fast: 150ms;
        --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          'Helvetica Neue',
          sans-serif;
        background: linear-gradient(135deg, var(--color-background-DEFAULT) 0%, var(--color-background-subtle) 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-md);
      }

      .offline-container {
        background: var(--color-background-elevated);
        padding: var(--spacing-xl);
        border-radius: var(--radius-2xl);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--color-background-muted);
        text-align: center;
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
      }

      .icon {
        font-size: var(--text-4xl);
        margin-bottom: var(--spacing-4);
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.05);
        }
      }

      h1 {
        color: var(--color-foreground-DEFAULT);
        font-size: var(--font-size-2xl);
        margin-bottom: var(--spacing-md);
        font-weight: 700;
        line-height: var(--font-size-2xl--line-height);
      }

      p {
        color: var(--color-foreground-muted);
        font-size: var(--font-size-base);
        line-height: var(--font-size-base--line-height);
        margin-bottom: var(--spacing-lg);
      }

      .btn {
        display: inline-block;
        padding: 0.875rem 2rem;
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--color-background-DEFAULT);
        background-color: var(--color-primary);
        border: none;
        border-radius: var(--radius-xl);
        text-decoration: none;
        transition: all var(--duration-fast) var(--ease-in-out);
        cursor: pointer;
        box-shadow: var(--shadow-primary);
      }

      .btn:hover {
        background-color: var(--color-primary-600);
        transform: translateY(-1px);
        box-shadow: var(--shadow-primary);
      }

      .btn:active {
        transform: translateY(0);
        background-color: var(--color-primary-700);
      }

      /* Light mode override */
      @media (prefers-color-scheme: light) {
        :root {
          --color-background-DEFAULT: var(--color-neutral-50);
          --color-background-elevated: #ffffff;
          --color-background-subtle: var(--color-neutral-100);
          --color-foreground-DEFAULT: var(--color-neutral-900);
          --color-foreground-muted: var(--color-neutral-700);
        }

        body {
          background: linear-gradient(135deg, var(--color-background-DEFAULT) 0%, var(--color-background-subtle) 100%);
        }

        .offline-container {
          border-color: var(--color-neutral-200);
        }

        .btn {
          color: #ffffff;
        }
      }

      /* Mobile adjustments */
      @media (max-width: 640px) {
        .offline-container {
          padding: var(--spacing-lg);
        }

        h1 {
          font-size: var(--font-size-xl);
          line-height: var(--font-size-xl--line-height);
        }

        .icon {
          font-size: var(--font-size-3xl);
        }
      }
    </style>
  </head>
  <body>
    <div class="offline-container">
      <div class="icon">📡</div>
      <h1>You're Offline</h1>
      <p>It looks like you've lost your internet connection. Please check your network and try again.</p>
      <a href="/" class="btn" onclick="window.location.reload(); return false;">Try Again</a>
    </div>
  </body>
</html>
`;
}



