/** @typedef {import('./normalize.js').Show} Show */

/**
 * C3. Повертає новий масив серіалів, відсортований за полем `key`.
 * Специфікація — ТЗ, C3.
 *
 * @param {Show[]} shows
 * @param {'name' | 'year' | 'rating'} key
 * @param {'asc' | 'desc'} [direction]
 * @returns {Show[]}
 */
export function sortShows(shows = [], key = 'name', direction = 'asc') {
  return [...shows].sort((a, b) => {
    const valA = a?.[key] ?? null;
    const valB = b?.[key] ?? null;

    if (valA === null && valB === null) return 0;
    if (valA === null) return 1;
    if (valB === null) return -1;

    let diff = 0;
    if (typeof valA === 'string' && typeof valB === 'string') {
      diff = valA.localeCompare(valB);
    } else {
      diff = valA < valB ? -1 : valA > valB ? 1 : 0;
    }

    return direction === 'desc' ? -diff : diff;
  });
}