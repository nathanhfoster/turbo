"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useDeviceSelector } from "@nathanhfoster/pwa/device";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  IconMenu,
  IconDocument,
  WysiwygEditor,
} from "@nathanhfoster/ui";
import type { ResumeLayoutProps } from "./types";
import type { LeftPaneProps } from "../LeftPane/types";
import type { RightPaneProps } from "../RightPane/types";

// Dynamic imports for code splitting
const LeftPane = dynamic<LeftPaneProps>(
  () => import("../LeftPane").then((mod) => ({ default: mod.LeftPane })),
  { ssr: false },
);

const RightPane = dynamic<RightPaneProps>(
  () => import("../RightPane").then((mod) => ({ default: mod.RightPane })),
  { ssr: false },
);

/**
 * ResumeLayout - Presentation component for resume builder
 * Handles device-specific rendering (desktop vs mobile/tablet)
 * Following FSD pattern - UI layer
 */
export function ResumeLayout({
  currentResume,
  isLoading,
  error,
  aiError,
  content,
  onContentChange,
  leftPaneProps,
  rightPaneProps,
}: ResumeLayoutProps) {
  // Device state
  const isMobile = useDeviceSelector((state) => state.isMobile);
  const isTablet = useDeviceSelector((state) => state.isTablet);
  const isDesktop = useDeviceSelector((state) => state.isDesktop);
  const hasScrolled = useDeviceSelector((state) => state.hasScrolled);
  const shouldUseDrawers = isMobile || isTablet;

  // Drawer state for mobile/tablet
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  return (
    <Box
      variant="main"
      className={`flex flex-1 flex-col py-4 ${shouldUseDrawers ? "px-2" : "px-4"} md:py-8 md:px-0 w-full max-w-full overflow-x-hidden`}
    >
      <Box className="w-full max-w-full">
        {/* Error Messages */}
        <Box className="px-4 md:px-4 xl:px-6">
          {error && (
            <Box className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
              <Typography variant="p" className="text-error">
                {error}
              </Typography>
            </Box>
          )}

          {aiError && (
            <Box className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
              <Typography variant="p" className="text-error">
                AI Error: {aiError}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Header Bar with Title and Drawer Triggers */}
        {currentResume && (
          <Box
            className={`${shouldUseDrawers ? "fixed top-20 left-0 right-0 z-50" : "mb-4"} transition-all duration-300 px-2 ${isDesktop ? "px-4 xl:px-6" : ""}`}
          >
            <Box className="flex items-center justify-between gap-2 w-full max-w-full">
              {/* Left: Actions Button (Mobile/Tablet only) */}
              {shouldUseDrawers && (
                <IconButton
                  onClick={() => setIsLeftDrawerOpen(true)}
                  icon={<IconMenu className="size-6" />}
                  aria-label="Actions"
                  variant="primary"
                  size="sm"
                  className={`flex-shrink-0 transition-all duration-300 ${hasScrolled ? "bg-background-elevated/90 backdrop-blur-sm" : ""} ${isMobile ? "-ml-2" : isTablet ? "-ml-4" : ""}`}
                />
              )}
              {/* Center: Title */}
              <Box className="flex-1 min-w-0 flex justify-center px-2">
                <Typography
                  variant="h2"
                  size={shouldUseDrawers ? "text-lg" : "text-2xl"}
                  weight="font-bold"
                  className={`text-center truncate transition-all duration-300 ${hasScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  {currentResume.name}
                </Typography>
              </Box>
              {/* Right: Resumes Button (Mobile/Tablet only) */}
              {shouldUseDrawers && (
                <IconButton
                  onClick={() => setIsRightDrawerOpen(true)}
                  icon={<IconDocument className="size-6" />}
                  aria-label="Resumes"
                  variant="primary"
                  size="sm"
                  className={`flex-shrink-0 transition-all duration-300 ${hasScrolled ? "bg-background-elevated/90 backdrop-blur-sm" : ""} ${isMobile ? "-mr-2" : isTablet ? "-mr-4" : ""}`}
                />
              )}
              {/* Spacer for desktop to maintain layout */}
              {isDesktop && <Box className="w-20 flex-shrink-0" />}
            </Box>
          </Box>
        )}

        {/* Main Content: Three panes - left (actions), middle (editor), right (selection) */}
        <Box
          className={`flex ${isDesktop ? "flex-row" : "flex-col"} gap-6 ${isDesktop ? "gap-8" : "gap-4"} ${isDesktop ? "px-4 xl:px-6" : shouldUseDrawers ? "px-2" : "px-4"} ${shouldUseDrawers && currentResume ? "pt-20" : ""} w-full max-w-full min-w-0 ${isDesktop ? "h-full" : ""}`}
        >
          {/* Left Panel: Action Buttons */}
          {currentResume && (
            <>
              {/* Desktop: Direct rendering */}
              {isDesktop && (
                <Box className="flex w-64 flex-shrink-0 flex-col gap-4 min-w-0 animate-[fadeIn_0.4s_ease-out_0.1s_both]">
                  <LeftPane currentResume={currentResume} {...leftPaneProps} />
                </Box>
              )}
              {/* Mobile/Tablet: Drawer */}
              {shouldUseDrawers && (
                <Drawer
                  isOpen={isLeftDrawerOpen}
                  onClose={() => setIsLeftDrawerOpen(false)}
                  position="left"
                  width="w-64"
                >
                  <LeftPane currentResume={currentResume} {...leftPaneProps} />
                </Drawer>
              )}
            </>
          )}

          {/* Middle Panel: Resume Editor */}
          <Box
            className={`flex-1 min-w-0 ${isDesktop ? "w-0" : isTablet ? "max-w-4xl mx-auto w-full" : "w-full"} ${!currentResume ? (isDesktop ? "order-1" : "order-2") : (isDesktop ? "order-2" : "order-1")} ${currentResume ? "animate-[fadeIn_0.4s_ease-out_0.2s_both]" : ""}`}
          >
            {isLoading ? (
              <Box className="text-center py-12 md:py-24">
                <Typography variant="p" className="text-gray-500 dark:text-gray-400">
                  Loading resume...
                </Typography>
              </Box>
            ) : currentResume ? (
              <Box className="space-y-4 w-full max-w-full min-w-0 overflow-hidden">
                {/* Wysiwyg Editor Component */}
                <WysiwygEditor
                  key={currentResume.id}
                  value={content || ""}
                  defaultValue={currentResume.content || ""}
                  onChange={(html) => {
                    onContentChange(html);
                  }}
                  placeholder="Start editing your resume..."
                  editable={true}
                  showBubbleMenu={true}
                  className="w-full"
                />
              </Box>
            ) : (
              <Box className="text-center py-12 md:py-24">
                <Typography variant="p" className="text-gray-500 dark:text-gray-400">
                  Select or create a resume to get started
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Panel: Resume Selection and Loading */}
          <>
            {/* Desktop: Direct rendering */}
            {isDesktop && (
              <Box
                className={`flex w-80 xl:w-96 flex-shrink-0 min-w-0 order-3 animate-[fadeIn_0.4s_ease-out_0.3s_both]`}
              >
                <RightPane {...rightPaneProps} />
              </Box>
            )}
            {/* Mobile/Tablet: Drawer */}
            {shouldUseDrawers && (
              <Drawer
                isOpen={isRightDrawerOpen}
                onClose={() => setIsRightDrawerOpen(false)}
                position="right"
                width="w-80"
              >
                <RightPane {...rightPaneProps} />
              </Drawer>
            )}
          </>
        </Box>

        {/* Loading Indicator */}
        {isLoading && (
          <Box className="text-center py-8">
            <Typography variant="p" className="text-gray-500 dark:text-gray-400">
              Loading...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
