import Image from 'next/image';
import { ModrinthAPI } from '@/lib/api/modrinth';

interface ModrinthBadgeProps {
  projectId: string;
  className?: string;
  showDownloads?: boolean;
  showVersion?: boolean;
}

export default async function ModrinthBadge({
  projectId,
  className = '',
  showDownloads = true,
  showVersion = true,
}: ModrinthBadgeProps) {
  const project = await ModrinthAPI.getProject(projectId);
  const versions = showVersion ? await ModrinthAPI.getVersions(projectId) : [];
  const latestVersion = versions[0];

  return (
    <a
      href={`https://modrinth.com/project/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md shadow-sm px-3 py-1 text-sm hover:shadow-md transition-shadow ${className}`}
    >
      {project.icon_url && (
        <Image
          src={project.icon_url}
          alt=""
          width={16}
          height={16}
          className="rounded"
        />
      )}
      <span className="font-medium text-gray-900 dark:text-white">
        {project.title}
      </span>
      {showDownloads && (
        <span className="text-gray-500 dark:text-gray-400">
          {ModrinthAPI.formatDownloads(project.downloads)}
        </span>
      )}
      {showVersion && latestVersion && (
        <span className="text-gray-500 dark:text-gray-400">
          v{latestVersion.version_number}
        </span>
      )}
    </a>
  );
} 