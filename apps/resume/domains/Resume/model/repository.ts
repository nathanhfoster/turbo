import {
  createDatabase,
  BaseRepository,
  type IDatabase,
} from "@nathanhfoster/indexeddb";
import type { Resume } from "./types";

/**
 * Resume repository for IndexedDB persistence
 * Following FSD pattern - domain-level repository
 */
export class ResumeRepository extends BaseRepository<Resume> {
  constructor(database: IDatabase) {
    super(database, "resumes");
  }
}

/**
 * Initialize the resume database and repository
 * This is the single source of truth for all resume-related data
 */
export async function initializeResumeDatabase(): Promise<ResumeRepository> {
  const database = await createDatabase(
    {
      name: "ResumeBuilder",
      version: 1, // Back to version 1 - files are stored in resume object
    },
    [
      {
        name: "resumes",
        keyPath: "id",
        autoIncrement: false,
        indexes: [
          {
            name: "baseResumeId",
            keyPath: "baseResumeId",
            unique: false,
          },
          {
            name: "createdAt",
            keyPath: "createdAt",
            unique: false,
          },
        ],
      },
    ],
  );

  return new ResumeRepository(database);
}

/**
 * Get the shared database instance
 * This ensures we use the same database for both resumes and files
 */
export async function getSharedDatabase(): Promise<IDatabase> {
  return await createDatabase(
    {
      name: "ResumeBuilder",
      version: 2,
    },
    [
      {
        name: "resumes",
        keyPath: "id",
        autoIncrement: false,
        indexes: [
          {
            name: "baseResumeId",
            keyPath: "baseResumeId",
            unique: false,
          },
          {
            name: "createdAt",
            keyPath: "createdAt",
            unique: false,
          },
        ],
      },
    ],
  );
}

