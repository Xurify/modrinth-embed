export default function ModrinthBadgeSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md shadow-sm px-3 py-1 text-sm ${className}`}
    >
      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  );
}
