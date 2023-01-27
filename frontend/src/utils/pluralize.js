/**
 * @param {number} count
 * @param {string} singularWord
 * @returns {string}
 */
export function pluralize(count, singularWord) {
  return count === 1 ? singularWord : `${singularWord}s`;
}
