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
   * Get a project by ID via our API (NEXT_PUBLIC_APP_URL).
   * Single fetch to our cached proxy; only API route handlers call Modrinth directly.
   */
  static async getProject(id: string): Promise<ModrinthProject | null> {
    try {
      const url = new URL(`/api/modrinth/project/${id}`, process.env.NEXT_PUBLIC_APP_URL);
      const response = await this.fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      return data == null ? null : ModrinthProjectSchema.parse(data);
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
    const { data } = await this.fetchFromModrinth(`/team/${teamId}/members`, z.array(TeamMemberSchema));
    return data || [];
  }

  /**
   * Get versions of a project via our API (NEXT_PUBLIC_APP_URL).
   * Single fetch to our cached proxy; only API route handlers call Modrinth directly.
   */
  static async getVersions(id: string): Promise<ModrinthVersion[]> {
    try {
      const url = new URL(`/api/modrinth/project/${id}/versions`, process.env.NEXT_PUBLIC_APP_URL);
      const response = await this.fetch(url);
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? z.array(ModrinthVersionSchema).parse(data) : [];
    } catch (error) {
      console.error("Error fetching versions:", error);
      return [];
    }
  }

  /**
   * Format a number with compact notation
   * @param num - The number to format
   * @returns Formatted number string (e.g. "1.2K", "3.4M")
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US", { notation: "compact", roundingMode: "floor" }).format(num);
  }

  /**
   * Get the cache duration for a project (used by API route handlers).
   * @returns Cache duration in seconds (currently 1 hour)
   */
  static getCacheDuration(): number {
    return 3600;
  }

  /**
   * Get the author of a project (derived from source_url).
   * @param project - The project
   * @returns The author username or "Unknown"
   */
  static getAuthor(project: ModrinthProject): string {
    const author = project.source_url
      ? project.source_url.split("/")[3]
      : "Unknown";
    return author;
  }

  /**
   * Fetch data from Modrinth. Used only by API route handlers (/api/modrinth/...).
   * @param endpoint - The Modrinth API endpoint (e.g. "/project/123")
   * @param schema - Zod schema to parse and validate the response
   * @returns Parsed data and rate-limit headers, or null on failure
   */
  static async fetchFromModrinth<T extends z.ZodType>(
    endpoint: string,
    schema: T
  ): Promise<{
    data: z.infer<T> | null;
    headers: {
      limit: string | null;
      remaining: string | null;
      reset: string | null;
    };
  }> {
    try {
      const url = `https://api.modrinth.com/v2${endpoint}`;
      const response = await this.fetch(url, {
        headers: {
          "User-Agent": "xurify/modrinth-embed/1.0.0 (contact@xurify.com)",
        },
      });

      const headers = {
        limit: response.headers.get("X-Ratelimit-Limit"),
        remaining: response.headers.get("X-Ratelimit-Remaining"),
        reset: response.headers.get("X-Ratelimit-Reset"),
      };

      if (!response.ok) {
        console.warn(`Failed to fetch from Modrinth: ${response.statusText}`, {
          ...headers,
          endpoint,
        });
        return { data: null, headers };
      }

      const data = await response.json();
      return { data: schema.parse(data), headers };
    } catch (error) {
      console.error("Error fetching from Modrinth:", error);
      return {
        data: null,
        headers: { limit: null, remaining: null, reset: null },
      };
    }
  }

  private static fetch(
    url: string | URL,
    options: RequestInit = {}
  ): Promise<Response> {
    return fetch(url, {
      ...options,
      next: {
        revalidate: 86400,
      },
      cache: 'force-cache',
    });
  }
}
