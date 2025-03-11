import { z } from "zod";

const GalleryItemSchema = z.object({
  url: z.string(),
  raw_url: z.string(),
  featured: z.boolean(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  created: z.string(),
  ordering: z.number(),
});

export const TeamMemberSchema = z.object({
  team_id: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    avatar_url: z.string(),
    bio: z.string().nullable(),
    created: z.string(),
    role: z.string(),
    badges: z.number(),
    auth_providers: z.null(),
    email: z.string().nullable(),
    email_verified: z.boolean().nullable(),
    has_password: z.boolean().nullable(),
    has_totp: z.boolean().nullable(),
    payout_data: z.unknown().nullable(),
    stripe_customer_id: z.string().nullable(),
    allow_friend_requests: z.boolean().nullable(),
    github_id: z.number().nullable(),
  }),
  role: z.string(),
  permissions: z.number().nullable(),
  accepted: z.boolean(),
  payouts_split: z.number().nullable(),
  ordering: z.number().nullable(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const ModrinthProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  project_type: z.string(),
  team: z.string(),
  organization: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  body_url: z.string().nullable(),
  published: z.string(),
  updated: z.string(),
  approved: z.string().nullable(),
  queued: z.string().nullable(),
  status: z.string(),
  requested_status: z.string().nullable(),
  moderator_message: z.string().nullable(),
  license: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().nullable(),
  }),
  downloads: z.number(),
  followers: z.number(),
  categories: z.array(z.string()),
  additional_categories: z.array(z.string()),
  loaders: z.array(z.string()),
  versions: z.array(z.string()),
  icon_url: z.string().nullable(),
  issues_url: z.string().nullable(),
  source_url: z.string().nullable(),
  wiki_url: z.string().nullable(),
  discord_url: z.string().nullable(),
  donation_urls: z.array(z.unknown()),
  gallery: z.array(GalleryItemSchema),
  color: z.number().nullable(),
  thread_id: z.string().nullable(),
  monetization_status: z.string(),
  client_side: z.string(),
  server_side: z.string(),
  game_versions: z.array(z.string()),
});

export const ModrinthVersionSchema = z.object({
  id: z.string(),
  version_number: z.string(),
  downloads: z.number(),
  version_type: z.string(),
  date_published: z.string(),
});

export type ModrinthProject = z.infer<typeof ModrinthProjectSchema>;
export type ModrinthVersion = z.infer<typeof ModrinthVersionSchema>;

/**
 * Modrinth API wrapper
 * Based on the Modrinth API v2
 * https://api.modrinth.com/
 * https://docs.modrinth.com/
 */
export class ModrinthAPI {
  /**
   * Get a project by ID
   * @param id - The ID of the project
   * @returns The project or null if the project is not found
   */
  static async getProject(id: string): Promise<ModrinthProject | null> {
    try {
      const url = new URL(
        `/api/modrinth/project/${id}`,
        process.env.NEXT_PUBLIC_APP_URL
      );
      const response = await this.fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }

      const data = await response.json();
      return ModrinthProjectSchema.parse(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  }

  /**
   * Get the members of a team
   * @param teamId - The ID of the team
   * @returns The members of the team
   */
  static async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    try {
      const url = new URL(
        `/api/modrinth/team/${teamId}/members`,
        process.env.NEXT_PUBLIC_APP_URL
      );
      const response = await this.fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch team members: ${response.statusText}`);
      }

      const data = await response.json();
      return z.array(TeamMemberSchema).parse(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  }

  /**
   * Get the versions of a project
   * @param id - The ID of the project
   * @returns The versions of the project
   */
  static async getVersions(id: string): Promise<ModrinthVersion[]> {
    try {
      const url = new URL(
        `/api/modrinth/project/${id}/versions`,
        process.env.NEXT_PUBLIC_APP_URL
      );
      const response = await this.fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch versions: ${response.statusText}`);
      }

      const data = await response.json();
      return z.array(ModrinthVersionSchema).parse(data);
    } catch (error) {
      console.error("Error fetching versions:", error);
      return [];
    }
  }

  /**
   * Format a number with compact notation
   * @param num The number to format
   * @returns Formatted number string
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
  }
  
  /**
   * Get the cache duration for a project based on the number of downloads
   * @param downloads - The number of downloads
   * @returns The cache duration
   */
  static getCacheDuration(downloads: number): number {
    if (downloads >= 1000000) {
      return 604800; // 1 week
    } else if (downloads >= 100000) {
      return 86400; // 1 day
    } else if (downloads >= 10000) {
      return 7200; // 2 hours
    } else if (downloads >= 1000) {
      return 3600; // 1 hour
    } else {
      return 3600; // 1 hour
    }
  }

  /**
   * Get the author of a project
   * @param project - The project
   * @returns The author of the project
   */
  static getAuthor(project: ModrinthProject): string {
    const author = project.source_url
      ? project.source_url.split("/")[3]
      : "Unknown";
    return author;
  }

  /**
   * Fetch data from Modrinth - Used by internal our API
   * @param endpoint - The endpoint to fetch from
   * @param schema - The schema to parse the data with
   * @returns The data
   */
  static async fetchFromModrinth<T>(
    endpoint: string,
    schema: z.ZodType<T>
  ): Promise<T> {
    const MODRINTH_API_BASE = "https://api.modrinth.com/v2";
    const response = await fetch(`${MODRINTH_API_BASE}${endpoint}`, {
      headers: {
        "User-Agent": "modrinth-embed/1.0.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Modrinth: ${response.statusText}`);
    }

    const data = await response.json();
    return schema.parse(data);
  }

  private static fetch(
    url: string | URL,
    options: RequestInit = {}
  ): Promise<Response> {
    return fetch(url, {
      ...options,
      next: {
        revalidate: 3600,
      },
    });
  }
}
