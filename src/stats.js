/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows = []) {
  const statsMap = {};

  for (const show of shows) {
    if (!Array.isArray(show?.genres)) continue;

    for (const genre of show.genres) {
      if (!statsMap[genre]) {
        statsMap[genre] = { count: 0, totalRating: 0, ratedCount: 0 };
      }
      statsMap[genre].count += 1;

      if (typeof show.rating === 'number' && !Number.isNaN(show.rating)) {
        statsMap[genre].totalRating += show.rating;
        statsMap[genre].ratedCount += 1;
      }
    }
  }

  const result = {};
  for (const [genre, data] of Object.entries(statsMap)) {
    let averageRating = null;
    if (data.ratedCount > 0) {
      const rawAvg = data.totalRating / data.ratedCount;
      averageRating = Number(rawAvg.toFixed(1));
    }

    result[genre] = {
      count: data.count,
      averageRating,
    };
  }

  return result;
}