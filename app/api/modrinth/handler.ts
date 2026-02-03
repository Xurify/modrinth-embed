/**
 * Shared handler for /api/modrinth/* routes.
 * Wraps fetchFromModrinth with consistent Cache-Control and X-Ratelimit-* headers.
 */
const CACHE_OK = "public, s-maxage=3600, stale-while-revalidate=7200";
const CACHE_ERROR = "public, max-age=300, s-maxage=300";

function rateLimitHeaders(headers: { limit: string | null; remaining: string | null; reset: string | null }) {
  return {
    "Cache-Control": CACHE_OK,
    ...(headers.limit && { "X-Ratelimit-Limit": headers.limit }),
    ...(headers.remaining && { "X-Ratelimit-Remaining": headers.remaining }),
    ...(headers.reset && { "X-Ratelimit-Reset": headers.reset }),
  };
}

export async function handleModrinthRoute<T>(
  fetchResult: Promise<{ data: T | null; headers: { limit: string | null; remaining: string | null; reset: string | null } }>,
  errorMessage: string
): Promise<Response> {
  try {
    const { data, headers } = await fetchResult;
    return Response.json(data, { headers: rateLimitHeaders(headers) });
  } catch (error) {
    console.error(errorMessage, error);
    return Response.json(
      { error: errorMessage },
      { status: 500, headers: { "Cache-Control": CACHE_ERROR } }
    );
  }
}
