import { truncate } from "@/lib/utils";
import { ModrinthIcon } from "../icons/ModrinthIcon";

interface DefaultProps {
  iconUrl?: string;
  modName: string;
  author: string;
  downloads: string;
  theme: "dark" | "light";
}

export const DefaultVariant = ({
  iconUrl,
  modName,
  author,
  downloads,
  theme,
}: DefaultProps) => {
  const isDark = theme === "dark";
  const iconColor = isDark ? "#A1A1AA" : "#6B7280";

  return (
    <div
      tw={`flex items-center w-full h-full gap-6 ${
        isDark ? "bg-[#1C1E23] border-[#2D2D35]" : "bg-white border-[#E5E7EB]"
      } border-2 rounded-2xl p-6 font-sans shadow-xl`}
    >
      <div
        tw={`flex items-center justify-center w-[110px] h-[110px] rounded-2xl overflow-hidden flex-shrink-0 p-2 ${
          !iconUrl ? "bg-gradient-to-b from-[#10B981] to-[#157a59]" : "bg-[#8BC34A]/20"
        }`}
      >
        {iconUrl ? (
          <img
            src={iconUrl}
            tw="w-full h-full object-contain rounded-xl"
            style={{ objectFit: "contain" }}
            alt="Mod logo"
          />
        ) : (
          <div tw="text-4xl font-bold text-white">
            {modName.substring(0, 1)}
          </div>
        )}
      </div>

      <div tw="flex flex-col justify-center h-full flex-1 min-w-0">
        <div
          tw={`text-4xl font-bold ${
            isDark ? "text-[#E5E7EB]" : "text-[#1F2937]"
          } truncate mb-2 tracking-tight`}
        >
          {truncate(modName, 20)}
        </div>

        <div
          tw={`flex items-center gap-6 ${
            isDark ? "text-[#A1A1AA]" : "text-[#6B7280]"
          } text-2xl font-medium`}
        >
          <div tw="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              fill="none"
              stroke={iconColor}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{downloads}</span>
          </div>

          <div tw="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              fill="none"
              stroke={iconColor}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{truncate(author || "Unknown", 15)}</span>
          </div>
        </div>
      </div>

      <div tw="ml-auto flex-shrink-0">
        <ModrinthIcon />
      </div>
    </div>
  );
};

export default DefaultVariant;
