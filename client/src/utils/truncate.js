// @ts-check

/**
 * Truncates the given input string, perfect for previews etc.
 * @param {string} str - The string to be truncated
 * @param {number} [count=12] - The character limit
 * @returns {string} A truncated string, with elipsis if necessary
 */
export default function truncate (str, count = 12) {
  return str.slice(0, count) + (str.length > count ? '...' : '')
}
