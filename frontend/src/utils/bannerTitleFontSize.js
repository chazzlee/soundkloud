const MAX_CHAR_LENGTH = 49;

/**
 * @param {number} totalCharLength
 * @param {number} maxLength
 * @returns {string}
 */
export function bannerTitleFontSize(
  totalCharLength,
  maxLength = MAX_CHAR_LENGTH
) {
  return totalCharLength >= maxLength ? "20px" : "22px";
}
