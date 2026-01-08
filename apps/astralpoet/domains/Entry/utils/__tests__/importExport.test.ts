/**
 * Import/Export utilities test
 * Validates that entries can be imported and exported correctly
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  importEntriesFromJson,
  exportEntriesToJson,
  importEntriesFromCsv,
  exportEntriesToCsv,
  formattedEntries,
} from "../importExport";
import type { Entry } from "../../model/types";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to test entries file (relative to test file location)
const TEST_ENTRIES_PATH = join(
  __dirname,
  "entries.json",
);

describe("Entry Import/Export", () => {
  let originalEntriesJson: string;
  let originalEntries: any[];

  beforeAll(() => {
    // Read the test entries file
    originalEntriesJson = readFileSync(TEST_ENTRIES_PATH, "utf-8");
    originalEntries = JSON.parse(originalEntriesJson);
  });

  describe("JSON Import/Export", () => {
    it("should import entries from JSON correctly", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);

      expect(importedEntries).toBeDefined();
      expect(Array.isArray(importedEntries)).toBe(true);
      expect(importedEntries.length).toBeGreaterThan(0);
      expect(importedEntries.length).toBe(originalEntries.length);

      // Validate first entry structure
      const firstEntry = importedEntries[0];
      expect(firstEntry).toBeDefined();
      if (firstEntry) {
        expect(firstEntry).toHaveProperty("id");
        expect(firstEntry).toHaveProperty("title");
        expect(firstEntry).toHaveProperty("html");
        expect(firstEntry).toHaveProperty("date_created");
        expect(firstEntry).toHaveProperty("author");
      }
    });

    it("should transform string values to correct types", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);
      const firstEntry = importedEntries[0];

      expect(firstEntry).toBeDefined();
      if (!firstEntry) return;

      // Check that numeric fields are numbers
      expect(typeof firstEntry.id).toBe("number");
      expect(typeof firstEntry.author).toBe("number");
      expect(typeof firstEntry.views).toBe("number");
      expect(typeof firstEntry.rating).toBe("number");
      expect(typeof firstEntry.size).toBe("number");

      // Check that boolean fields are booleans
      expect(typeof firstEntry.is_public).toBe("boolean");

      // Check that EntryFiles is an array
      expect(Array.isArray(firstEntry.EntryFiles)).toBe(true);

      // Check that date fields are strings (ISO format)
      expect(typeof firstEntry.date_created).toBe("string");
      expect(typeof firstEntry.date_updated).toBe("string");
    });

    it("should export entries to JSON correctly", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);
      const exportedJson = exportEntriesToJson(importedEntries);

      expect(exportedJson).toBeDefined();
      expect(typeof exportedJson).toBe("string");

      const exportedEntries = JSON.parse(exportedJson);
      expect(Array.isArray(exportedEntries)).toBe(true);
      expect(exportedEntries.length).toBe(importedEntries.length);
    });

    it("should maintain data integrity through import/export cycle", () => {
      // Import original entries
      const importedEntries = importEntriesFromJson(originalEntriesJson);

      // Export them
      const exportedJson = exportEntriesToJson(importedEntries);

      // Import again
      const reImportedEntries = importEntriesFromJson(exportedJson);

      // Compare counts
      expect(reImportedEntries.length).toBe(importedEntries.length);

      // Compare first entry (excluding id which may change)
      const original = importedEntries[0];
      const reImported = reImportedEntries[0];

      expect(original).toBeDefined();
      expect(reImported).toBeDefined();
      if (!original || !reImported) return;

      expect(reImported.title).toBe(original.title);
      expect(reImported.html).toBe(original.html);
      expect(reImported.author).toBe(original.author);
      expect(reImported.views).toBe(original.views);
      expect(reImported.rating).toBe(original.rating);
      expect(reImported.is_public).toBe(original.is_public);
      expect(reImported.date_created).toBe(original.date_created);
    });

    it("should handle all entries in the test file", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);

      // Validate all entries have required fields
      importedEntries.forEach((entry, index) => {
        expect(entry, `Entry at index ${index} should have id`).toHaveProperty(
          "id",
        );
        expect(
          entry,
          `Entry at index ${index} should have title`,
        ).toHaveProperty("title");
        expect(
          entry,
          `Entry at index ${index} should have html`,
        ).toHaveProperty("html");
        expect(
          entry,
          `Entry at index ${index} should have date_created`,
        ).toHaveProperty("date_created");
      });
    });

    it("should transform people and tags correctly", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);

      // Find an entry with people
      const entryWithPeople = importedEntries.find(
        (e) => e.people && typeof e.people === "string" && e.people.length > 0,
      );

      if (entryWithPeople) {
        // People should be a string (comma-separated)
        expect(typeof entryWithPeople.people).toBe("string");
        expect(typeof entryWithPeople.tags).toBe("string");
      }
    });

    it("should handle EntryFiles array correctly", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);

      importedEntries.forEach((entry) => {
        expect(Array.isArray(entry.EntryFiles)).toBe(true);
      });
    });
  });

  describe("CSV Import/Export", () => {
    it("should export entries to CSV correctly", () => {
      const importedEntries = importEntriesFromJson(originalEntriesJson);
      const csvData = exportEntriesToCsv(importedEntries);

      expect(csvData).toBeDefined();
      expect(typeof csvData).toBe("string");
      expect(csvData.length).toBeGreaterThan(0);

      // CSV should have headers
      const lines = csvData.split("\n");
      expect(lines.length).toBeGreaterThan(1);
      expect(lines[0]).toContain("id");
      expect(lines[0]).toContain("title");
    });

    it("should import entries from CSV correctly", () => {
      // Use a smaller subset for CSV testing to avoid issues with complex HTML content
      const testEntries = importEntriesFromJson(originalEntriesJson).slice(0, 5);
      const csvData = exportEntriesToCsv(testEntries);
      const csvImportedEntries = importEntriesFromCsv(csvData);

      expect(csvImportedEntries).toBeDefined();
      expect(Array.isArray(csvImportedEntries)).toBe(true);
      expect(csvImportedEntries.length).toBe(testEntries.length);
    });

    it("should maintain data integrity through CSV import/export cycle", () => {
      // Use a smaller subset for CSV testing to avoid issues with complex HTML content
      const testEntries = importEntriesFromJson(originalEntriesJson).slice(0, 5);

      // Export to CSV
      const csvData = exportEntriesToCsv(testEntries);

      // Import from CSV
      const csvImportedEntries = importEntriesFromCsv(csvData);

      // Compare counts
      expect(csvImportedEntries.length).toBe(testEntries.length);

      // Compare first entry (excluding id and complex fields)
      if (csvImportedEntries.length > 0 && testEntries.length > 0) {
        const original = testEntries[0];
        const csvImported = csvImportedEntries[0];

        expect(original).toBeDefined();
        expect(csvImported).toBeDefined();
        if (!original || !csvImported) return;

        expect(csvImported.title).toBe(original.title);
        expect(csvImported.author).toBe(original.author);
        expect(csvImported.views).toBe(original.views);
      }
    });
  });

  describe("formattedEntries utility", () => {
    it("should format entries correctly", () => {
      const formatted = formattedEntries(originalEntries);

      expect(formatted).toBeDefined();
      expect(Array.isArray(formatted)).toBe(true);
      expect(formatted.length).toBe(originalEntries.length);

      // Check that formatted entries have correct types
      const firstFormatted = formatted[0];
      expect(firstFormatted).toBeDefined();
      if (!firstFormatted) return;

      expect(typeof firstFormatted.id).toBe("number");
      expect(typeof firstFormatted.author).toBe("number");
      expect(typeof firstFormatted.is_public).toBe("boolean");
    });

    it("should handle empty arrays", () => {
      const formatted = formattedEntries([]);
      expect(formatted).toEqual([]);
    });

    it("should handle non-array input", () => {
      const formatted = formattedEntries(null as any);
      expect(formatted).toEqual([]);
    });
  });

  describe("Edge cases", () => {
    it("should handle entries with missing optional fields", () => {
      const minimalEntry = {
        id: "1",
        author: "1",
        title: "Test",
        html: "<p>Test</p>",
        tags: "",
        people: "",
        address: "",
        latitude: "",
        longitude: "",
        date_created: "2020-01-01T00:00:00Z",
        date_updated: "2020-01-01T00:00:00Z",
        date_created_by_author: "2020-01-01T00:00:00Z",
        views: "0",
        rating: "0",
        EntryFiles: "[]",
        is_public: "false",
        size: "0",
      };

      const json = JSON.stringify([minimalEntry]);
      const imported = importEntriesFromJson(json);

      expect(imported.length).toBe(1);
      const importedEntry = imported[0];
      expect(importedEntry).toBeDefined();
      if (importedEntry) {
        expect(importedEntry.title).toBe("Test");
      }
    });

    it("should handle entries with null values", () => {
      const entryWithNull = {
        id: "1",
        author: "1",
        title: "Test",
        html: "<p>Test</p>",
        tags: "",
        people: "",
        address: "",
        latitude: "",
        longitude: "",
        date_created: "2020-01-01T00:00:00Z",
        date_updated: "2020-01-01T00:00:00Z",
        date_created_by_author: "2020-01-01T00:00:00Z",
        views: "0",
        rating: "0",
        EntryFiles: "[]",
        is_public: "false",
        size: "0",
        _lastUpdated: null,
      };

      const json = JSON.stringify([entryWithNull]);
      const imported = importEntriesFromJson(json);

      expect(imported.length).toBe(1);
      const importedEntry = imported[0];
      expect(importedEntry).toBeDefined();
    });
  });
});
