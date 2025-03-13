export async function loadGoogleFont(
  font: string,
  italic: boolean,
  weight: number
) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:ital,wght@${italic ? 1 : 0},${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}
