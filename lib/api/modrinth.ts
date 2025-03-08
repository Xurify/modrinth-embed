import { z } from 'zod';

const GalleryItemSchema = z.object({
  url: z.string(),
  raw_url: z.string(),
  featured: z.boolean(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  created: z.string(),
  ordering: z.number(),
});

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
    url: z.string().nullable()
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

export class ModrinthAPI {
  private static BASE_URL = 'https://api.modrinth.com/v2';
  private static DEFAULT_CACHE_DURATION = 3600; // 1 hour in seconds

  static async getProject(id: string): Promise<ModrinthProject> {
    const response = await fetch(`${this.BASE_URL}/project/${id}`, {
      headers: {
        'User-Agent': 'modrinth-embed/1.0.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    const data = await response.json();
    return ModrinthProjectSchema.parse(data);
  }

  static async getVersions(id: string): Promise<ModrinthVersion[]> {
    const response = await fetch(`${this.BASE_URL}/project/${id}/version`, {
      headers: {
        'User-Agent': 'modrinth-embed/1.0.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch versions: ${response.statusText}`);
    }

    const data = await response.json();
    return z.array(ModrinthVersionSchema).parse(data);
  }

  static formatDownloads(count: number): string {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)}M`;
    }
    if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}K`;
    }
    return count.toString();
  }

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
} 