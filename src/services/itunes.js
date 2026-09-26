// Apple's iTunes Search API — free, public, no API key or signup needed.
// Docs: https://performance-partners.apple.com/search-api
const BASE_URL = 'https://itunes.apple.com';

// Search API artwork URLs come back small (e.g. ".../100x100bb.jpg").
// Swap the size segment to get a bigger image.
export function upsizeArtwork(url, size = 600) {
  if (!url) return null;
  return url.replace(/\/\d+x\d+bb\.(jpg|png)$/, `/${size}x${size}bb.$1`);
}

async function itunesFetch(path, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${path}?${query}`;

  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new Error('Network error — check your connection and try again.');
  }

  if (!response.ok) {
    throw new Error(`iTunes request failed (status ${response.status}).`);
  }

  return response.json();
}

// iTunes description fields sometimes contain light HTML (italics, entities)
// meant for web display. Strip tags and decode the handful of entities that
// actually show up in practice, so plain <Text> renders it cleanly.
function cleanDescription(text) {
  if (!text) return '';
  return text
    .replace(/<\/?i>/g, '') // italics tags -> plain text
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '') // strip any other stray tags
    .replace(/&#38;|&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

// Normalizes a raw iTunes result (movie or tvSeason shape) into one shared shape.
function normalize(raw, mediaType) {
  return {
    id: raw.trackId ?? raw.collectionId,
    mediaType, // 'movie' | 'tv'
    title: raw.trackName ?? raw.collectionName ?? 'Untitled',
    artwork: upsizeArtwork(raw.artworkUrl100),
    releaseDate: raw.releaseDate ?? '',
    description: cleanDescription(
      raw.longDescription ?? raw.description ?? raw.shortDescription ?? ''
    ),
    genre: raw.primaryGenreName ?? '',
    artistName: raw.artistName ?? '',
  };
}

// Searches movies and TV seasons in parallel and merges the results.
export async function searchTitles(term) {
  const [movieData, tvData] = await Promise.all([
    itunesFetch('/search', { term, media: 'movie', entity: 'movie', limit: '15' }),
    itunesFetch('/search', { term, media: 'tvShow', entity: 'tvSeason', limit: '15' }),
  ]);

  const movies = (movieData.results ?? []).map((r) => normalize(r, 'movie'));
  const tvShows = (tvData.results ?? []).map((r) => normalize(r, 'tv'));
  return [...movies, ...tvShows];
}

// Looks up a single item by its iTunes id (trackId or collectionId).
export async function getById(id) {
  const data = await itunesFetch('/lookup', { id });
  const raw = data.results?.[0];
  if (!raw) throw new Error('Not found.');
  const mediaType = raw.kind === 'tv-season' || raw.collectionId ? 'tv' : 'movie';
  return normalize(raw, mediaType);
}