/**
 * @typedef {object} RawShow Запис із `data/shows.json` у форматі TVmaze.
 * @property {number} id
 * @property {string} name
 * @property {string[]} [genres]
 * @property {number | null} [runtime] тривалість серії, хв
 * @property {string | null} [premiered] дата прем'єри, "YYYY-MM-DD"
 * @property {{ average: number | null } | null} [rating]
 * @property {{ id: number, name: string } | null} [network]
 */

/**
 * @typedef {object} Show Серіал після normalizeShow() — з таким форматом працюють C2–C4.
 * @property {number} id
 * @property {string} name
 * @property {number | null} year рік прем'єри
 * @property {number | null} rating середня оцінка глядачів
 * @property {number | null} runtime тривалість серії, хв
 * @property {string | null} network назва телемережі
 * @property {string[]} genres
 */

/**
 * C1. Перетворює запис TVmaze на {@link Show}.
 * Специфікація — ТЗ, C1.
 *
 * @param {RawShow} raw
 * @returns {Show}
 */
export function normalizeShow(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const id = raw.id ?? null;
  const name = raw.name ?? 'Untitled';

  let year = null;
  if (typeof raw.premiered === 'string' && raw.premiered.length >= 4) {
    const parsed = parseInt(raw.premiered.slice(0, 4), 10);
    year = Number.isNaN(parsed) ? null : parsed;
  }

  const rating =
    raw.rating && typeof raw.rating.average === 'number'
      ? raw.rating.average
      : null;

  const runtime = raw.runtime ?? null;
  const network = raw.network?.name ?? null;
  const genres = Array.isArray(raw.genres) ? [...raw.genres] : [];

  return {
    id,
    name,
    year,
    rating,
    runtime,
    network,
    genres,
  };
}