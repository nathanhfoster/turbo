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
 */
export async function initializeResumeDatabase(): Promise<ResumeRepository> {
  const database = await createDatabase(
    {
      name: "ResumeBuilder",
      version: 1,
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

