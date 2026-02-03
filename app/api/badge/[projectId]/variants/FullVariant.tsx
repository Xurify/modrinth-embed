import { ModrinthAPI, ModrinthProject } from "@/lib/api/modrinth";
import { truncate } from "@/lib/utils";

interface FullVariantProps {
  iconUrl?: string;
  project: ModrinthProject;
  versionNumber: string;
  showPadding: boolean;
  showDownloads: boolean;
  showVersion: boolean;
  showButton: boolean;
}

export const FullVariant = ({
  iconUrl,
  project,
  showPadding,
  showDownloads,
  showVersion,
  showButton,
  versionNumber,
}: FullVariantProps) => {
  const category = project.categories[0] || project.project_type;

  return (
    <div
      tw={`flex w-full h-full ${
        showPadding ? "p-12 bg-[#111214]" : "bg-transparent"
      }`}
    >
      <div
        tw="flex flex-col w-full h-full bg-[#1a1c20] rounded-3xl overflow-hidden border-2 border-[#2D2D35] justify-center"
      >
        <div tw="flex flex-col py-16 px-10 gap-8">
          <div tw="flex items-center gap-6">
            <div
              tw={`flex items-center justify-center w-[140px] h-[140px] rounded-2xl overflow-hidden flex-shrink-0 ${
                !iconUrl
                  ? "bg-[#1bd96a]"
                  : "bg-[#26292e]"
              }`}
            >
              {iconUrl ? (
                <img
                  src={iconUrl}
                  width="140"
                  height="140"
                  tw="w-full h-full rounded-2xl"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              ) : (
                <div tw="text-6xl font-bold text-white">
                  {project.title.substring(0, 1)}
                </div>
              )}
            </div>

            <div tw="flex flex-col flex-1">
              <h1 tw="text-5xl font-bold text-white m-0 mb-2">
                {truncate(project.title, 24)}
              </h1>
              <div tw="flex items-center text-2xl">
                <span tw="text-[#9ca3af]">by</span>
                <span tw="text-[#1bd96a] ml-2 font-semibold">
                  {truncate(ModrinthAPI.getAuthor(project), 20)}
                </span>
                <span tw="text-[#4b5563] mx-3">•</span>
                <span tw="text-[#9ca3af] capitalize">{category.replace(/-/g, " ")}</span>
              </div>
            </div>
          </div>

          <p
            tw="text-2xl text-[#d1d5db] leading-relaxed m-0"
            style={{ height: 100, lineHeight: "1.6", overflow: "hidden" }}
          >
            {truncate(project.description, 155)}
          </p>

          <div tw="flex items-center gap-4" style={{ minHeight: 60 }}>
            {showDownloads && (
              <div tw="flex items-center bg-[#26292e] rounded-xl px-5 py-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#1bd96a"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span tw="text-xl text-white font-bold ml-3">
                  {ModrinthAPI.formatNumber(project.downloads)}
                </span>
                <span tw="text-lg text-[#6b7280] ml-2">downloads</span>
              </div>
            )}
            {showVersion && versionNumber && (
              <div tw="flex items-center bg-[#26292e] rounded-xl px-5 py-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#1bd96a"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span tw="text-xl text-white font-bold ml-3">{versionNumber}</span>
              </div>
            )}
            {project.followers > 1000 && (
              <div tw="flex items-center bg-[#26292e] rounded-xl px-5 py-3">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#1bd96a"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span tw="text-xl text-white font-bold ml-3">
                  {ModrinthAPI.formatNumber(project.followers)}
                </span>
                <span tw="text-lg text-[#6b7280] ml-2">followers</span>
              </div>
            )}
          </div>

          {showButton && (
            <div tw="flex w-full">
              <div
                tw="flex items-center justify-center gap-3 px-8 rounded-2xl text-xl font-bold text-[#0a0a0a] w-full bg-[#1bd96a]"
                style={{ height: 60 }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 600 593"
                  fill="#0a0a0a"
                >
                  <path d="m29 424.4 188.2-112.95-17.15-45.48 53.75-55.21 67.93-14.64 19.67 24.21-31.32 31.72-27.3 8.6-19.52 20.05 9.56 26.6 19.4 20.6 27.36-7.28 19.47-21.38 42.51-13.47 12.67 28.5-43.87 53.78-73.5 23.27-32.97-36.7L55.06 467.94C46.1 456.41 35.67 440.08 29 424.4Zm543.03-230.25-149.5 40.32c8.24 21.92 10.95 34.8 13.23 49l149.23-40.26c-2.38-15.94-6.65-32.17-12.96-49.06Z" />
                  <path d="M51.28 316.13c10.59 125 115.54 223.3 243.27 223.3 96.51 0 180.02-56.12 219.63-137.46l48.61 16.83c-46.78 101.34-149.35 171.75-268.24 171.75C138.6 590.55 10.71 469.38 0 316.13h51.28ZM.78 265.24C15.86 116.36 141.73 0 294.56 0c162.97 0 295.28 132.31 295.28 295.28 0 26.14-3.4 51.49-9.8 75.63l-48.48-16.78a244.28 244.28 0 0 0 7.15-58.85c0-134.75-109.4-244.15-244.15-244.15-124.58 0-227.49 93.5-242.32 214.11H.8Z" />
                  <path d="M293.77 153.17c-78.49.07-142.2 63.83-142.2 142.34 0 78.56 63.79 142.34 142.35 142.34 3.98 0 7.93-.16 11.83-.49l14.22 49.76a194.65 194.65 0 0 1-26.05 1.74c-106.72 0-193.36-86.64-193.36-193.35 0-106.72 86.64-193.35 193.36-193.35 2.64 0 5.28.05 7.9.16l-8.05 50.85Zm58.2-42.13c78.39 24.67 135.3 97.98 135.3 184.47 0 80.07-48.77 148.83-118.2 178.18l-14.17-49.55c48.08-22.85 81.36-71.89 81.36-128.63 0-60.99-38.44-113.07-92.39-133.32l8.1-51.15Z" />
                </svg>
                View on Modrinth
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullVariant;
