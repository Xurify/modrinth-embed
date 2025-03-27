import { ModrinthAPI, ModrinthProject } from "@/lib/api/modrinth";

interface CompactVariantProps {
  iconUrl?: string;
  project: ModrinthProject;
  themeColors: {
    background: string;
    background2: string;
    text: string;
    secondaryText: string;
    border: string;
    button: string;
    buttonText: string;
  };
  showVersion: boolean;
  showDownloads: boolean;
  width: number;
  versionNumber: string;
}

export const CompactVariant = ({
  iconUrl,
  project,
  themeColors,
  showDownloads,
  showVersion,
  width,
  versionNumber,
}: CompactVariantProps) => {
  return (
    <div
      style={{
        height: 32,
        width,
        display: "flex",
        alignItems: "center",
        padding: 12,
        backgroundColor: themeColors.background,
        border: `1px solid ${themeColors.border}`,
        borderRadius: 6,
      }}
    >
      {project.icon_url && (
        <img
          src={iconUrl}
          alt=""
          width={24}
          height={24}
          style={{
            borderRadius: 4,
            marginRight: 8,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: themeColors.text,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <span>{project.title}</span>
        {showDownloads && (
          <span style={{ color: themeColors.secondaryText }}>
            {ModrinthAPI.formatNumber(project.downloads)}
          </span>
        )}
        {showVersion && versionNumber && (
          <span style={{ color: themeColors.secondaryText }}>
            v{versionNumber}
          </span>
        )}
      </div>
    </div>
  );
};

export default CompactVariant;
