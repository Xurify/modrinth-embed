import { ModrinthAPI } from "@/lib/api/modrinth";
import ModrinthEmbedSkeleton from "./ModrinthEmbedSkeleton";

interface ModrinthEmbedProps {
  projectId: string;
  className?: string;
}

export default async function ModrinthEmbed({ projectId, className }: ModrinthEmbedProps) {
  const project = await ModrinthAPI.getProject(projectId);
  const versions = await ModrinthAPI.getVersions(projectId);
  const latestVersion = versions[0];

  return (
    <ModrinthEmbedSkeleton
      project={project}
      latestVersion={latestVersion}
      className={className}
    />
  );
}
