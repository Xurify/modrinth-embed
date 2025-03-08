import { ModrinthAPI } from "@/lib/api/modrinth";
import Image from "next/image";
import { Suspense } from "react";
import type { ModrinthProject, ModrinthVersion } from "@/lib/api/modrinth";

interface ModrinthEmbedSkeletonProps {
  project: ModrinthProject;
  latestVersion: ModrinthVersion | null;
  className?: string;
}

export default function ModrinthEmbedSkeleton({
  project,
  latestVersion,
  className = "",
}: ModrinthEmbedSkeletonProps) {
  return (
    <div className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {project.icon_url && (
            <Image
              src={project.icon_url}
              alt={`${project.title} icon`}
              width={64}
              height={64}
              className="rounded-lg"
            />
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              by {project.source_url ? project.source_url.split('/')[3] : 'Unknown'}
            </p>
          </div>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Downloads:{" "}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {ModrinthAPI.formatDownloads(project.downloads)}
            </span>
          </div>
          {latestVersion && (
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Latest:{" "}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {latestVersion.version_number}
              </span>
            </div>
          )}
        </div>
      </div>
      <a
        href={`https://modrinth.com/project/${project.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-center py-3 transition-colors duration-200"
      >
        View on Modrinth →
      </a>
    </div>
  );
}
