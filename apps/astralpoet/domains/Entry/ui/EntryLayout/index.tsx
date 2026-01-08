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
  IconCalendar,
  WysiwygEditor,
  Input,
  FormControl,
  Chip,
} from "@nathanhfoster/ui";
import { useEntry, useEntryEditor } from "../../hooks";
import { getValidDate } from "@nathanhfoster/utils";
import type { EntryLayoutProps } from "./types";
import { EntryCalendar } from "../Calendar";
import { EntryList } from "../EntryList";

/**
 * EntryLayout - Presentation component for entry journal
 * Handles device-specific rendering (desktop vs mobile/tablet)
 * Following FSD pattern - UI layer
 */
export function EntryLayout({
  currentEntry,
  isLoading,
  error,
  content,
  onContentChange,
  calendarProps,
  entryListProps,
}: EntryLayoutProps) {
  // Device state
  const isMobile = useDeviceSelector((state) => state.isMobile);
  const isTablet = useDeviceSelector((state) => state.isTablet);
  const isDesktop = useDeviceSelector((state) => state.isDesktop);
  const hasScrolled = useDeviceSelector((state) => state.hasScrolled);
  const shouldUseDrawers = isMobile || isTablet;

  // Drawer state for mobile/tablet
  const [isCalendarDrawerOpen, setIsCalendarDrawerOpen] = useState(false);
  const [isEntryListDrawerOpen, setIsEntryListDrawerOpen] = useState(false);

  // Entry hooks for title and date editing
  const { setEntryValue, updateEntry } = useEntry();
  const { title: editorTitle, handleTitleChange } = useEntryEditor(currentEntry);

  const handleDateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentEntry) return;
    const newDate = event.target.value;
    setEntryValue(currentEntry.id, "date_created", newDate);
    // Also persist to IndexedDB
    await updateEntry({
      ...currentEntry,
      date_created: newDate,
    });
  };

  return (
    <Box
      variant="main"
      className={`flex flex-1 flex-col ${shouldUseDrawers ? "h-screen" : "h-full"} py-4 ${shouldUseDrawers ? "px-2" : "px-4"} md:py-8 md:px-0 w-full max-w-full overflow-x-hidden ${shouldUseDrawers ? "overflow-y-auto" : ""}`}
    >
      <Box className={`flex flex-1 flex-col w-full max-w-full ${shouldUseDrawers ? "min-h-0" : ""}`}>
        {/* Error Messages */}
        <Box className="px-4 md:px-4 xl:px-6">
          {error && (
            <Box className="mb-4 p-4 bg-error/10 border border-error rounded-lg">
              <Typography variant="p" className="text-error">
                {error}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Header Bar with Title and Drawer Triggers */}
        {currentEntry && (
          <Box
            className={`${shouldUseDrawers ? "fixed top-16 left-0 right-0 z-50 py-1 pointer-events-none" : "mb-4"} transition-all duration-300 px-2 ${isDesktop ? "px-4 xl:px-6" : ""}`}
          >
            <Box className="flex items-center justify-between gap-2 w-full max-w-full">
              {/* Left: Calendar Button (Mobile/Tablet only) */}
              {shouldUseDrawers && (
                <IconButton
                  onClick={() => setIsCalendarDrawerOpen(true)}
                  icon={<IconCalendar />}
                  aria-label="Calendar"
                  variant="primary"
                  size="sm"
                  className={`flex-shrink-0 transition-all duration-300 pointer-events-auto ${hasScrolled ? "bg-background-elevated/90 backdrop-blur-sm" : ""} ${isMobile ? "-ml-2" : isTablet ? "-ml-4" : ""}`}
                />
              )}
              {/* Right: Entry List Button (Mobile/Tablet only) */}
              {shouldUseDrawers && (
                <IconButton
                  onClick={() => setIsEntryListDrawerOpen(true)}
                  icon={<IconMenu className="size-6" />}
                  aria-label="Entries"
                  variant="primary"
                  size="sm"
                  className={`flex-shrink-0 transition-all duration-300 pointer-events-auto ${hasScrolled ? "bg-background-elevated/90 backdrop-blur-sm" : ""} ${isMobile ? "-mr-2" : isTablet ? "-mr-4" : ""}`}
                />
              )}
              {/* Spacer for desktop to maintain layout */}
              {isDesktop && <Box className="w-20 flex-shrink-0" />}
            </Box>
          </Box>
        )}

        {/* Main Content: Three panes - left (calendar), middle (editor), right (entry list) */}
        <Box
          className={`flex flex-1 ${isDesktop ? "flex-row" : "flex-col"} gap-6 ${isDesktop ? "gap-8" : "gap-4"} ${isDesktop ? "px-4 xl:px-6" : shouldUseDrawers ? "px-2" : "px-4"} ${shouldUseDrawers && currentEntry ? "pt-14" : ""} w-full max-w-full min-w-0 ${isDesktop ? "h-full" : shouldUseDrawers ? "min-h-0" : ""}`}
        >
          {/* Left Panel: Calendar and Additional Details */}
          <>
            {/* Desktop: Direct rendering */}
            {isDesktop && (
              <Box className="flex w-80 flex-shrink-0 flex-col gap-4 min-w-0 max-w-full overflow-hidden animate-[fadeIn_0.4s_ease-out_0.1s_both]">
                <EntryCalendar {...calendarProps} />
                {/* Additional Details - only show when entry is selected */}
                {currentEntry && (
                  <Box className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
                      Additional Details
                    </Typography>
                    
                    <FormControl>
                      <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                        Tags (comma-separated)
                      </Typography>
                      {/* Display tags as chips */}
                      {currentEntry.tags && currentEntry.tags.split(",").filter((t) => t.trim().length > 0).length > 0 && (
                        <Box className="flex flex-wrap gap-2 mb-2">
                          {currentEntry.tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter((t) => t.length > 0)
                            .map((tag, index) => (
                              <Chip
                                key={`tag-input-${index}`}
                                label={tag}
                                variant="primary"
                                size="sm"
                                onRemove={async () => {
                                  const tags = currentEntry.tags
                                    .split(",")
                                    .map((t) => t.trim())
                                    .filter((t) => t.length > 0 && t !== tag);
                                  await updateEntry({
                                    ...currentEntry,
                                    tags: tags.join(","),
                                  });
                                }}
                              />
                            ))}
                        </Box>
                      )}
                      <Input
                        name="tags"
                        placeholder="travel, adventure, family"
                        value={currentEntry.tags || ""}
                        onChange={async (e) => {
                          await updateEntry({
                            ...currentEntry,
                            tags: e.target.value,
                          });
                        }}
                        className="w-full"
                      />
                    </FormControl>

                    <FormControl>
                      <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                        People (comma-separated)
                      </Typography>
                      {/* Display people as chips */}
                      {currentEntry.people && currentEntry.people.split(",").filter((p) => p.trim().length > 0).length > 0 && (
                        <Box className="flex flex-wrap gap-2 mb-2">
                          {currentEntry.people
                            .split(",")
                            .map((p) => p.trim())
                            .filter((p) => p.length > 0)
                            .map((person, index) => (
                              <Chip
                                key={`people-input-${index}`}
                                label={person}
                                variant="secondary"
                                size="sm"
                                onRemove={async () => {
                                  const people = currentEntry.people
                                    .split(",")
                                    .map((p) => p.trim())
                                    .filter((p) => p.length > 0 && p !== person);
                                  await updateEntry({
                                    ...currentEntry,
                                    people: people.join(","),
                                  });
                                }}
                              />
                            ))}
                        </Box>
                      )}
                      <Input
                        name="people"
                        placeholder="John Doe, Jane Smith"
                        value={currentEntry.people || ""}
                        onChange={async (e) => {
                          await updateEntry({
                            ...currentEntry,
                            people: e.target.value,
                          });
                        }}
                        className="w-full"
                      />
                    </FormControl>

                    <FormControl>
                      <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                        Location Address
                      </Typography>
                      <Input
                        name="address"
                        placeholder="123 Main St, City, State"
                        value={currentEntry.address || ""}
                        onChange={async (e) => {
                          await updateEntry({
                            ...currentEntry,
                            address: e.target.value,
                          });
                        }}
                        className="w-full"
                      />
                    </FormControl>

                    <Box className="grid grid-cols-2 gap-4">
                      <FormControl>
                        <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                          Latitude
                        </Typography>
                        <Input
                          name="latitude"
                          type="number"
                          step="any"
                          placeholder="37.7749"
                          value={currentEntry.latitude || ""}
                          onChange={async (e) => {
                            await updateEntry({
                              ...currentEntry,
                              latitude: e.target.value,
                            });
                          }}
                          className="w-full"
                        />
                      </FormControl>

                      <FormControl>
                        <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                          Longitude
                        </Typography>
                        <Input
                          name="longitude"
                          type="number"
                          step="any"
                          placeholder="-122.4194"
                          value={currentEntry.longitude || ""}
                          onChange={async (e) => {
                            await updateEntry({
                              ...currentEntry,
                              longitude: e.target.value,
                            });
                          }}
                          className="w-full"
                        />
                      </FormControl>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            {/* Mobile/Tablet: Drawer */}
            {shouldUseDrawers && (
              <Drawer
                isOpen={isCalendarDrawerOpen}
                onClose={() => setIsCalendarDrawerOpen(false)}
                position="left"
                width="w-80"
              >
                <Box className="flex flex-col gap-4">
                  <EntryCalendar {...calendarProps} />
                  {/* Additional Details - only show when entry is selected */}
                  {currentEntry && (
                    <Box className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
                        Additional Details
                      </Typography>
                      
                      <FormControl>
                        <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                          Tags (comma-separated)
                        </Typography>
                        {/* Display tags as chips */}
                        {currentEntry.tags && currentEntry.tags.split(",").filter((t) => t.trim().length > 0).length > 0 && (
                          <Box className="flex flex-wrap gap-2 mb-2">
                            {currentEntry.tags
                              .split(",")
                              .map((t) => t.trim())
                              .filter((t) => t.length > 0)
                              .map((tag, index) => (
                                <Chip
                                  key={`tag-input-drawer-${index}`}
                                  label={tag}
                                  variant="primary"
                                  size="sm"
                                  onRemove={async () => {
                                    const tags = currentEntry.tags
                                      .split(",")
                                      .map((t) => t.trim())
                                      .filter((t) => t.length > 0 && t !== tag);
                                    await updateEntry({
                                      ...currentEntry,
                                      tags: tags.join(","),
                                    });
                                  }}
                                />
                              ))}
                          </Box>
                        )}
                        <Input
                          name="tags"
                          placeholder="travel, adventure, family"
                          value={currentEntry.tags || ""}
                          onChange={async (e) => {
                            await updateEntry({
                              ...currentEntry,
                              tags: e.target.value,
                            });
                          }}
                          className="w-full"
                        />
                      </FormControl>

                      <FormControl>
                        <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                          People (comma-separated)
                        </Typography>
                        {/* Display people as chips */}
                        {currentEntry.people && currentEntry.people.split(",").filter((p) => p.trim().length > 0).length > 0 && (
                          <Box className="flex flex-wrap gap-2 mb-2">
                            {currentEntry.people
                              .split(",")
                              .map((p) => p.trim())
                              .filter((p) => p.length > 0)
                              .map((person, index) => (
                                <Chip
                                  key={`people-input-drawer-${index}`}
                                  label={person}
                                  variant="secondary"
                                  size="sm"
                                  onRemove={async () => {
                                    const people = currentEntry.people
                                      .split(",")
                                      .map((p) => p.trim())
                                      .filter((p) => p.length > 0 && p !== person);
                                    await updateEntry({
                                      ...currentEntry,
                                      people: people.join(","),
                                    });
                                  }}
                                />
                              ))}
                          </Box>
                        )}
                        <Input
                          name="people"
                          placeholder="John Doe, Jane Smith"
                          value={currentEntry.people || ""}
                          onChange={async (e) => {
                            await updateEntry({
                              ...currentEntry,
                              people: e.target.value,
                            });
                          }}
                          className="w-full"
                        />
                      </FormControl>

                      <FormControl>
                        <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                          Location Address
                        </Typography>
                        <Input
                          name="address"
                          placeholder="123 Main St, City, State"
                          value={currentEntry.address || ""}
                          onChange={async (e) => {
                            await updateEntry({
                              ...currentEntry,
                              address: e.target.value,
                            });
                          }}
                          className="w-full"
                        />
                      </FormControl>

                      <Box className="grid grid-cols-2 gap-4">
                        <FormControl>
                          <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                            Latitude
                          </Typography>
                          <Input
                            name="latitude"
                            type="number"
                            step="any"
                            placeholder="37.7749"
                            value={currentEntry.latitude || ""}
                            onChange={async (e) => {
                              await updateEntry({
                                ...currentEntry,
                                latitude: e.target.value,
                              });
                            }}
                            className="w-full"
                          />
                        </FormControl>

                        <FormControl>
                          <Typography variant="label" className="mb-2 text-gray-700 dark:text-gray-300">
                            Longitude
                          </Typography>
                          <Input
                            name="longitude"
                            type="number"
                            step="any"
                            placeholder="-122.4194"
                            value={currentEntry.longitude || ""}
                            onChange={async (e) => {
                              await updateEntry({
                                ...currentEntry,
                                longitude: e.target.value,
                              });
                            }}
                            className="w-full"
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Drawer>
            )}
          </>

          {/* Middle Panel: Entry Editor */}
          <Box
            className={`flex flex-1 flex-col min-w-0 ${isDesktop ? "w-0" : isTablet ? "max-w-4xl mx-auto w-full" : "w-full"} ${!currentEntry ? (isDesktop ? "order-1" : "order-2") : (isDesktop ? "order-2" : "order-1")} ${currentEntry ? "animate-[fadeIn_0.4s_ease-out_0.2s_both]" : ""}`}
          >
            {isLoading ? (
              <Box className="text-center py-12 md:py-24">
                <Typography variant="p" className="text-gray-500 dark:text-gray-400">
                  Loading entry...
                </Typography>
              </Box>
            ) : currentEntry ? (
              <Box className="flex flex-1 flex-col space-y-4 w-full max-w-full min-w-0 min-h-0 overflow-hidden">
                {/* Title and Date Fields */}
                <Box className="flex flex-col gap-4 flex-shrink-0">
                  <FormControl>
                    <Input
                      name="title"
                      placeholder="My first diary entry"
                      value={editorTitle || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full"
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="date"
                      name="date_created"
                      value={getValidDate(currentEntry.date_created)}
                      onChange={handleDateChange}
                      className="w-full"
                    />
                  </FormControl>
                </Box>

                {/* Wysiwyg Editor Component */}
                <Box className="flex-1 min-h-0 overflow-hidden">
                  <WysiwygEditor
                    key={currentEntry.id}
                    value={content || ""}
                    defaultValue={currentEntry.html || ""}
                    onChange={(html) => {
                      onContentChange(html);
                    }}
                    placeholder="Start writing your entry..."
                    editable={true}
                    showBubbleMenu={true}
                    className="w-full h-full"
                  />
                </Box>
              </Box>
            ) : (
              <Box className="text-center py-12 md:py-24">
                <Typography variant="p" className="text-gray-500 dark:text-gray-400">
                  Select or create an entry to get started
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Panel: Entry List */}
          <>
            {/* Desktop: Direct rendering */}
            {isDesktop && (
              <Box
                className={`flex w-80 xl:w-96 flex-shrink-0 min-w-0 order-3 animate-[fadeIn_0.4s_ease-out_0.3s_both]`}
              >
                <EntryList {...entryListProps} />
              </Box>
            )}
            {/* Mobile/Tablet: Drawer */}
            {shouldUseDrawers && (
              <Drawer
                isOpen={isEntryListDrawerOpen}
                onClose={() => setIsEntryListDrawerOpen(false)}
                position="right"
                width="w-80"
              >
                <EntryList {...entryListProps} />
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

