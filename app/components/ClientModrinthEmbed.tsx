'use client';

import { useEffect, useState } from 'react';
import { ModrinthAPI } from '@/lib/api/modrinth';
import type { ModrinthProject, ModrinthVersion } from '@/lib/api/modrinth';
import ModrinthEmbedSkeleton from './ModrinthEmbedSkeleton';
import ModrinthEmbedLoadingSkeleton from './ModrinthEmbedLoadingSkeleton';

interface ClientModrinthEmbedProps {
  projectId: string;
  className?: string;
}

export default function ClientModrinthEmbed({ projectId, className = '' }: ClientModrinthEmbedProps) {
  const [project, setProject] = useState<ModrinthProject | null>(null);
  const [latestVersion, setLatestVersion] = useState<ModrinthVersion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        
        const projectData = await ModrinthAPI.getProject(projectId);
        const versions = await ModrinthAPI.getVersions(projectId);
        
        setProject(projectData);
        setLatestVersion(versions[0] || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [projectId]);

  if (isLoading) {
    return <ModrinthEmbedLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-red-500 dark:text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <ModrinthEmbedSkeleton
      project={project}
      latestVersion={latestVersion}
      className={className}
    />
  );
} 